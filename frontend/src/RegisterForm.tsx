import { useState } from "react";
import axios from "axios";
import './index.css';

function RegisterForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
	};
	const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGender(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const finalData = {
			name,
			email,
			password,
			phone,
			gender,
		};
		axios
			.post("http://localhost:3000/users/create", finalData)
			.then((response) => {
				alert("User registered successfully!");
			})
			.catch((error) => {
				console.error("Registration error:", error);
				alert("Failed to register user.");
			});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
			<div className="flex">
				{/* Background Image Column */}
				<div className="flex-1 bg-cover bg-center bg-no-repeat bg-[url('https://imgs.search.brave.com/LDR5YNpyalayuxR8ZXt4tYHLfjXbHiMi04nmgZuKKPs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzg5LzEx/L2I3Lzg5MTFiNzIw/OTY5NjhkYjNkYzEx/MzUwZTU3NjY1MzYy/LmpwZw')]">
				</div>
				{/* Form column */}
				<div className="flex-1 flex items-center justify-center p-8">
					<form
						className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
						onSubmit={handleSubmit}
					>
						<h1 className="text-4xl font-bold mb-4 text-center my-5 py-5 text-white">
							Welcome Register Form
						</h1>
						<div className="space-y-4 m-5">
							<label htmlFor="name" className="block text-2xl font-medium text-white">
								Name:
							</label>
							<input
								type="text"
								name="name"
								placeholder="Name"
								value={name}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 bg-white/90"
							/>
							<label htmlFor="email" className="block text-2xl font-medium text-white my-5">
								Email:
							</label>
							<input
								type="text"
								name="email"
								placeholder="Email"
								value={email}
								onChange={handleEmailChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 bg-white/90"
							/>

							<label htmlFor="phone" className="block text-2xl font-medium text-white my-5">
								Phone Number:
							</label>
							<input
								type="text"
								name="phone"
								placeholder="Phone Number"
								value={phone}
								onChange={handlePhoneChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 bg-white/90"
							/>
							<label htmlFor="gender" className="block text-2xl font-medium text-white my-5">
								Gender:
							</label>
							<div className="mt-1 space-x-6 flex">
								<input
									type="radio"
									name="gender"
									value="male"
									checked={gender === "male"}
									onChange={handleGenderChange}
									className="form-radio text-blue-600 w-5 ml-1"
									/>
								<span className="ml-2 text-2xl text-white">Male</span>
								<input
									type="radio"
									name="gender"
									value="female"
									onChange={handleGenderChange}
									checked={gender === "female"}
									className="form-radio text-blue-600 w-5 ml-1"
								/>
								<span className="ml-2 text-2xl text-white">Female</span>
							</div>
							<label htmlFor="password" className="block text-2xl font-medium text-white">
								Password:
							</label>
							<input
								type="password"
								name="password"
								placeholder="Password"
								value={password}
								onChange={handlePasswordChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 bg-white/90"
							/>
						</div>
						<div className="space-y-4">
							<button
								type="submit"
								className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-200 shadow-lg transform cursor-pointer text-2xl"
								// onClick={() => window.location.href = "/"}
							>
								Register Now
							</button>
						</div>
						<div className="text-center mt-4">
							<p className="text-white text-lg">Already have an account?</p>
							<button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-200 shadow-lg transform cursor-pointer text-2xl my-4" onClick={() => window.location.href = "/login"}>
								Sign In
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default RegisterForm;
