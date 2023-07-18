using System.ComponentModel.DataAnnotations;

namespace AdminPanelApi.Services
{
    public class ForgetPasswordFormForgetPasswordForm
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string email { get; set; }
    }
    public class valid
    {
        public bool IsOk { get; set; }
        public object User { get; set; }
        public string Message { get; set; }
    }
    public class emailconfirm
    {
        public string username { get; set; }
        public string token { get; set; }
    }
    public class AuthObj
    {
    }
}
