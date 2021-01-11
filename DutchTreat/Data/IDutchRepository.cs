using DutchTreat.Data.Entities;
using System.Collections.Generic;

namespace DutchTreat.Data
{
    public interface IDutchRepository
    {
        IEnumerable<Product> GetAllProducts();

        IEnumerable<Product> GetProductsByCategory(string category);

        bool SaveAll();

        IEnumerable<Order> GetAllOrders(bool includeItems);

        IEnumerable<Order> GetAllOrdersByUser(string userName, bool includeItems);

        Order GetOrderById(string userName, int id);

        void AddOrder(Order model);
    }
}