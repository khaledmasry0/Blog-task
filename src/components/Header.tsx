import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slices/authSlice";
import { RootState } from "../redux/store";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(user);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <Link to="/" className="mr-4 hover:underline">
          Home
        </Link>
        {user && (
          <Link to="/create" className="mr-4 hover:underline">
            Create Post
          </Link>
        )}
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">
              Hello, {user.username} {user.role == "admin" && "(Admin)"}
            </span>
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 px-2 py-1 rounded hover:bg-blue-600"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
