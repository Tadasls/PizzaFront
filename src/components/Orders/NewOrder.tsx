import axios from 'axios';
import React, { useState } from 'react';
import { getPrice } from './Functions';
import { PizzaOrder } from './Type';


const PizzaOrderTable: React.FC = () => {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [orders, setOrders] = useState<PizzaOrder[]>([]);
  const [newOrder, setNewOrder] = useState<PizzaOrder>({
    pizzaName: '',
    size: '',
    toppings: 0
  });
  
  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setNewOrder({ ...newOrder, pizzaName: value });
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setNewOrder({ ...newOrder, size: value });
  };

  const handleToppingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewOrder({ ...newOrder, toppings: parseInt(value, 10) });
  };

  const handleAddOrder = () => {
    const newPizzaOrder = {
      pizzaName: newOrder.pizzaName,
      size: newOrder.size,
      toppings: newOrder.toppings,
      price: getPrice(newOrder.size, newOrder.toppings),
    };
  
    axios.post(`https://localhost:7134/api/Pizza/CreatePizza`, newPizzaOrder)
      .then((response) => {
        setOrders([...orders, newPizzaOrder]);
        setNewOrder({ pizzaName: '', size: '', toppings: 0 });
      })
      .catch((error) => {
        console.error(error); 
      });
  };

  const getTotalAmount = () => {
    const total = orders.reduce((total, order) => {
      return total + getPrice(order.size, order.toppings);
    }, 0);
    
    if (orders.some(order => order.toppings > 3)) {
      return total * 0.9; 
    } else {
      return total;
    }
  };

  const handleConfirmOrder = () => {
    const orderData = {
      orders: orders.map((order) => ({
        pizzaName: order.pizzaName,
        size: order.size,
        toppings: order.toppings,
        price: getPrice(order.size, order.toppings),
      })),
      totalAmount: getTotalAmount(),
    };
    
    sendOrderToBackend(orderData);
    setIsOrderConfirmed(true);
  };

  const sendOrderToBackend = (orderData: { orders: { pizzaName: string; size: string; toppings: number; price: number; }[]; totalAmount: number; }) => {
    axios.post(`https://localhost:7134/api/Order/CreateOrder`, orderData)
      .then((response) => {
        console.log(response.data); // Handle the backend response
      })
      .catch((error) => {
        console.error(error); 
      });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pizza Name</th>
            <th>Pizza Size</th>
            <th>Topping Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <select value={newOrder.pizzaName} onChange={handleNameChange}>
  <option value="">-- Select Pizza --</option>
  <option value="A Pizza">A Pizza</option>
  <option value="B Pizza">B Pizza</option>
  <option value="C Pizza">C Pizza</option>
</select>
            </td>
            <td>
              <select value={newOrder.size} onChange={handleSizeChange}>
                <option value="">-- Select Size --</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </td>
            <td>
              <input type="number" value={newOrder.toppings} onChange={handleToppingsChange} />
            </td>
            <td>
              <button onClick={handleAddOrder}>Add Order</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Pizza Name</th>
            <th>Pizza Size</th>
            <th>Topping Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.pizzaName}</td>
              <td>{order.size}</td>
              <td>{order.toppings}</td>
              <td>{getPrice(order.size, order.toppings)} EUR</td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>Total Amount:</td>
            <td>{getTotalAmount()} EUR</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleConfirmOrder} disabled={isOrderConfirmed}>
  {isOrderConfirmed ? 'Order Confirmed!' : 'Confirm Order'}
</button>
    </div>
  );
};

export default PizzaOrderTable;
