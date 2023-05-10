import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SignIn = () => {
  const [token, setToken] = useState(
    (typeof window !== "undefined" && localStorage.getItem("token")) || []
  );
  const router = useRouter();

  useEffect(() => {
    if (token?.length > 0) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <div className="login-container">
      <div className="center">
        <h1>Login</h1>
        <form method="post">
          <div className="txt_field">
            <input type="text" required />
            <span></span>
            <label>Username</label>
          </div>

          <div className="txt_field">
            <input type="password" required />
            <span></span>
            <label>Password</label>
          </div>
          <div className="pass">Forgot password?</div>
          <input type="submit" value="Login" />
          <div className="signup_link">
            Not a member ? <a href="#"> Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
