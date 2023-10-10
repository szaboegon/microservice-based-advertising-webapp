using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmailNotificationService.Services.Interfaces;

public interface IEmailSenderService
{
    Task SendEmail(string receiverAddress, string receiverName, string subject, string message);
}