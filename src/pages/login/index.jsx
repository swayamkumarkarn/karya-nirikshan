import React from "react";
import CustomButton from "../../components/Common/CustomButton";

function FormInput({ label, id, type }) {
  return (
    <div className=" -mt-3 flex flex-col">
      <label
        htmlFor={id}
        className="self-start font-semibold text-neutral-400 text-sm -ml-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="flex shrink-0 self-center  max-w-full rounded-md bg-neutral-200 h-10 w-60 mt-1 mb-6 p-2"
        aria-label={label}
      />
    </div>
  );
}

const LoginPage = () => {
  return (
    <div className="max-h-screen h-screen flex justify-center items-center relative bg-[#F6F6F6]">
      <div className="relative bg-white px-16 py-6  pb-10 rounded-xl flex flex-col items-center w-contain z-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 h-[20%] w-auto">
          <img
            src="/assets/svg/Union.svg"
            alt="Decorative union"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 h-[20%] w-auto">
          <img
            src="/assets/svg/Union.svg"
            alt="Decorative union"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Title */}
        <div className="mb-4">
          <span className=" -ml-32 font-semibold text-neutral-400 text-sm">
            Let&apos;s Start Here
          </span>
        </div>

        {/* Centered GIF */}
        <div className="flex items-center justify-center h-24 w-24 mb-6">
          <img
            src="/assets/gif/login.gif"
            alt="Login GIF"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Inputs */}
        <FormInput label="Username" id="username" type="text" />
        <FormInput label="Password" id="password" type="password" />

        <div className="mt-2 mb-8 min-w-36">

        <CustomButton text="Login" fullWidth sx={{height:"45px",borderRadius:"23px"}} />
        </div>
      </div>

      {/* Background Right Image */}
      <div className="absolute top-0 right-0 h-screen w-auto">
        <img
          src="/assets/images/login-book.jpg"
          alt="Login illustration"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 right-[50%] h-screen w-auto">
          <img
            src="/assets/svg/Line33.svg"
            alt="Decorative line"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Left Decorative Image */}
      <div className="absolute bottom-0 left-0 h-[20%] w-auto">
        <img
          src="/assets/svg/Union.svg"
          alt="Decorative union"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
