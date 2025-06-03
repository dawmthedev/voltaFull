import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store";
import { login } from "../store/authSlice";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, status } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (token) navigate("/dashboard/projects", { replace: true });
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Removed color mode values in favor of Tailwind dark mode
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-teal-500 to-cyan-600">
      {/* Simplified wave background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-500/30 to-cyan-600/30 backdrop-blur-xl">
        <div className="absolute inset-0 opacity-20">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className={`absolute bottom-0 left-0 right-0 h-[50vh] bg-white/10
                animate-wave-${i + 1} transform-gpu`}
              style={{
                animationDelay: `${i * 0.5}s`,
                bottom: `${i * -15}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className={`transform transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <div className="w-full max-w-md p-8 rounded-xl shadow-2xl backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 
          border border-white/20 transform transition-all duration-300">
          <div className="mb-8 text-center">
            <div className="inline-block p-4 mb-4">
              {/* Simple, professional logo placeholder */}
              <div
                className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg 
                flex items-center justify-center text-2xl font-bold text-white"
              >
                V
              </div>
            </div>
            <h1 className="text-2xl mb-2 text-gray-900 dark:text-white font-medium">
              Welcome to Volta
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-md shadow-sm"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-1 animate-shake">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg
                transition-all duration-200 font-medium flex items-center justify-center"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 
              dark:hover:text-teal-300 font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
