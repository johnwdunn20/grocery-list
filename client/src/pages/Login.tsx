import React from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [incorrectLoginInfo, setIncorrectLoginInfo] =
    React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log(data)
    const response = await fetch(`${apiURL}/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: 'include'
    });
    if (response.ok) {
      navigate("/");
    } else {
      // show user that login failed
      setIncorrectLoginInfo(true);
      console.log("Login failed");
    }
  };

  // console.log('Errors: ', errors);
  // console.log(watch("email"));
  // console.log(watch("password"));

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-primaryBlue">
      <div className="mb-10">
        <h1 className="text-white text-5xl font-bold">Shopping List</h1>
        <h3 className="text-white text-lg">Sorts your groceries by aisle</h3>
      </div>
      <section className="flex flex-col justify-center items-center w-full md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 max-w-screen-sm mx-auto border-1 border-slate-400 rounded-xl bg-background shadow-xl p-5">
        <h1 className="text-2xl font-semibold mb-5 text-slate-700">Sign In</h1>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col border-2 m-2 p-2">
            <input
              className="h-8 w-full"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email must be valid",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col border-2 m-2 p-2">
            <input
              className="h-8 w-full"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Value is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="self-start m-2">
            {incorrectLoginInfo && (
              <div className="text-red-500">Incorrect email or password</div>
            )}
            <Link
              to="/resetpassword"
              className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 w-3/4 h-12 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </button>
          </div>
          {/* <div className='flex justify-center mt-5'>
            <button type="button" className='bg-blue-300 hover:bg-blue-500 w-3/4 h-12 text-white font-bold py-2 px-4 rounded'>
              Sign In With Google
            </button>
          </div> */}
          <div className="flex justify-center m-4">
            <p className="text-slate-500">
              Need an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
              >
                Join Now
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
