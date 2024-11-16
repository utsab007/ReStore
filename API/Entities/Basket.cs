namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        public void AddItem(Product product,int Quantity)
        {
            if(Items.All(item => item.ProductId != product.Id)) {
                Items.Add(new BasketItem() { Product = product,Quantity=Quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if(existingItem!= null) existingItem.Quantity += Quantity;
        }
        public void RemoveItem(int productId,int quantity) {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if(item == null) return;
            item.Quantity -= quantity;
            if(item.Quantity ==0) Items.Remove(item);
        }
    }
}