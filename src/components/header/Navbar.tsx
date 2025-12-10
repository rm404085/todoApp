import { Link, useNavigate } from "react-router-dom";
import { UseAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/features/auth/authSlice";
import UserPreferences from "@/page/userPreferences/UserPreferences";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const dispatch = UseAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <a className="block text-teal-600 dark:text-teal-400" href="#">
              <svg className="h-8 w-8" viewBox="0 0 28 24">
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 ..."
                  fill="currentColor"
                ></path>
              </svg>
            </a>
            <span className="font-bold text-lg text-gray-800 dark:text-white">
              MyApp
            </span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {["/tasks", "/counter", "/products", "/wishlist"].map((path, i) => {
              const label =
                path.replace("/", "").charAt(0).toUpperCase() + path.slice(2);

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    to={path}
                    className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Preferences Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setOpen(!open)}
              className="rounded-md bg-teal-600 px-4 py-2 text-white font-medium hover:bg-teal-500 transition-colors"
            >
              Preferences
            </motion.button>

            {/* Animated Dropdown */}
            
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4"
                >
                  <UserPreferences />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {token ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-red-500 transition-colors"
              >
                Logout
              </motion.button>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/login"
                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-teal-500 transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/register"
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:bg-gray-200 transition-colors"
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
