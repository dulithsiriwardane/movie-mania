import {useState} from "react";
import Slideshow from "./Slideshow";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  }

  async function registerUser() {
    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      email: formData.email,
    };

    const response = await axios.post(
      `${process.env.API_URL}/api/auth/signup`,
      newUser,
    );

    console.log(response);
  }

  function handleSubmit(e) {
    e.preventDefault();
    registerUser();
  }

  return (
    <div className="relative flex min-h-screen bg-gray-950 justify-center items-center p-4 antialiased font-inter overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Slideshow backgroundOnly />
      </div>
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 w-full max-w-[1080px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-full">
        <div className="w-full md:w-1/2 bg-gray-500 text-white flex flex-col justify-between relative overflow-hidden">
          <Slideshow />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-gray-900">
          <div className="my-auto max-w-sm mx-auto w-full py-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-1">
                Sign Up For an Account
              </h1>
              <p className="text-xs text-gray-400">
                Join the Community of Film Buffs
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1 block text-[11px] font-medium text-gray-300"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="autofill:shadow-[0_0_0_1000px_#1e293b_inset] autofill:[-webkit-text-fill-color:white] w-full px-3.5 py-2.5 text-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 placeholder-gray-500 bg-gray-800 text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1 block text-[11px] font-medium text-gray-300"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="autofill:shadow-[0_0_0_1000px_#1e293b_inset] autofill:[-webkit-text-fill-color:white] w-full px-3.5 py-2.5 text-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 placeholder-gray-500 bg-gray-800 text-gray-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-[11px] font-medium text-gray-300"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="autofill:shadow-[0_0_0_1000px_#1e293b_inset] autofill:[-webkit-text-fill-color:white] w-full px-3.5 py-2.5 text-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-gray-500 bg-gray-800 text-gray-100"
                  required
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="mb-1 block text-[11px] font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="autofill:shadow-[0_0_0_1000px_#1e293b_inset] autofill:[-webkit-text-fill-color:white] w-full px-3.5 py-2.5 text-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 placeholder-gray-500 bg-gray-800 relative text-gray-100"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      {showPassword ? (
                        <>
                          <path
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                          <path
                            d="M3 3l18 18"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                          <path
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                          <path
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-gray-500 leading-relaxed font-normal">
                By creating an account, you agreeing to our{" "}
                <a
                  href="#privacy"
                  className="text-gray-400 font-semibold hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition duration-150 shadow-sm"
              >
                Sign Up
              </button>
            </form>

            <div className="text-center mt-5">
              <p className="text-xs text-gray-400">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="text-gray-200 font-semibold hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
