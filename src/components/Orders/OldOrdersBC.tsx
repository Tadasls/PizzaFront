import { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

interface PizzaOrder {
  date: Date | undefined;
  totalAmount: number;
}

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<PizzaOrder[]>([]);
  const [showAllOrders, setShowAllOrders] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url = 'https://localhost:7134/api/Order/GetAllEntries';
        const response = await fetch(url);
        const data = await response.json();
        const filteredData = data.filter((order: PizzaOrder) => order.date !== undefined);
        setOrders(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    if (showAllOrders) {
      fetchData();
    }
  }, [showAllOrders]);

  const handleShowAllOrders = () => {
    setShowAllOrders(true);
  };

  const handleShowRecentOrders = () => {
    const currentTime = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
    const recentOrders = orders.filter((order) => {
      if (order.date === undefined) {
        return false;
      }
      const orderTime = order.date.getTime();
      const diff = currentTime.getTime() - orderTime;
      return diff <= oneDay;
    });
    setOrders(recentOrders);
  };

  return (
    <>
      <button onClick={handleShowAllOrders}>Show All Orders</button>
      <button onClick={handleShowRecentOrders}>Show Recent Orders</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders to display.</p>
      ) : (
        <Table aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.date?.toISOString()}>
                <TableCell>{order.date?.toLocaleDateString()}</TableCell>
                <TableCell>{order.totalAmount.toFixed(2)} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default OrdersTable;
