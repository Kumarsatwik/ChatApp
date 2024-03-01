import { LuEye, LuEyeOff } from "react-icons/lu";

import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(userName, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
        <h1 className="text-3xl text-center font-bold mb-4">
          Login <span className="text-gray-500">Chatapp</span>
        </h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full max-w-xs font-semibold"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <span className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs font-semibold"
                onChange={(e) => setPassword(e.target.value)}
              />
              {!showPassword ? (
                <LuEye
                  className="absolute right-5 bottom-0 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <LuEyeOff
                  className="absolute right-5 bottom-0 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword(false)}
                />
              )}
            </span>
          </div>
          <div>
            <button
              className="btn btn-block btn-sm my-2 font-semibold"
              disabled={loading}
            >
              {loading ? "Loading ..." : "Login"}
            </button>
          </div>
          <Link to="/signup" className="italic text-sm hover:underline">
            Do not have account ?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
