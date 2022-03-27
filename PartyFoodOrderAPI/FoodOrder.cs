namespace PartyFoodOrderAPI
{
    public class FoodOrder
    {
        public long Created { get; set; }

        public int OrderId { get; set; }

        public string? OrderedProduct { get; set; }

        public int Count { get; set; }

        public string? ConsumerName { get; set; }

        public bool MarkedAsFinished { get; set; }

        public string? Comment { get; set; }

        public FoodOrder(long created, int orderId, string orderedProduct, int count, string consumerName, string comment)
        {
            Created = created;
            OrderId = orderId;
            OrderedProduct = orderedProduct;
            Count = count;
            ConsumerName = consumerName;
            MarkedAsFinished = false;
            Comment = comment;
        }

        public void SetMarkedAsFinished(bool flag = true)
        {
            MarkedAsFinished = flag;
        }

        public int GetOrderId()
        {
            return OrderId;
        }
    }
}
 