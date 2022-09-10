import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async find(id: string): Promise<Order> {
    const response = await OrderModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: OrderItemModel,
        },
      ],
    });
    const orderItens = response.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    );
    const order = new Order(response.id, response.customer_id, orderItens);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const response = await OrderModel.findAll({
      include: {
        model: OrderItemModel
      }
    });

    const allOrdens = response.map((order) => {
      const orderItens = order.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      );
      return new Order(order.id, order.customer_id, orderItens);
    });

    return allOrdens;
  }

  async update(entity: Order): Promise<void> {
    console.log(entity)
    await OrderModel.update({
      customer_id: entity.customerId
    },{
      where: {
        id: entity.id
      }
    })
  }
}
