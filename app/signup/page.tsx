"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignupPage(){
    const router = useRouter();
    const [user,setUser] =React.useState({
        email:"",
        password:"",
        username:"",
    });
    const [loading, setLoading] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignup = async () => {
        try {
      
          if (!user.username || !user.email || !user.password) {
            toast.error('All fields are required.');
            return;
          }
      
          if (!(user.email.includes('@') && user.email.includes('.com')))  {
            toast.error('Email Field must be of the type of email');
            return;
          }
          setLoading(true);
      
          const response = await axios.post("/api/users/signup", user);
          console.log("Signup success", response.data);
          toast.success(response.data.message);
          router.push("/login");
        } catch (error:any) {
          console.log("Signup failed", error.message);
          toast.error(error.response.data.error);
        } finally {
          setLoading(false);
        }
      };

      return (
        <div style={{ background: 'grey' }} className="flex flex-col items-center justify-center min-h-screen py-2">
        <ToastContainer />
        <h1 style={{ fontWeight: 'bold' }}>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <div className="border border-black rounded-lg p-4 mb-4 text-center">
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              className="p-2 border-b border-gray-300 w-full focus:outline-none focus-border-gray-600 text-black"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              className="p-2 border-b border-gray-300 w-full focus:outline-none focus-border-gray-600 text-black"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              className="p-2 w-full focus:outline-none focus-border-gray-600 text-black"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
            />
          </div>
          <div className="mb-3">
            <button
              style={{ background: 'green' }}
              onClick={onSignup}
              className="p-2 border border-black rounded-lg mb-4 focus:outline-none focus-border-gray-600">
              {buttonDisabled ? "No signup" : "Signup"}
            </button>
          </div>
          <div className="mb-3">
          <Link href="/login">Go To Login Page !!</Link>
          </div>
        </div>
        
      </div>
      );
}    