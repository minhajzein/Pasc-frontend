import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import { useAdminLoginMutation } from "../../../redux/adminApiSlices/adminAuthApiSlice.js";
import { ToastContainer, toast } from "react-toastify";
import { setAdminCredentials } from "../../../redux/adminSlices/adminAuthSlice";

function Login() {
	const [password, setPassword] = useState(true);
	const [adminLogin, { isLoading, isError }] = useAdminLoginMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	if (isError) {
		toast.error("Server not responding", {
			position: "top-center",
			theme: "colored",
		});
	}
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
				const { data } = await adminLogin(values);
				if (data.success) {
					dispatch(setAdminCredentials(data.adminToken));
					navigate("/admin");
				}
			} catch (error) {
				console.log(error);
			}
		},
	});
	return isLoading ? (
		<Loading />
	) : (
		<div className="h-screen w-full flex justify-center items-center bg-[url('/src/assets/images/admin-login.jpg')] lg:bg-none">
			<div className="bg-blue-200 w-[90%] md:w-[50%] h-auto rounded-3xl md:grid md:grid-cols-1 lg:grid-cols-2 p-3 gap-4">
				<div className="flex items-center justify-center flex-col p-3">
					<h1 className="uppercase font-bold text-xl text-center">
						pasc admin login
					</h1>
					<div className="pt-5 w-full">
						<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
							<div className="w-full">
								<label
									className={`block ml-3 text-xs sm:text-sm ${
										formik.errors.email ? "text-red-500 animate-pulse" : ""
									}`}
									htmlFor="email"
								>
									{formik.errors.email ? formik.errors.email : "email"}
								</label>
								<input
									className="w-full shadow-md rounded-xl focus:border-lime-600"
									type="text"
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
								/>
							</div>
							<div className="w-full">
								<label
									className={`block ml-3 text-xs sm:text-sm ${
										formik.errors.password ? "text-red-500 animate-pulse" : ""
									}`}
									htmlFor="password"
								>
									{formik.errors.password ? formik.errors.password : "Password"}
								</label>
								<div className="w-full relative">
									<input
										className="w-full shadow-md rounded-xl focus:border-lime-600"
										type={password ? "password" : "text"}
										autoComplete="true"
										value={formik.values.password}
										name="password"
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
							<div className="w-full pt-4">
								<button
									className="bg-lime-600 p-2 shadow-md rounded-xl hover:scale-105 duration-300 w-full"
									type="submit"
								>
									LOGIN
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="bg-[url('/src/assets/images/admin-login.jpg')] bg-cover bg-center rounded-2xl hidden lg:block"></div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Login;
