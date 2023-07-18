using MimeKit;
using System.IO;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;

using System;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using AdminPanelApi.Models;

namespace AdminPanelApi.EmailSender
{
    public interface IMailService
    {
        Task SendEmailAsync(string body, string subject, string to);
        Task ContactUsRequestEmailAsync(ContactUs mailRequest);
    }
}
