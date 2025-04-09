"use client";
import React from "react";
import { cn } from '../../../lib/utils';
import {
    IconBrandFacebook,
    IconBrandGithub,
    IconBrandGoogle
} from "../../../node_modules/@tabler/icons-react";
import { Input } from "../UI/input";
import { Label } from "../UI/label";

export default function SignUp() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div
      className="shadow-input mx-auto w-full rounded-none  p-4 md:rounded-2xl md:p-8 bg-gray-900 text-neutral-200">
      <h2 className="text-xl font-bold text-neutral-200 ">
        Welcome to TaskBlaze
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-300">
    Logged in? Welcome to Taskblaze — where your tasks don’t just sit, they ignite.
      Let’s organize, prioritize, and absolutely obliterate that to-do list.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label className="text-white" htmlFor="firstname" >First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label className="text-white" htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label className="text-white" htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label className="text-white" htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label  className="text-white" htmlFor="twitterpassword">Your twitter password</Label>
          <Input id="twitterpassword" placeholder="••••••••" type="twitterpassword" />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-sky-400 from-sky-500 to-sky-600 shadow-[0px_1px_0px_0px_#1a202c_inset,0px_-1px_0px_0px_#1a202c_inset] font-semibold"
          type="submit">
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div
          className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn  relative flex h-10 w-full items-center justify-start space-x-2 rounded-md px-4 font-medium text-white bg-zinc-900 shadow-[0px_0px_1px_1px_#262626]"
            type="submit">
            <IconBrandFacebook className="h-4 w-4 text-neutral-300" />
            <span className="text-sm text-neutral-300">
              Facebook
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md  px-4 font-medium text-white bg-zinc-900 shadow-[0px_0px_1px_1px_#262626]"
            type="submit">
            <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
            <span className="text-sm text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn  relative flex h-10 w-full items-center justify-start space-x-2 rounded-md px-4 font-medium text-white bg-zinc-900 shadow-[0px_0px_1px_1px_#262626]"
            type="submit">
            <IconBrandGithub className="h-4 w-4 text-neutral-300" />
            <span className="text-sm text-neutral-300">
              Github
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
