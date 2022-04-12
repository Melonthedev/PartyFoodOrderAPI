namespace PartyFoodOrderAPI
{
    public class Orders
    {
        private static readonly List<FoodOrder> _foodOrders = new();
        private static readonly List<FoodOrder> _burgerOrders = new();

        public static void AddFoodOrder(FoodOrder foodOrder)
        {
            _foodOrders.Add(foodOrder);
        }

        public static void AddBurgerOrder(FoodOrder foodOrder)
        {
            _burgerOrders.Add(foodOrder);
        }

        public static List<FoodOrder> GetFoodOrders()
        {
            return _foodOrders;
        }

        public static FoodOrder GetFoodOrderById(int id)
        {
            return _foodOrders.Find(x => x.OrderId == id);
        }

        public static List<FoodOrder> GetBurgerOrders()
        {
            return _burgerOrders;
        }

        public static void DeleteFoodOrder(FoodOrder order)
        {
            _foodOrders.Remove(order);
        }
    }
}
