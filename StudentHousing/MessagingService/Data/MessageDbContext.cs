using MessagingService.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Data;

public class MessageDbContext: DbContext
{
    public MessageDbContext(DbContextOptions<MessageDbContext> dbContextOptions)
        : base(dbContextOptions)
    {
    }

    public DbSet<Message> Messages { get; set; }
    public DbSet<PrivateChat> PrivateChats { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Message>(entity =>
        {
            entity.Property(e => e.Id)
                .HasColumnName("id");

            entity.Property(e => e.SenderId)
                .HasColumnName("senderId")
                .IsRequired()
                .HasColumnType("int");

            entity.Property(e => e.Content)
                .HasColumnName("content")
                .IsRequired()
                .HasColumnType("nvarchar")
                .HasMaxLength(1000);

            entity.Property(e => e.TimeStamp)
                .HasColumnName("timeStamp")
                .HasDefaultValue(DateTime.Now);

            entity.Property(e => e.PrivateChatId)
                .HasColumnName("privateChatId")
                .IsRequired();

            entity.HasOne(e => e.PrivateChat)
                .WithMany(c => c.Messages)
                .HasForeignKey(e => e.PrivateChatId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Message_PrivateChat");
        });

        modelBuilder.Entity<PrivateChat>(entity =>
        {
            entity.Property(e => e.Id)
                .HasColumnName("id");

            entity.Property(e => e.UniqueName)
                .HasColumnName("uniqueName")
                .IsRequired()
                .HasColumnType("nvarchar")
                .HasMaxLength(100);

            entity.Property(e => e.User1Id)
                .HasColumnName("user1Id")
                .IsRequired();

            entity.Property(e => e.User2Id)
                .HasColumnName("user2Id")
                .IsRequired();
        });

    }
}