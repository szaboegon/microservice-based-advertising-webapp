namespace MessagingService.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string? Content { get; set; }
        public DateTime TimeStamp { get; set; }
        public int PrivateChatId { get; set; }

        public PrivateChat? PrivateChat;
    }
}
