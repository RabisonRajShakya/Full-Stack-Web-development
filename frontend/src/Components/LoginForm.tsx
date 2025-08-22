import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext, type IAuthContext } from "../App";

function LoginForm() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { isAuth, setAuthState } = useContext<IAuthContext>(AuthContext);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finalData = {
            email,
            password,
        };
        console.log("finalData => ", finalData);
        axios
            .post("http://localhost:3000/users/login", finalData)
            .then((response) => {
                console.log("response => ", response);
                const token = response.data.accessToken;
                localStorage.setItem("accessToken", token);
                setAuthState((prev) => ({
                    ...prev,
                    isAuth: true,
                    role: "guest",
                }));
                window.location.href = "/";
            })
            .catch((error) => {
                console.log("error => ", error);
                const errors = error?.response?.data?.message || "An error occurred";
                alert(errors);
            });
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Background Image Column */}
            <div className="flex-1 min-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://imgs.search.brave.com/LDR5YNpyalayuxR8ZXt4tYHLfjXbHiMi04nmgZuKKPs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzg5LzEx/L2I3Lzg5MTFiNzIw/OTY5NjhkYjNkYzEx/MzUwZTU3NjY1MzYy/LmpwZw')]"></div>
            {/* Form Column */}
            <div className="flex-1 min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold mb-4 text-center my-5 py-5 text-white">
                        Welcome Login Form
                    </h1>
                    <form className="space-y-4 m-5" onSubmit={handleSubmit}>
                        <label
                            htmlFor="email"
                            className="block text-2xl font-medium text-white my-5"
                        >
                            Email:
                        </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                            className="mt-1 block w-full border-none rounded-md shadow-sm py-3 px-4 placeholder-gray-400 text-gray-800 bg-white focus:ring-2 focus:ring-white focus:outline-none"
                        />
                        <label
                            htmlFor="password"
                            className="block text-2xl font-medium text-white"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="mt-1 block w-full border-none rounded-md shadow-sm py-3 px-4 placeholder-gray-400 text-gray-800 bg-white focus:ring-2 focus:ring-white focus:outline-none"
                        />
                        <div className="space-y-4">
                            <button
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-200 shadow-lg transform cursor-pointer text-2xl"
                                type="submit"
                            >
                                Login Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
