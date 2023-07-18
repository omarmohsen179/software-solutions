using AdminPanelApi.Core;
using AdminPanelApi.DTOs;
using AdminPanelApi.Models;
using AdminPanelApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminPanelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IUnitOfWork unitOfWork;
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;
        private AppDbContext _context;
        public AuthController(AppDbContext context, IAuthService authService, IJwtService jwtService, IUnitOfWork unitOfWork)
        {
            _authService = authService;
            _jwtService = jwtService;
            _context = context;
            this.unitOfWork = unitOfWork;
        }
        [HttpGet("/")]
        public string test()
        {
            return "Test";
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesHelpers.Users)]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var response = await _authService.DeleteUserAsync(id);
            return response ? Ok(JsonConvert.SerializeObject(response)) : BadRequest(JsonConvert.SerializeObject(response));
        }
        [HttpGet]
        [Authorize(Roles = RolesHelpers.Users)]
        public async Task<IActionResult> users()
        {
            var response = _authService.FilterUsers(null);
            return Ok(JsonConvert.SerializeObject(response));
        }
        [HttpGet("{id}")]
        [Authorize(Roles = RolesHelpers.Users)]
        public async Task<IActionResult> users(string id)
        {
            var response = (await _authService.userById(id));
            return Ok(JsonConvert.SerializeObject(response));
        }
        [HttpGet("roles")]
        //[Authorize(Roles = RolesHelpers.Users)]
        public async Task<IActionResult> roles()
        {
            var response = _authService.systemRoles();
            return Ok(JsonConvert.SerializeObject(response));
        }
        [HttpGet("data")]

        public async Task<IActionResult> userdata()
        {
            var userid = HttpContext.User.Claims.ElementAt(2).Value;
            return Ok(JsonConvert.SerializeObject(_authService.userData(userid)));
        }
        [HttpPost("remov5eDuplicates")]
        public async Task<IActionResult> remov5eDuplicates()    
        {
            //var category = this.unitOfWork.CategoryManager.GetAll().ToList().GroupBy(e => e.CategoryName).Select(e => e.First().Id).ToList();
            //var items = this.unitOfWork.ItemManager.GetAll().ToList().GroupBy(e => e.ElementName).Select(e => e.First().Id).ToList();
            //var accessories = this.unitOfWork.AccessoryManager.GetAll().ToList().GroupBy(e => e.ElementName).Select(e => e.First().Id).ToList();

            //this.unitOfWork.ItemManager.RemoveFilter(e => !items.Contains(e.Id));
            //this.unitOfWork.AccessoryManager.RemoveFilter(e => !accessories.Contains(e.Id));
            //this.unitOfWork.CategoryManager.RemoveFilter(e => !category.Contains(e.Id));
            // var model = this.unitOfWork.ModelManager.Get().GroupBy(x => x.ElementName).Select(d => d.First());

            return Ok(new { });
        }
        [HttpGet("add-cateogires-to-rolese")]
        //[Authorize(Roles = RolesHelpers.Users)]
        public async Task<IActionResult> adddata()
        {
            // var data = LoadData.readexcelfun2(0);
            //var data2 = LoadData.readexcelfun2(1);
            //  var categories = this.unitOfWork.CategoryManager.Get().ToList();
            //  var items = this.unitOfWork.ItemManager.Get().ToList().Select(e =>
            //  {
            //      var catname = data.Where(ex => ex.Item == e.ElementName).ToList();
            //      if (catname.Count() == 0)
            //          catname = data2.Where(ex => ex.Item == e.ElementName).ToList();
            //      if (catname.Count() == 0)
            //          return e;
            //      var re = categories.Where(ex => ex.CategoryName == catname.First().Category);
            //      if (re.Count() == 0)
            //          return e;
            //      e.CategoryId = re.First().Id;
            //      return e;
            //  }).ToList();
            //  data = LoadData.readexcelfunAccess(1);
            //  var access = this.unitOfWork.AccessoryManager.Get().ToList().Select(e =>
            //  {
            //      var catname = data.Where(ex => ex.Item == e.ElementName).ToList();
            //      if (catname.Count() == 0)
            //          return e;
            //      var re = categories.Where(ex => ex.CategoryName == catname.First().Category);
            //      if (re.Count() == 0)
            //          return e;
            //      e.CategoryId = re.First().Id;
            //      return e;
            //  }).ToList();

            return Ok(JsonConvert.SerializeObject(new
            {
                //     access = this.unitOfWork.ItemManager.UpdateList(items),
                //   items = this.unitOfWork.AccessoryManager.UpdateList(access)
            }));
        }

        [HttpPost("EditUserRoles/{id}")]
        [Authorize(Roles = RolesHelpers.Users)]
        public async Task<IActionResult> EditUserRoles(string id, IEnumerable<string> roles)
        {
            await _authService.UpdateUserRoleAsync(id, roles);
            return Ok();
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var result = await _authService.RegisterAsync(model);
            return result.IsOk ? Ok(JsonConvert.SerializeObject(result.User)) : BadRequest(result.Message);
        }
        [HttpPost("update")]
        public async Task<IActionResult> updateAsync([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var result = await _authService.UpdateAsync(model);
            return result.IsOk ? Ok(JsonConvert.SerializeObject(result.User)) : BadRequest(result.Message);
        }
        [HttpPost("test-admin")]
        public async Task<IActionResult> TestAdminAsync([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            model.Roles = _authService.systemRoles();

            var result = await _authService.RegisterAsync(model);

            if (!result.IsOk)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> GetTokenAsync([FromBody] TokenRequestModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = await _jwtService.GetTokenAsync(model);

                if (!result.IsAuthenticated)
                    return BadRequest(result.Message);
                return Ok(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }

        }
        [HttpPost("forget-passworx")]
        public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordFormForgetPasswordForm model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var result = await _authService.ForgetPassword(model, "");
            if (!result.IsOk)
                return BadRequest(result.Message);
            return Ok(result);
        }

    }
}
