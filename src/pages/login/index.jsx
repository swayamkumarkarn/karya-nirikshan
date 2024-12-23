import React, { useState, useEffect } from "react";
import CustomButton from "../../components/Common/CustomButton";
import { login } from "../../services/authService";
import { SAVE_USER_DATA } from "../../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import TypeWriter from "../../components/Common/TypeWriter";
import navigateToPage from "../../lib/functionality/navigation";
import { Snackbar, Alert } from "@mui/material";

function FormInput({ label, id, type, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordField = type === "password";

  return (
    <div className="-mt-3 flex flex-col relative">
      <label
        htmlFor={id}
        className="self-start font-semibold text-neutral-400 text-sm -ml-2"
      >
        {label}
      </label>
      <div className="relative w-60">
        <input
          type={isPasswordField && showPassword ? "text" : type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={true}
          className="flex shrink-0 self-center max-w-full rounded-md bg-neutral-200 h-10 w-full mt-1 mb-6 p-2 pr-10"
          aria-label={label}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 -top-4 right-2 flex items-center text-gray-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

const LoginPage = () => {
  const userData = useSelector((state) => state?.auth?.user);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch(); // Use Redux dispatch

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData); // Call the login service
      console.log("Login successful:", response);

      // Dispatch the user data to the Redux store
      dispatch(SAVE_USER_DATA(response));
      navigateToPage("/");
    } catch (err) {
      console.error("Login failed:", err.message);
      setError( "कोई अनपेक्षित  त्रुटि हुई है।");
      setOpenSnackbar(true); // Open the snackbar on error
    } finally {
      setLoading(false);
      // console.log(err.message);
      
      setError( "कृपया अपना लॉगिन आईडी और पासवर्ड जांचें।");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    console.log("Persisted User Data:", userData); // Log persisted data
  }, [userData]);

  return (
    <div className="h-screen flex justify-center items-center relative bg-[#F6F6F6]">
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
          <span className=" -ml-40 font-semibold text-neutral-400 text-sm">
            <TypeWriter data={["आइए यहां से शुरू करें", "Let's Start Here"]} typingSpeed={150} wordDelay={3000}/>
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
        <FormInput
          label={"उपयोगकर्ता नाम"}
          id="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
        <FormInput
          label="पासवर्ड"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        {error && (
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        )}

        <div className="mt-2 mb-8 min-w-40">
          <CustomButton
            text={loading ? "Logging in..." : "Login"}
            fullWidth
            sx={{ height: "45px", borderRadius: "23px" }}
            onClick={handleLogin}
            disabled={loading}
          />
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

export const meta = {
  title: "लॉगिन पृष्ठ",
  description: "कार्य निरीक्षण एक दस्तावेज़ प्रबंधन प्रणाली",
  author: "BitsCrackers",
  og: {
    title: "लॉगिन पृष्ठ - कार्य निरीक्षण",
    description: "Login Page कार्य निरीक्षण एक दस्तावेज़ प्रबंधन प्रणाली",
    image: "https://karya-nirikshan.vercel.app/logo512.png",
    url: "https://https://karya-nirikshan.vercel.app/login",
  },
  canonical: "https://karya-nirikshan.vercel.app/login",
};
