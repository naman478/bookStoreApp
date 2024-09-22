import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Gift from "./components/Gifts";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import BookDetails from "./components/BookDetails";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import RateBook from "./components/RateBook";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={<Courses />}
          />
          <Route path="/book/:id" exact element={<BookDetails />} />
          <Route path="/rate-book/:id/" element={<RateBook/>} />
          <Route path="/gifts" element={<Gift />} />
          <Route path="/explore-gifts" element={<Gift />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
