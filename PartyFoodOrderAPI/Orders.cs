namespace PartyFoodOrderAPI
{
    public class Orders
    {
        private static readonly List<FoodOrder> FoodOrders = new();
        private static readonly List<FoodOrder> BurgerOrders = new();

        public static void AddFoodOrder(FoodOrder foodOrder)
        {
            FoodOrders.Add(foodOrder);
        }

        public static void AddBurgerOrder(FoodOrder foodOrder)
        {
            BurgerOrders.Add(foodOrder);
        }

        public static List<FoodOrder> GetFoodOrders()
        {
            return FoodOrders;
        }

        public static FoodOrder? GetFoodOrderById(int id)
        {
            return FoodOrders.Find(x => x.OrderId == id);
        }

        public static List<FoodOrder> GetBurgerOrders()
        {
            return BurgerOrders;
        }

        public static void DeleteFoodOrder(FoodOrder order)
        {
            FoodOrders.Remove(order);
        }
    }
}
