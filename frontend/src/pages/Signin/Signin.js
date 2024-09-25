import React, { useState } from "react";
import styles from "./Signin.module.css";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

const validateSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be a minimum of 6 characters")
    .required("Password is required"),
});

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const {
    loginContainer,
    leftContainer,
    leftContainerImg,
    leftContainerContent,
    rightContainer,
    rightContainerContent,
    loginCard,
    signupLink,
    forgotPasswordLink,
    button,
    inputContainer,
    label,
    input,
    loginOptions,
  } = styles;

  const [loading, setLoading] = useState(false);

  const getRoleNameFromId = (roleId) => {
    const roleMappings = {
      "65147cfea8299f9299022a1c": "Learner",
      "66f43f14b005b0ad8639262e": "Creator",
    };

    return roleMappings[roleId] || "unknown";
  };

  const RoleFunction = async (roleId) => {
    try {
      const roleName = getRoleNameFromId(roleId);
      return roleName;
    } catch (error) {
      console.log("error :>> ", error);
      throw error;
    }
  };

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        data
      );
      console.log(res?.data)
      const token = res?.data?.token;
      Cookies.set("token", token);
      const id = res?.data.user?._id;
      Cookies.set("userId", id);
      const roleId = res?.data?.user?.role;
      console.log(roleId)
      Cookies.set("roleId", roleId);
      const roleName = await RoleFunction(roleId);
      setLoading(false);
      Cookies.set("roleName", roleName);
      const userName = res?.data?.user?.name;
      Cookies.set("userName", userName);

      toast.success(res?.data?.message);
      if (roleName === "Learner") {
        navigate("/learner-dashboard");
      } else if (roleName === "Creator") {
        navigate("/creator-dashboard");
      }
      //window.location.reload()
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("An error occured!");
      }
    }
  };

  return (
    <div>
      <div className={loginContainer}>
        <div className={leftContainer}>
          <div className={leftContainerImg}>
            <img
              src="https://img.freepik.com/premium-vector/student-character-together-obtain-online-knowledge-people-tiny-classmate-work-with-laptop-flat-vecto_109722-3416.jpg?w=996"
              width="600"
            />
          </div>
          <div className={leftContainerContent}>
            <h2>
              Unlocking Knowledge, Empowering Minds: Your Path to Success Starts
              Here!
            </h2>
          </div>
        </div>
        <div className={rightContainer}>
          <div className={rightContainerContent}>
            <h2>Hello ! Welcome back.</h2>
            <p>
              Log in with your data that you entered during Your registration.
            </p>
          </div>
          <div className={loginCard}>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className={inputContainer}>
                <label className={label} htmlFor="email">
                  E-mail
                </label>
                <input
                  className={input}
                  type="text"
                  id="email"
                  name="email"
                  {...register("email")}
                />
                {errors && errors?.email && (
                  <p className={styles.errorMessage}>
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div className={inputContainer}>
                <label className={label} htmlFor="password">
                  Password
                </label>
                <input
                  className={input}
                  type="password"
                  id="password"
                  name="password"
                  {...register("password")}
                />
                {errors && errors?.password && (
                  <p className={styles.errorMessage}>
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              <button
                className={button}
                type="submit"
                style={{ backgroundColor: "#3484B4" }}
              >
                Login
                {loading && <div className="loader"></div>}
              </button>
            </form>
            <div className={loginOptions} style={{ color: "#000000" }}>
              <p>
                <span>
                  <Link
                    className={signupLink}
                    onClick={() => navigate("/login")}
                  >
                    Back to Login
                  </Link>
                  <br />
                  <br />
                </span>

                <Link to="/register" className={signupLink}>
                  Sign up
                </Link>
              </p>
              <p>
                <span
                  className={forgotPasswordLink}
                  onClick={() => navigate("/forget-password")}
                >
                  Forgot Password
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
