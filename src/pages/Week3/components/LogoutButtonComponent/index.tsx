import { useNavigate } from "react-router-dom";
import { logout } from "@/api/service/auth";
import { removeAuthToken } from "@/utlis/cookie";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("登出失敗", error);
    } finally {
      removeAuthToken(); // 清除 Token
      navigate("/week2/login", { replace: true });
    }
  };

  return (
    <div className=" justify-end">
      <button onClick={handleLogout}>登 出</button>
    </div>
  );
};

export default LogoutButton;
