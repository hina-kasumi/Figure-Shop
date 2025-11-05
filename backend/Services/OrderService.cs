using backend.Dtos;
using backend.Entities.Enum;
using backend.Repositories;

namespace backend.Services;

public class OrderService
{
    private readonly OrderRepository _orderRepository;
    private readonly UserRepository _userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository)
    {
        _orderRepository = orderRepository;
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<OrderSummary>> SearchOrder(SearchOrderRequest request)
    {
        OrderStatusEnum? statusEnum = null;

        if (!string.IsNullOrWhiteSpace(request.OrderStatus))
        {
            if (Enum.TryParse<OrderStatusEnum>(request.OrderStatus, true, out var parsedStatus))
            {
                statusEnum = parsedStatus;
            }
        }

        var orders = await _orderRepository.SearchOrder(request.UserEmail, statusEnum);

        var userIds = orders.Select(o => o.UserId).Distinct().ToList();
        
        var users = await _userRepository.GetUsersByIds(userIds);
        
        var userDictionary = users.ToDictionary(u => u.Id);

        var dtos = orders.Select(o =>
        {
            userDictionary.TryGetValue(o.UserId, out var user);
            return new OrderSummary
            {
                Id = o.Id,
                TotalPrice = o.TotalPrice,
                PaidPrice = o.PaidPrice,
                PhoneNumber = o.PhoneNumber,
                Address = o.Address,
                Status = o.Status.ToString(),
                OrderDate = o.CreatedAt,
                DeliveryDate = o.UpdatedAt,
                User = user == null ? null : new UserSummary
                    {
                        Id = user.Id,
                        Email = user.Email
                    },
                OrderFigures = o.OrderFigures.Select(of => new OrderFigureSummary
                {
                    OrderId = of.OrderId,
                    FigureId = of.FigureId,
                    Quantity = of.Quantity,
                    Price = of.Price
                }).ToList()
            };
        });

        return dtos;
    }

    public async Task<bool> UpdateOrderStatus(Guid orderId, OrderStatusEnum newStatus)
    {
        var order = await _orderRepository.GetOrderById(orderId);
        if (order == null)
        {
            return false;
        }
        
        order.Status = newStatus;
        await _orderRepository.SaveChangesAsync();
        return true;
    }
}