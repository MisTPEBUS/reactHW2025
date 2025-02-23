import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/types/LoginForm";
import { useEffect, useState } from "react";
import { checkUser, signIn } from "@/api/service/auth";
import { ApiError, SignInRequest } from "@/api/service/auth/type";

const LoginComponent = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  useEffect(() => {
    const verifySignIn = async () => {
      const isLogin = await checkUser();

      if (isLogin.success) {
        navigate("/Week2/", { replace: true });
      } else {
        setLoading(false);
      }
    };
    verifySignIn();
  }, [navigate]);

  const onSubmit: SubmitHandler<LoginForm> = async (data: SignInRequest) => {
    try {
      await signIn(data);
      navigate("/Week2/", { replace: true });
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(apiError.message);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>檢查登入中請微笑...</p>
      </div>
    );
  }
  return (
    <div className="borderRadius-md flex items-center justify-center h-full">
      <div className="w-full max-w-md p-8 space-y-6 bg-neutral-200 rounded-xl ">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center text-neutral-bg bg-secondary w-full py-4 rounded-t">
            後台管理系統
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-1 text-sm text-left">
              請輸入帳號
            </label>
            <input
              type="email"
              id="username"
              {...register("username", { required: "使用者名稱為必填" })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="ex: hello@example.com"
            />
            {errorMessage && (
              <div className="text-sm text-red-600">*{errorMessage}*</div>
            )}
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                *{errors.username.message}*
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-left">
              請輸入密碼
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "密碼為必填" })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="輸入密碼"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                *{errors.password.message}*
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-primary rounded hover:bg-primary-light hover:bg-opacity-80 focus:outline-none"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
