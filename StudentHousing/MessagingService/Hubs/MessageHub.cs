using Microsoft.AspNetCore.SignalR;

namespace MessagingService.Hubs
{
    public class MessageHub : Hub
    {
        /*public override Task OnConnectedAsync()
        {
            
        }*/
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }

        public async Task SendToUser(int userId, string receiverConnectionId, string message)
        {
            await Clients.Client(receiverConnectionId).SendAsync("ReceiveMessage", userId, message);
        }

        public string GetConnectionId () => Context.ConnectionId;
    }
}
