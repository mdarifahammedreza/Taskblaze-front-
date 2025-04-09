"use client";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle
} from "@tabler/icons-react";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { cn } from "../../../lib/utils";
import {
  signInWithGoogle,
  signUpWithEmail
} from "../../Pages/Private/Auth";
import { UserContext } from "../../Pages/Private/AuthProvider";
import { Input } from "../UI/input";
import { Label } from "../UI/label";
export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { login } = useContext(UserContext);

  const HandleUser = (user) => {
    login(user);

    if (user) {
      toast.success("Successfully signed in!");
      navigate(from, { replace: true });
       // Reset form after successful login
    } else {
      toast.error("Invalid email or password!");
    }
  };
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    reEnterPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'reEnterPassword':
        setReEnterPassword(value);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      reEnterPassword: ''
    };

    if (!firstName) {
      newErrors.firstName = "First name is required.";
      formIsValid = false;
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required.";
      formIsValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email.";
      formIsValid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      formIsValid = false;
    }

    if (reEnterPassword !== password) {
      newErrors.reEnterPassword = "Passwords do not match.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {
     const User= await signUpWithEmail(email, password);
      toast.success("Successfully signed up!");
      HandleUser(User)
    } else {
      toast.error("Please fill in all the fields correctly.");
    }
  };
 
  const GoogleSignin = async()=>{
    const status =await signInWithGoogle();
    // Implement Google login logic here
    HandleUser(status);
  }
  const FacebookSignin = ()=>{
    toast.info("Facebook login is Pending for Meta permission.");
  }
  const GithubSignin = ()=>{
    toast.info("GitHub login is Under maintenance .");
  }
   return (
    <div className="shadow-input mx-auto w-full rounded-none p-4 md:rounded-2xl md:p-8 bg-gray-900 text-neutral-200">
      <h2 className="text-xl font-bold text-neutral-200">
        Welcome to TaskBlaze
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-300">
        Logged in? Welcome to Taskblaze — where your tasks don’t just sit, they ignite. Let’s organize, prioritize, and absolutely obliterate that to-do list.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label className="text-white" htmlFor="firstname">First name</Label>
            <Input 
              id="firstname" 
              placeholder="Tyler" 
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label className="text-white" htmlFor="lastname">Last name</Label>
            <Input 
              id="lastname" 
              placeholder="Durden" 
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label className="text-white" htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            placeholder="projectmayhem@fc.com" 
            type="email" 
            name="email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label className="text-white" htmlFor="password">Password</Label>
          <Input 
            id="password" 
            placeholder="••••••••" 
            type="password" 
            name="password"
            value={password}
            onChange={handleChange}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label className="text-white" htmlFor="reEnterPassword">Re-enter Password</Label>
          <Input 
            id="reEnterPassword" 
            placeholder="••••••••" 
            type="password" 
            name="reEnterPassword"
            value={reEnterPassword}
            onChange={handleChange}
          />
          {errors.reEnterPassword && <span className="text-red-500 text-sm">{errors.reEnterPassword}</span>}
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-sky-400 from-sky-500 to-sky-600 shadow-[0px_1px_0px_0px_#1a202c_inset,0px_-1px_0px_0px_#1a202c_inset] font-semibold"
          type="submit">
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md px-4 font-medium text-white bg-zinc-900 shadow-[0px_0px_1px_1px_#262626]"
            type="button" onClick={() => FacebookSignin()}>
            <IconBrandFacebook className="h-4 w-4 text-neutral-300" />
            <span className="text-sm text-neutral-300">Facebook</span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md px-4 font-medium text-white bg-zinc-900 shadow-[0px_0px_1px_1px_#262626]"
            type="button" onClick={() => GoogleSignin()}>
            <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
            <span className="text-sm text-neutral-300">Google</span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md px-4 font-medium text-white bg-zinc-900 shadow-[0px_0px_1px_1px_#262626]"
            type="button" onClick={() => GithubSignin()}>
            <IconBrandGithub className="h-4 w-4 text-neutral-300" />
            <span className="text-sm text-neutral-300">Github</span>
            <BottomGradient />
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
