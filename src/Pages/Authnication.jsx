import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import welcomeImg from "../assets/Welcome.png"; // adjust path
import Signin from "../components/Credential/Signin";
import SignUp from "../components/Credential/SignUp";

const Authnication = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Animation variants
  const variants = {
    initial: (direction) => ({
      x: direction === `${isLogin ? "right " : "left"}` ? -1000 : 1000,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction === `${isLogin ? "right " : "left"}`  ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };

  // Welcome message
  const WelcomeSection = () => (
    <motion.div
      className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8 text-center"
      key="welcome"
      custom={isLogin ? "right " : "left"}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      <img src={welcomeImg} alt="Welcome" className="w-64 h-64 mb-6" />
      <h1 className="text-4xl font-bold mb-2">Welcome to TaskBlaze</h1>
      <p className="text-gray-300 max-w-md text-sm md:text-base">
        TaskBlaze is your ultimate productivity partner. Whether you're a student, a professional, or just someone looking to stay organized — we've got the tools to help you succeed. Track your goals, collaborate with your team, and boost your performance effortlessly.
      </p>
    </motion.div>
  );

  // Form side
  const FormSection = () => (
    <motion.div
      className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center items-center bg-gray-900"
      key="form"
      custom={isLogin ? "left" : "right"}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {/* Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            isLogin ? "bg-sky-500 text-white" : "bg-gray-800 text-gray-300"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            !isLogin ? "bg-sky-500 text-white" : "bg-gray-800 text-gray-300"
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="w-full max-w-md">
        {isLogin ? <Signin /> : <SignUp />}
      </div>

      <p className="mt-6 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} TaskBlaze — All rights reserved.
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-950 text-white overflow-hidden">
      <AnimatePresence mode="wait" custom={isLogin ? "left" : "right"}>
        {isLogin ? (
          <>
            <FormSection key="login-form" />
            <WelcomeSection key="welcome-login" />
          </>
        ) : (
          <>
            <FormSection key="signup-form" />
            <WelcomeSection key="welcome-signup" />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Authnication;
