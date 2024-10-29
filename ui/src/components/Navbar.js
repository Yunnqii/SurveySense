import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600 tracking-wide hover:text-indigo-700 transition-colors duration-200">
              Survey<span className="text-indigo-800">Sense</span>
            </span>
          </div>
          <div className="flex items-center">
            {!user || user.isAnonymous ? <SignInButton /> : <UserMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
}

function SignInButton() {
  return (
    <button
      onClick={() => document.getElementById("signin-modal").showModal()}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
    >
      Sign In
    </button>
  );
}

function UserMenu() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-600">{user?.email || "User"}</span>
      <button
        onClick={signOut}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}

export default Navbar;
