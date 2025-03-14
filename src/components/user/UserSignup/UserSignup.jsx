import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import verify from "../../../firebase/authentication";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase/config";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/slices/authSlice";
import { setUserdata } from "../../../redux/slices/userSlice";
import usePersist from "../../../hooks/usePersist";
import {
	useGoogleSignupMutation,
	useSignupMutation,
} from "../../../redux/userApiSlices/authApiSlice";
import Loading from "../Loading/Loading";

//⚡⚡⚡⚡ imports ⚡⚡⚡⚡

function UserSignup() {
	const [password, setPassword] = useState(true);
	const [confirmation, setConfirmation] = useState(null);
	const [OTP, setOTP] = useState("");
	const [invalid, setInvalid] = useState(false);
	const [verified, setVerified] = useState(false);
	const [verifyErr, setVerifyErr] = useState(false);
	const [persist, setPersist] = usePersist();
	const [signup, { isLoading, isSuccess }] = useSignupMutation();
	const [signupGoogle, {}] = useGoogleSignupMutation();

	//formik & form validations

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			mobile: "",
			password: "",
			confirm: "",
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.min(3, "username should be atleast 3 character")
				.max(25, "username is too long")
				.required("username is required"),
			email: Yup.string()
				.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email is not valid")
				.email("Invalid email address")
				.required("email is required"),
			mobile: Yup.string()
				.required("mobile number is required")
				.matches(
					/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6-9]\d{9}$/,
					"mobile number is not valid"
				),
			password: Yup.string()
				.min(8, "password should be atleast 8 character")
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
					"password should contain an uppercase,a lowercase, a number and a special character"
				)
				.required("password is required"),
			confirm: Yup.string()
				.required("please confirm your password")
				.oneOf([Yup.ref("password")], "password must be same"),
		}),
		onSubmit: async values => {
			try {
				if (verified) {
					const { data } = await signup(values);
					if (data.success) {
						dispatch(setCredentials({ accessToken: data.accessToken }));
						dispatch(setUserdata(data.user));
						navigate("/");
					} else {
						toast.error(data.error_msg, {
							position: "top-center",
							theme: "colored",
						});
					}
				} else {
					setVerifyErr(true);
				}
			} catch (error) {
				console.log(error);
			}
		},
	});

	const handleToggle = () => setPersist(prev => !prev);

	const signInWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);

			const response = await signupGoogle(result.user);

			if (response.data.success) {
				dispatch(setCredentials({ accessToken: response.data.accessToken }));
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

	return isLoading ? (
		<Loading />
	) : (
		<>
			<div className="hidden fixed h-screen -z-10 lg:block bg-[url('/images/cricket-stadium-vector.jpg')] bg-cover bg-center w-full"></div>
			<div className="mt-9 p-3 sm:p-7 lg:p-10 w-full flex flex-col lg:flex-row lg:justify-around items-center ">
				<div className="shadow-md mt-4 lg:mt-10 rounded-xl w-full h-auto lg:w-[30%] bg-slate-300 p-2 sm:p-10 md:p-5 lg:p-3">
					<h2 className="font-bold lg:text-2xl text-center">Sign Up</h2>
					<p className="text-sm mt-2 text-cyan-600 text-center">
						Please sign up and explore
					</p>
					<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
						<div className="mt-2">
							<label
								className={`block ml-3 text-xs sm:text-sm ${
									formik.errors.username ? "text-red-500" : ""
								}`}
								htmlFor="username"
							>
								{formik.errors.username ? formik.errors.username : "Username"}
							</label>
							<input
								className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 rounded-xl border-2 outline-none ${
									formik.errors.username
										? "focus:border-red-500"
										: "focus:border-lime-500"
								}  w-full`}
								type="text"
								id="username"
								name="username"
								placeholder="Jhon Doe"
								value={formik.values.username}
								onChange={formik.handleChange}
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className={`block ml-3 text-xs sm:text-sm ${
									formik.errors.email ? "text-red-500" : ""
								}`}
							>
								{formik.errors.email ? formik.errors.email : "Email"}
							</label>
							<input
								className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 rounded-xl border-2 outline-none ${
									formik.errors.email ? "focus:border-red-500" : "focus:border-lime-500"
								}  w-full`}
								type="email"
								id="email"
								name="email"
								placeholder="jhondoe@example.com"
								value={formik.values.email}
								onChange={formik.handleChange}
							/>
						</div>
						<div>
							<label
								htmlFor="mobile"
								className={`block ml-3 text-xs sm:text-sm ${
									formik.errors.mobile ? "text-red-500" : ""
								}`}
							>
								{formik.errors.mobile ? formik.errors.mobile : "Mobile number"}
							</label>
							<div className="flex justify-between">
								<input
									className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm
								 shadow-md lg:p-2 p-1  rounded-xl border-2 outline-none  ${
										formik.errors.mobile || formik.values.mobile === "" || verified
											? "focus:border-red-500 w-full"
											: "focus:border-lime-500 w-[70%]"
									}`}
									type="text"
									id="mobile"
									name="mobile"
									placeholder="Enter a valid Mobile number"
									value={formik.values.mobile}
									onChange={formik.handleChange}
								/>
								{formik.values.mobile !== "" && (
									<button
										onClick={() =>
											verify.sendOtp(formik.values.mobile, setConfirmation, toast)
										}
										type="button"
										className={`bg-neutral-700 rounded-lg w-[27%] border-2 hover:bg-white hover:text-black hover:border-black text-xs text-white  duration-300 ${
											formik.errors.mobile || verified ? "hidden" : "block"
										}`}
									>
										GET OTP
									</button>
								)}
							</div>
						</div>
						<div className={`${confirmation ? "hidden" : ""}`}>
							<div id="recaptcha-container"></div>
						</div>
						{confirmation && (
							<div className={`${verified ? "hidden" : ""} duration-300`}>
								<label
									htmlFor="otp"
									className={`block ml-3 text-xs sm:text-sm ${
										invalid ? "text-red-500" : "text-green-600"
									}`}
								>
									{invalid ? "Invalid OTP try again" : "OTP has been sent successfully"}
								</label>
								<div className="flex justify-between">
									<input
										className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 w-[70%] rounded-xl border-2 outline-none`}
										type="text"
										id="otp"
										value={OTP}
										name="otp"
										onChange={e => setOTP(e.target.value)}
										placeholder="Enter OTP here"
									/>
									<button
										onClick={() =>
											verify.verifyOtp(
												confirmation,
												OTP,
												setVerified,
												setInvalid,
												setVerifyErr
											)
										}
										type="button"
										className={`bg-neutral-700 rounded-lg w-[27%] border-2 hover:bg-white hover:text-black hover:border-black text-xs text-white  duration-300`}
									>
										VERIFY
									</button>
								</div>
							</div>
						)}
						{verified && (
							<h3 className="text-green-600 text-center text-sx sm:text-sm border-y-2 border-gray-700 p-2 font-semibold ">
								Successfully verified🌟
							</h3>
						)}
						<div>
							<label
								htmlFor="password"
								className={`block ml-3 text-xs sm:text-sm ${
									formik.errors.password ? "text-red-500" : ""
								}`}
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
									autoComplete="true"
									id="password"
									placeholder="Create Password"
									value={formik.values.password}
									onChange={formik.handleChange}
								/>
								<i
									onClick={() => setPassword(!password)}
									className={
										password
											? "fa-solid fa-eye absolute top-1/2 right-3 text-sm -translate-y-1/2 text-gray-600 cursor-pointer"
											: "fa-sharp fa-solid fa-eye-slash absolute top-1/2 right-3 text-sm -translate-y-1/2 text-gray-600 cursor-pointer"
									}
								></i>
							</div>
						</div>
						<div>
							<label
								htmlFor="confirm"
								className={`block ml-3 text-xs sm:text-sm ${
									formik.errors.confirm ? "text-red-500" : ""
								} `}
							>
								{formik.errors.confirm ? formik.errors.confirm : "Confirm Password"}
							</label>
							<input
								className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 rounded-xl border-2 outline-none ${
									formik.errors.confirm
										? "focus:border-red-500"
										: "focus:border-lime-500"
								}  w-full`}
								type={password ? "password" : "text"}
								id="confirm"
								name="confirm"
								autoComplete="true"
								placeholder="Enter Password again"
								value={formik.values.confirm}
								onChange={formik.handleChange}
							/>
						</div>
						{verifyErr && (
							<p className="text-red-600 text-xs sm:text-sm">
								Please verify your mobile number
							</p>
						)}
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
							Sign Up
						</button>
					</form>
					<div className="mt-4 grid grid-cols-3 items-center text-gray-700">
						<hr className="border-gray-700" />
						<p className="text-center text-xs">OR</p>
						<hr className="border-gray-700" />
					</div>
					<button
						onClick={signInWithGoogle}
						className="shadow-md hover:scale-105 duration-300 border bg-white py-2 w-full rounded-xl mt-4 flex items-center justify-center text-sm"
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
						Sign up with Google
					</button>
					<div className="flex justify-between mt-6">
						<p className="text-xs">Already have an account?..</p>
						<Link to="/login">
							<button className="text-xs bg-white rounded-lg p-1 shadow-md hover:scale-110 hover:bg-lime-500 duration-300">
								Login
							</button>
						</Link>
					</div>
				</div>
				<div className="w-full flex rounded-xl h-auto bg-teal-800 lg:bg-teal-800/70 p-5 shadow-md lg:mt-10 mt-7 lg:w-[60%] items-center justify-center flex-col">
					<img
						className="animate-bounce rounded-full w-1/4 shadow-2xl"
						src="/images/pasc_title.jpg"
						alt=""
					/>
					<div className="flex flex-col">
						<h1 className="lg:text-5xl text-xl sm:text-5xl text-center font-extrabold w-full  opacity-70 text-cyan-300 pb-5">
							Welcome to...
						</h1>
						<h1 className="text-center text-sm font-semibold sm:text-2xl lg:text-2xl text-white uppercase">
							Pandikkadavu Arts & Sports Club
						</h1>
						<p className="mt-5 text-center text-yellow-300 lg:text-slate-200 uppercase text-xs sm:text-sm">
							Welcome to PASC, the arts and sports club that brings together people who
							share a passion for both artistic and athletic pursuits! We are excited
							to introduce you to our community and all the opportunities we have to
							offer. At PASC, we are dedicated to promoting and fostering creativity,
							self-expression, and physical activity in our members. Whether you are an
							experienced artist or athlete, or just starting out, we welcome
							individuals of all skill levels and backgrounds to join us. At PASC, we
							believe that art and sports are not mutually exclusive, but rather
							complement each other to promote physical and mental wellbeing. Whether
							you're an experienced athlete, a seasoned artist, or just starting out,
							we have something for everyone. We're excited to welcome you to PASC and
							can't wait to see all that we can accomplish together!
						</p>
					</div>
				</div>
				<ToastContainer />
			</div>
		</>
	);
}

export default UserSignup;
