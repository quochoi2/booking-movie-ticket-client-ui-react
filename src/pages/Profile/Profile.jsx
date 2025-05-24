import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState, useRef } from "react";
import ProfileService from "../../services/profileService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Kiểm tra loại file và kích thước (giữ nguyên)
  
    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('image', file);
  
      // Gọi API upload ảnh
      const response = await ProfileService.updateImage(formData);
      
      // Kiểm tra response và lấy URL ảnh mới
      if (response.data && response.data.data && response.data.data.image) {
        const newImageUrl = response.data.data.image;
        
        // 1. Cập nhật state ngay lập tức để hiển thị ảnh mới
        setUser(prevUser => ({
          ...prevUser,
          image: newImageUrl
        }));
  
        // 2. Cập nhật localStorage
        const updatedUser = {
          ...JSON.parse(localStorage.getItem('user')), 
          image: newImageUrl
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        alert('Cập nhật ảnh đại diện thành công!');
      } else {
        throw new Error('Không nhận được URL ảnh từ server');
      }
    } catch (error) {
      console.error('Lỗi khi upload ảnh:', error);
      alert(error.message || 'Có lỗi xảy ra khi upload ảnh');
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };
  
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mx-5 py-8">
      <div className="w-full max-w-4xl">
        <Breadcrumb items={['Hồ sơ', 'Thông tin cá nhân']} />
        
        <section className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
            {/* Avatar có thể click để upload */}
            <div className="absolute -bottom-16 left-8">
              <div 
                className="relative cursor-pointer"
                onClick={handleImageClick}
              >
                <img 
                  key={user.image} // Thêm dòng này
                  src={user.image}
                  alt={user.fullname}
                  className={`w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg ${isUploading ? 'opacity-70' : ''}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-sm">Đang tải lên...</span>
                  </div>
                )}
              </div>
              {/* Input file ẩn */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          
          {/* Phần còn lại giữ nguyên */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {user.fullname || user.fullName || user.username}
                </h1>
                <p className="text-gray-600 mt-1">@{user.username}</p>
              </div>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
                disabled={isUploading}
              >
                {isUploading ? 'Đang xử lý...' : 'Chỉnh sửa hồ sơ'}
              </button>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thông tin cá nhân */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin cá nhân</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800 font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tên đầy đủ</p>
                    <p className="text-gray-800 font-medium">
                      {user.fullname || user.fullName || "Chưa cập nhật"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Thống kê hoặc thông tin khác */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Hoạt động</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm text-center">
                    <p className="text-gray-500 text-sm">Đơn hàng</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm text-center">
                    <p className="text-gray-500 text-sm">Đánh giá</p>
                    <p className="text-2xl font-bold text-yellow-500">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;