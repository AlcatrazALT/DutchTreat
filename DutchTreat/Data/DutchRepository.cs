using DutchTreat.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DutchTreat.Data
{
    public class DutchRepository : IDutchRepository
    {
        private readonly DutchContext context;
        private readonly ILogger<DutchRepository> logger;

        public DutchRepository(DutchContext context, ILogger<DutchRepository> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        public void AddOrder(Order model)
        {
            context.Add(model);
        }

        public IEnumerable<Order> GetAllOrders()
        {
            return context.Orders.Include(o => o.Items).ThenInclude(i => i.Product).ToList();
        }

        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                logger.LogInformation("Get All Products was called");
                return context.Products.OrderBy(p => p.Title).ToList();
            }
            catch (Exception ex)
            {
                logger.LogError($"Failed to get all products: {ex}");
                return null;
            }
        }

        public Order GetOrderById(int id)
        {
            return context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Where(o => o.Id == id)
                .FirstOrDefault();
        }

        public IEnumerable<Product> GetProductsByCategory(string category)
        {
            try
            {
                return context.Products.Where(p => p.Category == category).ToList();
            }
            catch (Exception ex)
            {
                logger.LogError($"Failed to get all products by category: {ex}");
                return null;
            }
        }

        public bool SaveAll()
        {
            return context.SaveChanges() > 0;
        }
    }
}