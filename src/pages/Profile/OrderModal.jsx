const OrderModal = ({ orders, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Tất cả đơn hàng</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500">Bạn chưa có đơn hàng nào</p>
            ) : (
              orders.map(order => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-black" style={{ fontSize: '22px' }}>{order.title}</h3>
                      <p className="text-gray-600">{order.cinema}</p>
                      <p className="text-gray-600" style={{ margin: 0 }}>{order.date} ~ {order.showtime}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {order.paymentId}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-black">Ghế đã đặt:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {order.seats.map(seat => (
                        <span key={seat.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-500">
                          {seat.name} ({seat.type}) - ({seat.price.toLocaleString('vi-VN')}VNĐ)
                        </span>
                      ))}
                    </div>
                  </div>


                  <div className="mt-4">
                    <h4 className="font-medium text-black">Dịch vụ:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {order.services.map(service => (
                        <span key={service.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-500">
                          {service.name} - x{service.quantity} - ({service.price.toLocaleString('vi-VN')}VNĐ)
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-gray-600" style={{ margin: 0 }}>Tổng cộng:
                        <span className="ml-5 text-[20px] text-black">{order.totalPrice.toLocaleString('vi-VN')} VNĐ</span>
                      </p>
                    </div>
                    {/* <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      Xem chi tiết
                    </button> */}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;