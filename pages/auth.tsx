import Input from "@/components/Input";
import Image from "next/image";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "signup" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", { email, password, username });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, username, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={200}
            height={50}
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full h-[560px]">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Create an account"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "signup" && (
                <Input
                  id="username"
                  type="text"
                  value={username}
                  label="Username"
                  onChange={(ev: any) => {
                    setUsername(ev.target.value);
                  }}
                />
              )}

              <Input
                id="email"
                type="email"
                value={email}
                label="Email"
                onChange={(ev: any) => {
                  setEmail(ev.target.value);
                }}
              />
              <Input
                id="password"
                type="password"
                value={password}
                label="Password"
                onChange={(ev: any) => {
                  setPassword(ev.target.value);
                }}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="
                  bg-red-600 py-3 text-white rounded-md w-full  mt-12
                  hover:bg-red-700 transition-all duration-300
                  ">
              {variant === "login" ? "Login" : "Register"}
            </button>
            <div className="flex flex-row items-center gap-4 justify-center mt-8">
              <div
                className="w-10 h-10 bg-white rounded-full flex items-center
               justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>{" "}
              <div
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white rounded-full flex items-center
               justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12 text-right self-end">
              {variant === "login" ? "Do not have an account? " : "Already have an account? "}
              <span
                onClick={toggleVariant}
                className="text-red-600 hover:text-red-700 cursor-pointer ">
                {variant === "login" ? " Sign Up" : " Sign In"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
