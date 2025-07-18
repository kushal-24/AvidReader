import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appWrite/auth.js";
import { login, logout } from "./features/authSlice.js";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import reader from './assets/reader.jpg';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen w-full flex flex-col bg-bodyBlue text-black">
      <div className="w-full block">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
