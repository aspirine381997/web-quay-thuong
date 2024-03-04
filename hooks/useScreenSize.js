import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Kiểm tra xem có tồn tại window không trước khi thực hiện đăng ký sự kiện
    if (typeof window !== "undefined") {
      // Gọi hàm handleResize ngay khi component được mount
      handleResize();

      // Đăng ký sự kiện resize để cập nhật chiều rộng màn hình khi cửa sổ thay đổi
      window.addEventListener("resize", handleResize);

      // Hủy đăng ký sự kiện khi component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // useEffect chỉ chạy một lần khi component được mount

  return screenWidth;
};

export default useScreenSize;
