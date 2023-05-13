using MessagingService.Models;
using System.Threading.Tasks;

namespace MessagingService.Repositories.Abstraction
{
    public interface IPrivateChatRepository
    {
        Task AddAsync(PrivateChat chat);

        Task<PrivateChat?> GetUniqueNameByUserIdsAsync(int user1Id, int user2Id);

        Task<PrivateChat?> GetByUniqueNameAsync(string uniqueName);

        void Remove(PrivateChat chat);

        Task<IEnumerable<PrivateChat>> GetAllByUserIdAsync(int userId);

        Task<List<int>> GetAllChatPartnerIdsByUserIdAsync(int userId);

        Task SaveAsync();
    }
}
