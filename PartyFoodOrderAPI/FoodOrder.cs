using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PartyFoodOrderAPI
{
    public class FoodOrder
    {
        public DateTimeOffset CreatedAt { get; set; }

        public int Id { get; set; }

        public Product OrderedProduct { get; set; }

        public int Count { get; set; }
        
        public string? ConsumerName { get; set; }

        public bool MarkedAsFinished { get; set; }
        
        public string? Comment { get; set; }
        
        public FoodOrder(DateTimeOffset createdAt, int id, Product orderedProduct, int count, string consumerName, string comment)
        {
            CreatedAt = createdAt;
            Id = id; 
            OrderedProduct = orderedProduct;
            Count = count;
            ConsumerName = consumerName;
            Comment = comment;
            MarkedAsFinished = false;
        }

        public FoodOrder() { }

        public void SetMarkedAsFinished(bool flag = true)
        {
            MarkedAsFinished = flag;
        }

        public int GetOrderId()
        {
            return Id;
        }
    }
}
 