using System.ComponentModel.DataAnnotations;

namespace PartyFoodOrderAPI
{
    public class BurgerExtras
    {

        [Required]
        [MaxLength(20)]
        public string ConsumerName { get; init; }

        [Required]
        public bool Egg { get; init; }

        [Required]
        public bool Bacon { get; init; }

        public BurgerExtras(string consumerName, bool egg, bool bacon)
        {
            ConsumerName = consumerName;
            Egg = egg;
            Bacon = bacon;
        }
    }
}
