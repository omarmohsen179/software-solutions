using AdminPanelApi.DTOs;
using AdminPanelApi.EmailSender;
using AdminPanelApi.Models;
using AdminPanelApi.Models.Office;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AdminPanelApi.Services
{
    public class ChangePasswordForm
    {
        public string Id { get; set; }
        public string Password { get; set; }
    }
    public class UserAuth
    {
        public List<Client> UserClients { get; set; }
        public List<string> Roles { get; set; }
    }
    public interface IAuthService
    {
        Task UpdateUserRoleAsync(string id, IEnumerable<string> new_role);
        Task<valid> RegisterAsync(RegisterModel model);
        IEnumerable<ApplicationUser> FilterUsers(Expression<Func<ApplicationUser, bool>> filter = null, string includeProperties = "");
        Task<valid> UpdateAsync(RegisterModel model);
        Task<valid> ConfirmEmail(emailconfirm model);
        Task<valid> ForgetPassword(ForgetPasswordFormForgetPasswordForm model, string URL);
        Task<valid> CheckUserType(string username);
        List<string> systemRoles();
        object userData(string userId);
        UserAuth userAuthrizations(string userId);
        Task<bool> DeleteUserAsync(string Id);
        Task<object> userById(string Id);
    }


    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly IJwtService _jwtService;
        private readonly IMailService mailService;
        private Core.IUnitOfWork unitOfWork;
        public AuthService(Core.IUnitOfWork _unitOfWork, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IJwtService jwtService, IMailService _mailSettings)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtService = jwtService;
            mailService = _mailSettings;
            unitOfWork = _unitOfWork;
        }
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        public async Task<object> retriveUser(string username)
        {

            var res = FilterUsers(e => e.UserName == username, includeProperties: "UserClients");
            var roles = (await _userManager.GetRolesAsync(res.First())).ToList();
            var usertarget = res.Select(e => new
            {
                Id = e.Id,
                Username = e.UserName,
                Password = e.PasswordStored,
                Roles = roles
            }
            ).First();
            return usertarget;
        }
        public async Task<valid> RegisterAsync(RegisterModel model)
        {

            if (await _userManager.FindByNameAsync(model.Username) is not null)
                return new valid
                {
                    IsOk = false,
                    Message = "Email is already registered!"
                };
            var user = new ApplicationUser()
            {
                Email = model.Username,
                UserName = model.Username,
                PasswordStored = model.Password
            };



            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Aggregate(string.Empty, (current, error) => current + $"{error.Description}\n");
                return new valid
                {
                    IsOk = false,
                    Message = errors
                };
            }

            await _userManager.AddToRolesAsync(user, model.Roles);
            return new()
            {
                IsOk = true,
                User = retriveUser(model.Username).Result,
                Message = "success"
            };
        }
        public async Task<valid> UpdateAsync(RegisterModel model)
        {

            if (FilterUsers(e => e.UserName == model.Username && e.Id != model.Id).ToList().Count() > 0)
                return new valid
                {
                    IsOk = false,
                    Message = "Username is taken"
                };
            var olduser = FilterUsers(e => e.Id == model.Id).ToList().First();
            olduser.Email = model.Username;
            olduser.UserName = model.Username;
            olduser.PasswordStored = model.Password;

            var result = await _userManager.UpdateAsync(olduser);

            if (olduser.PasswordStored != model.Password)
            {
                await ResetUserPasswordAsync(new ChangePasswordForm() { Id = model.Id, Password = model.Password });
            }


            if (!result.Succeeded)
            {
                var errors = result.Errors.Aggregate(string.Empty, (current, error) => current + $"{error.Description}\n");

                return new valid
                {
                    IsOk = false,
                    Message = errors
                };
            }
            await UpdateUserRoleAsync(model.Id, model.Roles);
            return new()
            {
                IsOk = true,
                User = retriveUser(model.Username).Result,
                Message = "success"
            };
        }
        public async Task<valid> ForgetPassword(ForgetPasswordFormForgetPasswordForm model, string URL)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.email);
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                return new valid
                {
                    IsOk = true,
                    Message = "success"
                };
            }
            catch (Exception ex)
            {
                return new valid
                {
                    IsOk = false,
                    Message = ex.ToString()
                };
            }

        }
        public async Task<valid> ConfirmEmail(emailconfirm model)
        {

            var user = await _userManager.FindByNameAsync(model.username);

            if (user != null)
            {
                var actoin = await _userManager.ConfirmEmailAsync(user, model.token);
                if (actoin.Succeeded)
                {

                    return new valid
                    {
                        IsOk = true,
                        Message = "success"
                    };

                }

                return new valid
                {
                    IsOk = false,
                    Message = model.ToString()
                };

            }

            return new valid
            {
                IsOk = false,
                Message = model.ToString()
            };
        }
        public async Task UpdateUserRoleAsync(string id, IEnumerable<string> new_role)
        {
            var userx = FilterUsers(e => e.Id == id);
            var result = await _userManager.RemoveFromRolesAsync(userx.ElementAt(0), await _userManager.GetRolesAsync(userx.ElementAt(0)));
            if (!result.Succeeded)
                throw new Exception("problem in user Roles Change");

            var addroles = await _userManager.AddToRolesAsync(userx.ElementAt(0), new_role);
            if (!addroles.Succeeded)
                throw new Exception("problem in user Roles Change");

        }

        public async Task<valid> CheckUserType(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            List<string> roles = (List<string>)await _userManager.GetRolesAsync(user);
            return new valid
            {
                IsOk = true,
                Message = roles.ElementAt(0).ToString()
            };



        }

        public async Task ResetUserPasswordAsync(ChangePasswordForm usermodel)
        {
            try
            {
                var user = FilterUsers(e => e.Id == usermodel.Id).ToList().First();

                if (user == null)
                {
                    throw new Exception("wrong user");
                }
                var token = _userManager.GeneratePasswordResetTokenAsync(user).Result;
                var result = _userManager.ResetPasswordAsync(user, token, usermodel.Password).Result;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public IEnumerable<ApplicationUser> FilterUsers(Expression<Func<ApplicationUser, bool>> filter = null, string includeProperties = "")
        {
            if (filter != null)
            {
                var users = _userManager.Users.Where(filter);

                foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    users = users.Include(includeProperty);
                }
                return users;
            }
            else
            {
                return _userManager.Users.ToList();
            }

        }
        public async Task<bool> DeleteUserAsync(string Id)
        {
            var user = FilterUsers(e => e.Id == Id);
            var result = await _userManager.DeleteAsync(user.ElementAt(0));
            return result.Succeeded;
        }

        public List<string> systemRoles()
        {
            var x = _roleManager.Roles.Select(e => e.Name).ToList();
            return x;
        }

        public async Task<object> userById(string Id)
        {
            var user = FilterUsers(e => e.Id == Id, includeProperties: "UserClients");
            var roles = (await _userManager.GetRolesAsync(user.First())).ToList();
            var usertarget = user.Select(e => new
            {
                Id = e.Id,
                Username = e.UserName,
                Password = e.PasswordStored,

                Roles = roles
            }).First();
            return usertarget;
        }

        public object userData(string userId)
        {
            List<ApplicationUser> userstores = FilterUsers(e => e.Id == userId).ToList();
            var roles = (_userManager.GetRolesAsync(userstores.First())).Result.ToList();
            if (userstores.Count == 0)
            {
                throw new UnauthorizedAccessException();
            }
            return new
            {
                Roles =     roles,
                Username = userstores.First().UserName,
            };
        }

        public UserAuth userAuthrizations(string userId)
        {
            List<ApplicationUser> userstores = FilterUsers(e => e.Id == userId, includeProperties: "UserClients").ToList();
            var roles = (_userManager.GetRolesAsync(userstores.First())).Result.ToList();
            if (userstores.Count == 0)
            {
                throw new UnauthorizedAccessException();
            }
            return new UserAuth()
            {
                Roles = roles,

            };
        }
    }
}
