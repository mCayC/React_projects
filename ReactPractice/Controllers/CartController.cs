using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SimpleModelsAndRelations.Models;



namespace SimpleModelsAndRelations.Controllers
{
    public class CartOrder
    {
        public User user { get; set; }
        public List<ProductQuantity> products { get; set; }
    }
    public class ProductQuantity
    {
        public Product product { get; set; }
        public int quantity { get; set; }
    }


    [Route("[controller]")]
    public partial class CartController : Controller
    {
        private readonly SimpleModelsAndRelationsContext _context;
        private readonly ProjectNameOptions _projectNameOptions;


        public CartController(SimpleModelsAndRelationsContext context, IOptions<ProjectNameOptions> projectNameOptions)
        {
            _context = context;
            _projectNameOptions = projectNameOptions.Value;
            //Default database items
            if (_context.Products.Count() == 0)
            {
                _context.Products.AddRange(new Product[]{
                new Product(){Name="Potato", Price=1},
                new Product(){Name="Tomato", Price=0.75f},
                new Product(){Name="Apple", Price=1},
                new Product(){Name="Ananas", Price=1.5f},
                new Product(){Name="Carrot", Price=0.5f},
                new Product(){Name="Egg", Price=2}
              });
                _context.SaveChanges();
            }
        }



        // TODO 4: complete the implementation of the query below 

        [HttpPut("PlaceOrder")]
        public IActionResult PlaceOrder([FromBody] CartOrder order)
        {

            List<Product> not_placed_items = new List<Product>();

            User user = _context.Users.FirstOrDefault(u => u.Id == order.user.Id || u.Name == order.user.Name);
            //order is given by user who is not yet in database.
            if (user == null)
            {
                _context.Users.Add(order.user);
                user = order.user;
                _context.SaveChanges();
            }

            Order new_order = new Order() { User = user, Date = DateTime.Now };
            _context.Orders.Add(new_order);

            foreach (var c_p in order.products)
            {
                Product p = _context.Products.FirstOrDefault(_p => _p.Id == c_p.product.Id);
                if (p != null)
                {
                    var o_p = new Order_Product()
                    {
                        Product = p,
                        Order = new_order,
                        Quantity = c_p.quantity
                    };
                    _context.Order_Products.Add(o_p);
                }
                else
                {
                    not_placed_items.Add(p);
                }
            }

            _context.SaveChanges();

            return Ok(not_placed_items);
        }


        [HttpGet("GetOrders")]
        public IActionResult GetOrders()
        {
            //get all orders
            var orders_AUX = (
                              from u in _context.Users
                              from o in _context.Orders
                              where u.Id == o.UserId

                              from o_p in _context.Order_Products
                              from p in _context.Products
                              where p.Id == o_p.ProductId && o.Id == o_p.OrderId

                              select new
                              {
                                  ProductName = p.Name,
                                  ProductPrice = p.Price,
                                  Quantity = o_p.Quantity,
                                  User = u.Name,
                                  OrderId = o.Id
                              }).ToList();

            var orders = orders_AUX.GroupBy(e => e.OrderId, e => e, (k, v) => new { OrderId = k, Value = v });

            return Ok(orders);
        }


        [HttpGet("GetProducts")]
        public IActionResult GetProducts()
        {
            return Ok(_context.Products);
        }


        [HttpGet("GetProduct/{id}")]
        public IActionResult GetProduct(int id)
        {
            return Ok(_context.Products.FirstOrDefault(p => p.Id == id));
        }
    }
}
