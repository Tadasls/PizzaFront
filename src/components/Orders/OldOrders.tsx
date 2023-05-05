import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

interface Order {
  orderID: number;
  totalAmount: number;
  orderDate: string;
}

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = async () => {
    try {
      const response = await fetch('https://localhost:7134/api/Order/GetAllEntries');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={getOrders}>Get Orders</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Order Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderID}>
              <TableCell>{order.orderID}</TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>{order.orderDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default OrdersTable;
