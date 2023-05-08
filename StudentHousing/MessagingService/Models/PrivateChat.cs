using System.Diagnostics.Contracts;

namespace MessagingService.Models
{
    public class PrivateChat
    {
        public int Id { get; set; }
        public int Participant1Id { get; set; }
        public int Participant2Id { get; set; }

        private ICollection<Message>? _messages;
        public ICollection<Message> Messages
        {
            set => _messages = value;
            get => _messages ?? throw new InvalidOperationException("Uninitialized property: " + nameof(ICollection<Message>));
        }
    }
}
