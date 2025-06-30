import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState({
    title: '',
    showtime: '',
    date: '',
    cinema: '',
    seats: [],
    totalSeatPrice: 0,
    services: [],
    totalServicePrice: 0,
    totalPrice: 0,
    movieId: null,
    showtimeId: null,
    cinemaId: null,
    email: '',
    name: '',
    userId: null,
  });

  // Lấy email từ token khi khởi tạo
  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       updateOrderData({ userId: decoded.id, email: decoded.email, name: decoded.fullname });
  //     } catch (error) {
  //       console.error('Error decoding accessToken:', error);
  //     }
  //   }
  // }, []);

  // Lấy thông tin user từ localStorage khi khởi tạo
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        updateOrderData({ 
          userId: user.id, 
          email: user.email, 
          name: user.fullname || user.name 
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const updateOrderData = (newData) => {
    setOrderData(prev => {
      const updatedData = { ...prev, ...newData };
      
      // Tính toán lại các giá trị tổng
      const totalSeatPrice = updatedData.seats.reduce((sum, seat) => sum + seat.price, 0);
      const totalServicePrice = updatedData.services.reduce((sum, service) => sum + (service.price * service.quantity), 0);
      const totalPrice = totalSeatPrice + totalServicePrice;
      
      const finalData = { 
        ...updatedData, 
        totalSeatPrice,
        totalServicePrice,
        totalPrice
      };
      
      console.log('Booking data updated:', finalData);
      return finalData;
    });
  };

  const resetOrderData = () => {
    setOrderData({
      title: '',
      showtime: '',
      date: '',
      cinema: '',
      seats: [],
      totalSeatPrice: 0,
      services: [],
      totalServicePrice: 0,
      totalPrice: 0,
      movieId: null,
      showtimeId: null,
      cinemaId: null,
      email: orderData.email, // Giữ lại email khi reset
      name: orderData.name,
      userId: orderData.userId,
    });
    console.log('Booking data reset');
  };

  return (
    <OrderContext.Provider value={{ orderData, updateOrderData, resetOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);