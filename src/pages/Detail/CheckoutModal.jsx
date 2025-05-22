import { useContext, useEffect, useRef, useState } from 'react'
import { useOrder } from '../../contexts/OrderContext'
import DetailService from '../../services/movieDetailService'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext';

const CheckoutModal = ({ onClose, onConfirmPayment }) => {
  const navigate = useNavigate();
  const { orderData } = useOrder();
  const { isAuthenticated } = useContext(UserContext);

  // Phương thức thanh toán
  const paymentMethods = [
    // { id: 1, name: 'Ví điện tử MoMo', icon: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo.png' },
    { id: 2, name: 'Chuyển khoản ngân hàng', icon: 'https://cdn-icons-png.flaticon.com/512/196/196578.png' },
    { id: 3, name: 'ZaloPay', icon: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png' },
    { id: 4, name: 'Tiền mặt tại rạp', icon: 'https://cdn-icons-png.flaticon.com/512/2703/2703544.png' }
  ];

  const [selectedPayment, setSelectedPayment] = useState(null);

  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [bankInfo, setBankInfo] = useState({
    bankName: 'MBBank',
    bankAccount: '0867122003',
    amount: 
      // orderData.totalPrice,
      2000,
    paymentDescription: ''
  });

  // time out
  const [timeLeft, setTimeLeft] = useState(300); // 5 phút = 300 giây
  const timerRef = useRef(null);
  const pollingRef = useRef(null);

  const handleConfirmPayment = () => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để tiếp tục thanh toán.");
      return;
    }

    if (!selectedPayment) {
      alert('Vui lòng chọn phương thức thanh toán');
      return;
    }

    if (selectedPayment === 2) { // Chuyển khoản ngân hàng
      generateQR();
    } else {
      onConfirmPayment(selectedPayment);
    }
  };

  // qr
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateQR = () => {
    const transactionId = Math.floor(Math.random() * 1000000000);
    const description = 
      // `MOVIE${transactionId}`;
      'MOVIESE12440337'
    setBankInfo(prev => ({
      ...prev,
      paymentDescription: description
    }));
    
    const qrUrl = `https://img.vietqr.io/image/${bankInfo.bankName}-${bankInfo.bankAccount}-compact2.jpg?amount=${bankInfo.amount}&addInfo=${description}&accountName=MOVIETICKET`;
    setQrCodeUrl(qrUrl);
    setShowQRModal(true);
    setTimeLeft(300); // Reset thời gian về 5 phút
  };

  useEffect(() => {
    if (showQRModal) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setShowQRModal(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [showQRModal]);

  // Hàm kiểm tra thanh toán
  const checkPaymentStatus = async (reference) => {
    try {
      // Chuẩn bị payload đúng định dạng
      const payload = {
        amount: bankInfo.amount || orderData.totalPrice,
        reference: reference,        
        order: {
          name: orderData.name,
          email: orderData.email,
          title: orderData.title,
          showtime: orderData.showtime,
          date: orderData.date,
          cinema: orderData.cinema,
          cinemaId: orderData.cinemaId,
          movieId: orderData.movieId,
          showtimeId: orderData.showtimeId,
          userId: orderData.userId,
          seats: orderData.seats.map(seat => ({
            id: seat.id,
            name: seat.name,
            price: seat.price,
            type: seat.type
          })),
          services: orderData.services.map(service => ({
            id: service.id,
            name: service.name,
            price: service.price,
            quantity: service.quantity
          })),
          totalSeatPrice: orderData.totalSeatPrice,
          totalServicePrice: orderData.totalServicePrice,
          totalPrice: orderData.totalPrice,
        }
      };

      const response = await DetailService.checkPayment(payload);

      if (response.data?.success) {
        clearInterval(pollingRef.current);
        setShowQRModal(false);
        
        // Thông báo thành công
        alert('Thanh toán thành công! Vé sẽ được gửi qua email.');
        
        // Điều hướng về trang chủ sau 2 giây
        setTimeout(() => {
          navigate('/');
        }, 2000);
        
        // Gọi callback xác nhận thanh toán
        onConfirmPayment(selectedPayment);
      }
    } catch (error) {
      console.error('Payment check error:', error);
      // Có thể thêm thông báo lỗi cho người dùng ở đây
    }
  };

  // Bắt đầu polling khi QR modal hiển thị
  useEffect(() => {
    if (showQRModal && bankInfo.paymentDescription) {
      pollingRef.current = setInterval(() => {
        checkPaymentStatus(bankInfo.paymentDescription);
      }, 5000); // Kiểm tra mỗi 5 giây

      return () => clearInterval(pollingRef.current);
    }
  }, [showQRModal, bankInfo.paymentDescription]);

  const QRModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 "
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      }}
    >
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        {/* <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => setShowQRModal(false)}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div> */}

        <div className="text-center mb-4">
          <p className="mb-2">Quét QR code để thanh toán</p>
          {qrCodeUrl && (
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="w-64 h-64 mx-auto border border-gray-600 rounded-lg"
            />
          )}
        </div>

        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <div className="space-y-2">
            <p><span className="font-medium">Ngân hàng:</span> {bankInfo.bankName}</p>
            <p><span className="font-medium">Số tài khoản:</span> {bankInfo.bankAccount}</p>
            <p><span className="font-medium">Số tiền:</span> {bankInfo.amount.toLocaleString()}đ</p>
            <p><span className="font-medium">Nội dung:</span> {bankInfo.paymentDescription}</p>
          </div>
          <div className="text-red-500 font-medium">
            Thời gian còn lại: {formatTime(timeLeft)}
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => setShowQRModal(false)}
            className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium cursor-pointer"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
    >
      <div className="bg-gray-800 text-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Xác nhận đơn hàng</h2>
            <button 
              onClick={onClose}
              className="cursor-pointer user-select-none text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cột trái - Thông tin đơn hàng */}
            <div>
              <div className="mb-6">
                <h3 className="text-xl text- font-semibold border-b border-gray-600 pb-2 mb-4" style={{ marginBottom: '12px', fontSize: '24px' }}>Thông tin vé</h3>
                <div className="space-y-3">
                  <p><span className="font-medium" style={{ fontSize: '20px' }}></span> {orderData.title}</p>
                  <p><span className="font-medium">Rạp:</span> {orderData.cinema}</p>
                  <p><span className="font-medium">Ngày:</span> {orderData.date}</p>
                  <p><span className="font-medium">Suất chiếu:</span> {orderData.showtime}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4" style={{ fontSize: '20px' }}>Ghế đã chọn</h3>
                <div className="space-y-2 py-2">
                  {orderData.seats.map(seat => (
                    <div key={seat.id} className="flex justify-between">
                      <span>
                        {seat.name} ({seat.type === 'vip' ? 'VIP' : seat.type === 'couple' ? 'Cặp' : 'Thường'})
                        {seat.type === 'couple' && <span className="text-xs ml-1">(2 chỗ)</span>}
                      </span>
                      <span>{seat.price.toLocaleString()}đ</span>
                    </div>
                  ))}
                  <div className="font-medium pt-2 border-t border-gray-600">
                    Tổng ghế: {orderData.totalSeatPrice.toLocaleString()}đ
                  </div>
                </div>
              </div>

              {orderData.services.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4" style={{ fontSize: '20px' }}>Dịch vụ</h3>
                  <div className="space-y-2 py-2">
                    {orderData.services.map(service => (
                      <div key={service.id} className="flex justify-between">
                        <span>{service.name} x {service.quantity}</span>
                        <span>{(service.price * service.quantity).toLocaleString()}đ</span>
                      </div>
                    ))}
                    <div className="font-medium pt-2 border-t border-gray-600">
                      Tổng dịch vụ: {orderData.totalServicePrice.toLocaleString()}đ
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span>{orderData.totalPrice.toLocaleString()}đ</span>
                </div>
              </div>
            </div>

            {/* Cột phải - Phương thức thanh toán */}
            <div>
              <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4" style={{ marginBottom: '12px', fontSize: '24px' }}>Phương thức thanh toán</h3>
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div 
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPayment === method.id 
                        ? 'border-green-500 bg-gray-700' 
                        : 'border-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img src={method.icon} alt={method.name} className="w-10 h-10 object-contain" />
                      <span className="font-medium">{method.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={handleConfirmPayment}
                  className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-lg font-bold transition cursor-pointer"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showQRModal && <QRModal />}
    </div>
  );
};

export default CheckoutModal;