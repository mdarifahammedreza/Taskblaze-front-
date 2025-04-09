"use client";
import {
    IconBrandFacebook,
    IconBrandGithub,
    IconBrandGoogle
} from "@tabler/icons-react";
import React from "react";
import { cn } from '../../../lib/utils';
import { Input } from "../UI/input";
import { Label } from "../UI/label";

export default function Signin() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <div className="shadow-input mx-auto w-full rounded-none p-4 md:rounded-2xl md:p-8 bg-gray-900 text-neutral-200">
      <h2 className="text-xl font-bold text-neutral-200">
        Welcome back to TaskBlaze
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-300">
        Sign in to blaze through your tasks with speed and style. 🚀🔥
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label className="text-white" htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="you@example.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label className="text-white" htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-sky-400 from-sky-500 to-sky-600 shadow-[0px_1px_0px_0px_#1a202c_inset,0px_-1px_0px_0px_#1a202c_inset] font-semibold"
          type="submit">
          Log in &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <OAuthButton icon={IconBrandFacebook} text="Facebook" />
          <OAuthButton icon={IconBrandGoogle} text="Google" />
          <OAuthButton icon={IconBrandGithub} text="Github" />
        </div>
      </form>
    </div>
  );
}

const OAuthButton = ({ icon: Icon, text }) => (
  <button
    className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md px-4 font-medium text-white bg-zinc-900 shadow-[0px_0px_1px_1px_#262626]"
    type="submit"
  >
    <Icon className="h-4 w-4 text-neutral-300" />
    <span className="text-sm text-neutral-300">{text}</span>
    <BottomGradient />
  </button>
);

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
