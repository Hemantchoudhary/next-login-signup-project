"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import "react-hot-toast/dist/index.css";


export default function LoginPage() {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",

    })
    // const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error);
            toast.error(error.response.data.error);
            setLoading(false);
        }
    }


    return (
        <div style={{ background: 'grey' }} className="flex flex-col items-center justify-center min-h-screen py-2">
            <ToastContainer />
            <h1 style={{ fontWeight: 'bold' }}>{loading ? "Processing" : "Login Form"}</h1>
            <hr />
            <div className="border border-black rounded-lg p-4 mb-4 text-center">
                <div className="mb-4 flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus-border-gray-600 text-black"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                </div>
                <div className="mb-4 flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus-border-gray-600 text-black"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                </div>
                <div className="mb-4">
                    <button
                        style={{ background: 'green' }}
                        onClick={onLogin}
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus-border-gray-600">Login here</button>
                </div>
                <div className="mb-4">
                    <Link href="/signup">Not Yet Register Sign Up Here !</Link>
                </div>
            </div>
        </div>
    )
}