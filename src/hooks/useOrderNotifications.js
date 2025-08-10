import { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import secret from '../secret';

const useSocketNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  // Hàm xử lý thông báo mới
  const handleNewNotification = useCallback((data) => {
    setNotifications(prev => [{
      ...data,
      id: `${data.orderId}-${Date.now()}`,
      timestamp: new Date().toISOString()
    }, ...prev]);
    setUnreadCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log('No token found, skipping socket connection');
      return;
    }

    console.log('Attempting to connect to socket server...');

    const newSocket = io(secret.SOCKET, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Sự kiện khi kết nối thành công
    newSocket.on('connect', () => {
      console.log('✅ Socket connected successfully!');
      console.log('Socket ID:', newSocket.id);
      console.log('Connection time:', new Date().toISOString());
      setConnectionStatus('connected');
    });

    // Sự kiện khi mất kết nối
    newSocket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setConnectionStatus('disconnected');
    });

    // Sự kiện khi có lỗi kết nối
    newSocket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
      setConnectionStatus('error');
    });

    // Sự kiện khi kết nối lại
    newSocket.on('reconnect', (attempt) => {
      console.log(`♻️ Reconnected after ${attempt} attempts`);
      setConnectionStatus('connected');
    });

    // Nhận thông báo
    newSocket.on('payment-success', handleNewNotification);
    newSocket.on('new_order', handleNewNotification);

    setSocket(newSocket);

    return () => {
      console.log('Cleaning up socket connection...');
      newSocket.off('connect');
      newSocket.off('disconnect');
      newSocket.off('connect_error');
      newSocket.off('reconnect');
      newSocket.off('payment-success');
      newSocket.off('new_order');
      newSocket.disconnect();
    };
  }, [handleNewNotification]);

  // Hàm xóa thông báo
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Hàm xóa tất cả
  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  return {
    notifications,
    unreadCount,
    removeNotification,
    clearAll,
    socket,
    connectionStatus
  };
};

export default useSocketNotifications;