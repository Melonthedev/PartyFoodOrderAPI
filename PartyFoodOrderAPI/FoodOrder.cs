using System.ComponentModel.DataAnnotations;

namespace PartyFoodOrderAPI
{
    public class FoodOrder
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; init; }

        public Product? OrderedProduct { get; set; }

        public int OrderedProductId { get; set; }

        public DateTimeOffset CreatedAt { get; set; }

        public int Count { get; set; }

        public string? ConsumerName { get; set; }

        public bool MarkedAsFinished { get; set; }
        
        public string? Comment { get; set; }
        
        public FoodOrder(DateTimeOffset createdAt, int orderedProductId, int count, string consumerName, string comment)
        {
            CreatedAt = createdAt;
            OrderedProductId = orderedProductId;
            Count = count;
            ConsumerName = consumerName;
            Comment = comment;
            MarkedAsFinished = false;
        }

        public void SetMarkedAsFinished(bool flag = true)
        {
            MarkedAsFinished = flag;
        }
    }
}
 