namespace MessagingService.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string? Content { get; set; }
        public DateTime TimeStamp { get; set; }
        public int PrivateChatId { get; set; }

        private PrivateChat? _privateChat;
        public PrivateChat PrivateChat
        {
            set => _privateChat = value;
            get => _privateChat ?? throw new InvalidOperationException("Uninitialized property: " + nameof(PrivateChat));
        }
    }
}
