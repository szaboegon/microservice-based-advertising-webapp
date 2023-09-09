using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmailNotificationService.Models.Options;

public class EmailOptions
{
    public const string ConfigSectionName = "EmailConfig";

    public required string SmtpServer { get; set; }
    public required int Port { get; set; }
    public required string SenderAddress { get; set; }
    public required string SenderPassword { get; set; }
}