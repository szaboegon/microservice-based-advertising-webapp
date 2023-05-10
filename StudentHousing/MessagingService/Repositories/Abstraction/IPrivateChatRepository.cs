using MessagingService.Models;

namespace MessagingService.Repositories.Abstraction
{
    public interface IPrivateChatRepository
    {
        Task AddAsync(PrivateChat chat);

        Task<PrivateChat?> GetUniqueNameByUserIdsAsync(int user1Id, int user2Id);

        Task<PrivateChat?> GetByUniqueNameAsync(string uniqueName);

        void Remove(PrivateChat chat);

        Task<IEnumerable<PrivateChat>> GetAllByUserIdAsync(int userId);

        Task SaveAsync();
    }
}
