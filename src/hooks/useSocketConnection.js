import { useEffect } from 'react';
import { io } from 'socket.io-client';
import secret from '../secret';

const useSocketConnection = () => {
  useEffect(() => {
    const socket = io('http://localhost:5506', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      auth: {
        token: localStorage.getItem('accessToken') || 'unauthenticated'
      }
    });

    // Sự kiện kết nối
    socket.on('connect', () => {
      console.log('Connected with ID:', socket.id);
    });

    // Sự kiện test từ server
    socket.on('server_test', (data) => {
      console.log('Test message from server:', data);
    });

    // Xử lý lỗi chi tiết
    socket.on('connect_error', (err) => {
      console.error('Connection failed:', {
        message: err.message,
        type: err.type,
        description: err.description
      });
    });

    return () => {
      socket.off('connect');
      socket.off('server_test');
      socket.off('connect_error');
      socket.disconnect();
    };
  }, []);
};

export default useSocketConnection;