import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import "./styles.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  const signupWithEmail = () => {
    setLoading(true);
    // console.log(name);
    // console.log(email);
    // console.log(password);
    // console.log(confirmPassword);
    // Authenticate the user, or basically create a new account using email and password
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            // Create a doc with user id as the following id
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password don't match!");
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  };

  const loginWithEmail = () => {
    
    console.log(email);
    console.log(password);
  }

  const createDoc = () => {
    //Male sure that the doc with the uid doesn't exist
    //Create a doc
  }
  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Log into <span style={{ color: "var(--theme)" }}>Ledger.</span>
          </h2>
          <form>
          
            <Input
              label={"Email"}
              type="email"
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              label={"Password"}
              type="password"
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            
            <Button
              diasbled={loading}
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginWithEmail}
            />
            <p className='p-login'>or</p>
            <Button
              text={loading ? "Loading..." : "Login using Google"}
              blue={true}
            /> <p className='p-login' style={{cursor:'pointer'}} onClick={()=>setLoginForm(!loginForm)}>Or Don't Have An Account? Click Here</p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Ledger.</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              type="text"
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              label={"Email"}
              type="email"
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              label={"Password"}
              type="password"
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              label={"Confirm Password"}
              type="password"
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              diasbled={loading}
              text={loading ? "Loading..." : "Signup using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className='p-login'>or</p>
            <Button
              text={loading ? "Loading..." : "Signup using Google"}
              blue={true}
            /><p className='p-login' style={{cursor:'pointer'}} onClick={()=>setLoginForm(!loginForm)}>Or Have An Account Already? Click Here</p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpSignIn;
