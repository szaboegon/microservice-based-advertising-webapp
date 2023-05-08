using MessagingService.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingService.Data
{
    public class MessageDbContext: DbContext
    {
        public MessageDbContext(DbContextOptions<MessageDbContext> dbContextOptions)
                : base(dbContextOptions)
        {
        }

        public DbSet<Message> Messages { get; set; }

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

                entity.Property(e => e.ReceiverId)
                      .HasColumnName("receiverId")
                      .IsRequired()
                      .HasColumnType("int");

                entity.Property(e => e.Content)
                      .HasColumnName("content")
                      .IsRequired()
                      .HasColumnType("nvarchar")
                      .HasMaxLength(1000);

                entity.Property(e => e.DateTime)
                     .HasColumnName("dateTime")
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

                entity.Property(e => e.Participant1Id)
                       .HasColumnName("participant1Id")
                       .IsRequired()
                       .HasColumnType("int");

                entity.Property(e => e.Participant2Id)
                      .HasColumnName("participant2Id")
                      .IsRequired()
                      .HasColumnType("int");
            });
        }
    }
}
