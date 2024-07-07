import { LoginForm } from "@/components/forms/login-form";
import PublicLayout from "@/components/layout/public-layout";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <PublicLayout>
      <div className="justify-center hidden md:flex">
        <Image
          src={"/save-planet.jpg"}
          width={650}
          height={800}
          alt="Save Planet image"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-primary">Come Join Us</h1>
        <h2 className="font-light">
          Your contribution matters for future generation
        </h2>
        <div className="bg-slate-50 p-5 my-4 rounded-lg shadow-sm">
          <LoginForm />
        </div>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
