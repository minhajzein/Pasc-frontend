import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { googleLogin } from "../../../apis/authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, googleProvider } from "../../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/slices/authSlice";
import { setUserdata } from "../../../redux/slices/userSlice";
import { useLoginMutation } from "../../../redux/userApiSlices/authApiSlice";
import usePersist from "../../../hooks/usePersist";

//⚡⚡⚡⚡ imports ⚡⚡⚡⚡

function UserLogin() {
	const [password, setPassword] = useState(true);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [persist, setPersist] = usePersist();

	const [login, { isLoading }] = useLoginMutation();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email not valid")
				.email("Invalid email address")
				.required("email is required"),
			password: Yup.string().required("password is required"),
		}),
		onSubmit: async values => {
			try {
				const response = await login(values);
				if (response.data.success) {
					dispatch(setCredentials({ accessToken: response.data.accessToken }));
					dispatch(setUserdata(response.data.user));
					navigate("/");
				} else {
					toast.error(response.data.error_msg, {
						position: "top-center",
						theme: "colored",
					});
				}
			} catch (error) {
				console.log(error);
			}
		},
	});

	const loginWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const response = await googleLogin(result.user);
			if (response.success) {
				dispatch(setCredentials({ accessToken: response.accessToken }));
				dispatch(setUserdata(response.data.user));
				navigate("/");
			} else {
				toast.error(response.error_msg, {
					position: "top-center",
					theme: "colored",
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleToggle = () => setPersist(prev => !prev);

	return isLoading ? (
		<p>Loading</p>
	) : (
		<>
			<div className="hidden fixed h-screen -z-10 lg:block bg-[url('/src/assets/images/cricket-stadium-vector.jpg')] bg-cover bg-center w-full"></div>
			<div className="mt-10 p-2 sm:p-7 lg:mt-15 h-auto w-full flex flex-col lg:flex-row lg:justify-around items-center ">
				<div className="shadow-md mt-4 lg:mt-10 rounded-xl w-full h-auto lg:w-[30%] bg-slate-300 p-2 sm:p-10 md:p-5 lg:p-3">
					<h2 className="font-bold lg:text-2xl text-center">Log In</h2>
					<p className="text-sm lg:text-lg mt-2 text-center">
						please login to explore more
					</p>
					<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
						<div className="mt-4">
							<label
								className={`block ml-3 text-xs sm:text-sm ${
									formik.errors.email ? "text-red-500" : ""
								}`}
								htmlFor="email"
							>
								{formik.errors.email ? formik.errors.email : "enter your email"}
							</label>
							<input
								className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 rounded-xl border-2 outline-none ${
									formik.errors.email ? "focus:border-red-500" : "focus:border-lime-500"
								}  w-full`}
								type="email"
								name="email"
								id="email"
								placeholder="jhondoe@example.com"
								value={formik.values.email}
								onChange={formik.handleChange}
							/>
						</div>
						<div>
							<label
								className={`block ml-3 text-xs sm:text-sm ${
									formik.errors.password ? "text-red-500" : ""
								}`}
								htmlFor="password"
							>
								{formik.errors.password ? formik.errors.password : "Password"}
							</label>
							<div className="relative">
								<input
									className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 rounded-xl border-2 outline-none ${
										formik.errors.password
											? "focus:border-red-500"
											: "focus:border-lime-500"
									}  w-full`}
									type={password ? "password" : "text"}
									name="password"
									id="password"
									placeholder="Enter password"
									value={formik.values.password}
									onChange={formik.handleChange}
								/>
								<i
									onClick={() => setPassword(!password)}
									className={
										password
											? "fa-solid fa-eye absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 cursor-pointer"
											: "fa-sharp fa-solid fa-eye-slash absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 cursor-pointer"
									}
								></i>
							</div>
						</div>
						<div className="flex flex-row justify-between border-blue-500 rounded-md items-center border p-1 px-4">
							<input
								className="bg-cyan-200 rounded-md border-blue-700 border-2"
								type="checkbox"
								id="persist"
								checked={persist}
								onChange={handleToggle}
							/>
							<label className="ml-4 lg:text-sm text-xs" htmlFor="persist">
								Trust this device
							</label>
						</div>
						<button
							className="bg-lime-600 p-1 shadow-md rounded-xl lg:p-2 hover:scale-105 duration-300"
							type="submit"
						>
							Login
						</button>
					</form>
					<div className="mt-5 lg:mt-10 grid grid-cols-3 items-center text-gray-700">
						<hr className="border-gray-700" />
						<p className="text-center text-xs">OR</p>
						<hr className="border-gray-700" />
					</div>
					<button
						onClick={loginWithGoogle}
						className="shadow-md hover:scale-105 duration-300 border bg-white py-2 w-full rounded-xl mt-5 flex items-center justify-center text-sm"
					>
						<svg
							width={19}
							height={20}
							className="mr-2"
							viewBox="0 0 19 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18.9892 10.1871C18.9892 9.36767 158.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
								fill="#4285F4"
							/>
							<path
								d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
								fill="#34A853"
							/>
							<path
								d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
								fill="#FBBC05"
							/>
							<path
								d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
								fill="#EB4335"
							/>
						</svg>
						Login with Google
					</button>
					<p className="mt-5 text-xs border-b py-4 cursor-pointer text-blue-500 hover:text-blue-700">
						Forgot your password?
					</p>
					<div className="flex justify-between mt-4">
						<p className="text-xs">Don't have an account?..</p>
						<Link to="/signup">
							<button className="text-xs bg-white rounded-lg p-1 shadow-md hover:scale-110 hover:bg-lime-500 duration-300">
								Register
							</button>
						</Link>
					</div>
				</div>
				<div className="  lg:mt-10 sm:mt-7 mt-3 lg:w-[60%]">
					<div className="w-full flex rounded-xl h-auto bg-teal-800/70 p-5 shadow-md  items-center justify-center flex-col">
						<img
							className="animate-bounce rounded-full w-1/4 shadow-md"
							src="/src/assets/images/pasc_title.jpg"
							alt=""
						/>
						<div className="flex flex-col">
							<h1 className="lg:text-5xl text-xl sm:text-5xl text-center font-extrabold w-full  opacity-70 text-cyan-300 pb-5">
								Welcome Back...
							</h1>
							<h1 className="text-center text-lg font-semibold sm:text-2xl lg:text-2xl text-white uppercase">
								Pandikkadavu Arts & Sports Club
							</h1>
							<p className="mt-5 text-center text-yellow-300 uppercase text-sm">
								Welcome to PASC, the arts and sports club that brings together people
								who share a passion for both artistic and athletic pursuits! We are
								excited to introduce you to our community and all the opportunities we
								have to offer. At PASC, we believe that art and sports are not mutually
								exclusive, but rather complement each other to promote physical and
								mental wellbeing. Whether you're an experienced athlete, a seasoned
								artist, or just starting out, we have something for everyone. We're
								excited to welcome you to PASC and can't wait to see all that we can
								accomplish together!
							</p>
						</div>
					</div>
				</div>
				<ToastContainer />
			</div>
		</>
	);
}

export default UserLogin;
