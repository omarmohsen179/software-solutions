using MimeKit;
using System.IO;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;

using System;
using AdminPanelApi.Models;

namespace AdminPanelApi.EmailSender
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;

        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }
  
        public async Task SendEmailAsync(string body, string subject, string to)
        {
            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = body,
            };

            var email = new MimeMessage
            {
                Sender = MailboxAddress.Parse(_mailSettings.Mail),
                From =
                {
                    MailboxAddress.Parse(_mailSettings.Mail)
                },
                Subject = subject,
                To =
                {
                    MailboxAddress.Parse(to)
                },
                Body = bodyBuilder.ToMessageBody()
            };
            try
            {
                using var smtp = new SmtpClient()
                {
                    CheckCertificateRevocation = false
                };
                smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.Auto);
                await smtp.AuthenticateAsync(_mailSettings.Mail, _mailSettings.Password);
                await smtp.SendAsync(email);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;  
            }
        }

  
        public async Task ContactUsRequestEmailAsync(ContactUs mailRequest)
        {
            string filePathclient = Directory.GetCurrentDirectory() + "\\wwwroot\\ContactUsMailForm.html";
            StreamReader str = new StreamReader(filePathclient);
            string mailTextclient = await str.ReadToEndAsync();

            str.Close();
            //client
            await SendEmailAsync(mailTextclient, "Contact Us Request "+ mailRequest.Name, mailRequest.Email);



            string filePathadmin= Directory.GetCurrentDirectory() + "\\wwwroot\\AdminContactUsMailForm.html";
            StreamReader stradmin = new StreamReader(filePathadmin);

            string mailTextadmin = await stradmin.ReadToEndAsync();
            stradmin.Close();
            mailTextadmin = mailTextadmin
            .Replace("[namev]", mailRequest.Name)
            .Replace("[emailv]", mailRequest.Email)
            .Replace("[phonev]", mailRequest.PhoneNumber)
            .Replace("[messagev]", mailRequest.Message);
            //admin
            await SendEmailAsync(mailTextadmin, "Contact Us Request " + mailRequest.Name, _mailSettings.Mail);
        }

    }

}
