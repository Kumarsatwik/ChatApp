import { Link } from "react-router-dom";
import GenderCheckbox from "./genderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform signup logic here
    await signup(formData);
  };

  const handleGenderChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
          <h1 className="text-3xl text-center font-bold mb-4">
            Signup <span className="text-gray-500">Chatapp</span>
          </h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Full Name"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your Full Name"
                className="input input-bordered w-full max-w-xs font-semibold"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
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
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                value={formData.userName}
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
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full max-w-xs font-semibold"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                />
              </span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <span className="relative">
                <input
                  type="password"
                  placeholder="Enter your confirm password"
                  className="input input-bordered w-full max-w-xs font-semibold"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  value={formData.confirmPassword}
                />
              </span>
            </div>
            <GenderCheckbox
              onChange={handleGenderChange}
              selected={formData.gender}
            />
            <div>
              <button
                className="btn btn-block btn-sm my-2 font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Signup"
                )}
              </button>
            </div>
            <Link to="/login" className="italic text-sm hover:underline">
              Already have account ?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
