import CartDrawer from "@/components/CartDrawer";
import { LogoutUser } from "@/store/auth/authSlice";
import { fetchCart } from "@/store/cart/cartSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  PlusSquare,
  UtensilsCrossed,
  Home,
  BookOpen,
  ClipboardList,
} from "lucide-react";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-sm font-semibold transition-colors duration-150 ${
        isActive ? "text-amber-500" : "text-gray-600 hover:text-amber-500"
      }`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (location.state?.showCart) {
      setCartDrawerOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (user) dispatch(fetchCart());
  }, [dispatch, user]);

  // close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleOnLogout = () => {
    dispatch(LogoutUser())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully.");
        navigate("/");
      })
      .catch(() => toast.error("Logout failed. Please try later."));
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to={user?.role === "admin" ? "/dashboard" : "/"}
              className="flex items-center gap-2 shrink-0"
            >
              <span className="text-2xl">🐟</span>
              <div className="leading-tight">
                <p className="text-base font-black text-amber-600 tracking-tight leading-none">
                  Freshly
                </p>
                <p className="text-[9px] font-semibold text-blue-800 uppercase tracking-widest leading-none">
                  Fish &amp; Chips
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-7">
              <NavItem to="/">
                <span className="flex items-center gap-1">
                  <Home size={13} /> Home
                </span>
              </NavItem>
              <NavItem to="/menu">
                <span className="flex items-center gap-1">
                  <UtensilsCrossed size={13} /> Menu
                </span>
              </NavItem>

              {user?.role === "user" && (
                <NavItem to="/orders">
                  <span className="flex items-center gap-1">
                    <ClipboardList size={13} /> Orders
                  </span>
                </NavItem>
              )}
              {user?.role === "admin" && (
                <>
                  <NavItem to="/admin-order">
                    <span className="flex items-center gap-1">
                      <ClipboardList size={13} /> Orders
                    </span>
                  </NavItem>
                  <NavItem to="/addfood">
                    <span className="flex items-center gap-1">
                      <PlusSquare size={13} /> Add Item
                    </span>
                  </NavItem>
                  <NavItem to="/dashboard">
                    <span className="flex items-center gap-1">
                      <LayoutDashboard size={13} /> Dashboard
                    </span>
                  </NavItem>
                </>
              )}
              {!user && (
                <NavItem to="/aboutus">
                  <span className="flex items-center gap-1">
                    <BookOpen size={13} /> About
                  </span>
                </NavItem>
              )}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Cart button */}
              {user?.role !== "admin" && (
                <button
                  onClick={() => setCartDrawerOpen(true)}
                  className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-amber-200 hover:bg-amber-50 text-gray-600 hover:text-amber-600 transition"
                >
                  <ShoppingCart size={17} />
                  <span className="text-xs font-semibold hidden sm:block">
                    Cart
                  </span>
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow">
                      {totalQuantity}
                    </span>
                  )}
                </button>
              )}

              {/* User avatar / login */}
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-amber-200 hover:bg-amber-50 transition"
                  >
                    <img
                      src={user.profileImage || "pp.png"}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-amber-200"
                    />
                    <span className="text-xs font-semibold text-gray-700 max-w-[80px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown
                      size={13}
                      className={`text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden py-1 z-50">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
                      >
                        <User size={14} /> Profile
                      </Link>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          handleOnLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-500 active:scale-95 text-white text-sm font-bold rounded-full shadow-md transition"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile: cart + hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              {user?.role !== "admin" && (
                <button
                  onClick={() => setCartDrawerOpen(true)}
                  className="relative p-2 rounded-full border border-amber-200 text-gray-600 hover:bg-amber-50 transition"
                >
                  <ShoppingCart size={18} />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </button>
              )}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="p-2 rounded-full border border-amber-200 text-gray-600 hover:bg-amber-50 transition"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-amber-100 bg-white/98 backdrop-blur-md px-4 py-4 space-y-1">
            {[
              { to: "/", label: "Home", icon: Home, show: true },
              { to: "/menu", label: "Menu", icon: UtensilsCrossed, show: true },
              {
                to: "/orders",
                label: "My Orders",
                icon: ClipboardList,
                show: user?.role === "user",
              },
              {
                to: "/aboutus",
                label: "About Us",
                icon: BookOpen,
                show: !user,
              },
              {
                to: "/admin-order",
                label: "Orders",
                icon: ClipboardList,
                show: user?.role === "admin",
              },
              {
                to: "/addfood",
                label: "Add Item",
                icon: PlusSquare,
                show: user?.role === "admin",
              },
              {
                to: "/dashboard",
                label: "Dashboard",
                icon: LayoutDashboard,
                show: user?.role === "admin",
              },
            ]
              .filter((l) => l.show)
              .map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                      isActive
                        ? "bg-amber-50 text-amber-600"
                        : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"
                    }`
                  }
                >
                  <l.icon size={16} /> {l.label}
                </NavLink>
              ))}

            <div className="pt-2 border-t border-amber-100 mt-2">
              {user ? (
                <div className="space-y-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-amber-50 hover:text-amber-600 transition"
                  >
                    <img
                      src={user.profileImage || "pp.png"}
                      alt=""
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    {user.name}
                  </Link>
                  <button
                    onClick={handleOnLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-amber-400 hover:bg-amber-500 text-white text-sm font-bold rounded-full shadow transition"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </>
  );
};

export default Navbar;
