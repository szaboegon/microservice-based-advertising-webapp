﻿namespace MessagingService.DAL;

public class ConnectionHandler
{
    public static string GetMessageDbConnectionString()
    {
        return $"" +
               $"Data Source={Environment.GetEnvironmentVariable("DB_HOST")};" +
               $"Initial Catalog={Environment.GetEnvironmentVariable("DB_NAME")};" +
               $"User ID=sa;" +
               $"Password={Environment.GetEnvironmentVariable("DB_SA_PASSWORD")};" +
               $"TrustServerCertificate=true";
    }
}