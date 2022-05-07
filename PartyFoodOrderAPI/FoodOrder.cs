using System.ComponentModel.DataAnnotations.Schema;

namespace PartyFoodOrderAPI
{
    public class FoodOrder
    {
        public long Created { get; set; }

        public int Id { get; set; }

        public Product OrderedProduct { get; set; }

        public int Count { get; set; }

        public string? ConsumerName { get; set; }

        public bool MarkedAsFinished { get; set; }

        public string? Comment { get; set; }

        public FoodOrder(long created, int id, Product orderedProduct, int count, string consumerName, string comment)
        {
            Created = created;
            Id = id; //TODO: cross out
            OrderedProduct = orderedProduct;
            Count = count;
            ConsumerName = consumerName;
            Comment = comment;
            MarkedAsFinished = false;
        }

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
 