namespace PartyFoodOrderAPI
{
    public class FoodOrder
    {
        public DateTime OrderTime { get; set; }

        public string? OrderedProduct { get; set; }

        public int Count { get; set; }

        public string? ConsumerName { get; set; }

    }
}
 