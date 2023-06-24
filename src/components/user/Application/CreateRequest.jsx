import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
	useAddMobileMutation,
	useCheckMobileMutation,
	useCreateRequestMutation,
} from "../../../redux/userApiSlices/applicationApiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import sendOtp from "../../../firebase/authentication";
import { toast } from "react-toastify";
import { setUserdata } from "../../../redux/slices/userSlice";

//============== imports ==================================================================================

const CreateRequest = ({ user }) => {
	const [image, setImage] = useState(null);
	const [aadhaar, setAadhaar] = useState(null);
	const [confirmation, setConfirmation] = useState(null);
	const [verified, setVerified] = useState(user.mobile !== null ? true : false);
	const [invalid, setInvalid] = useState(false);
	const [verifyErr, setVerifyErr] = useState(false);
	const [OTP, setOTP] = useState("");

	const [addMobile, { isLoading: addingMob }] = useAddMobileMutation();
	const [createRequest, { isLoading: creatingReq }] = useCreateRequestMutation();
	const [checkMobile, { isLoading: checking }] = useCheckMobileMutation();

	const dispatch = useDispatch();

	const convertToBase64 = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	};

	const getBase64Image = async (file, setState) => {
		try {
			const imageUrl = await convertToBase64(file);
			setState(imageUrl);
		} catch (error) {
			console.log(error);
		}
	};
	const sendOTP = async () => {
		try {
			const result = await checkMobile({
				userId: user._id,
				mobile: formik.values.phone,
			});
			if (result?.data.success) {
				await sendOtp.sendOtp(formik.values.phone, setConfirmation, toast);
			} else {
				toast.error(result.data.err_msg, {
					position: "top-center",
					theme: "colored",
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const verifyOtp = async () => {
		try {
			await sendOtp.verifyOtp(
				confirmation,
				OTP,
				setVerified,
				setInvalid,
				setVerifyErr
			);
			await addMobile({
				userId: user._id,
				mobile: formik.values.phone,
			});
			setConfirmation(null);
		} catch (error) {
			console.log(error);
		}
	};

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			aadhaar: "",
			phone: user.mobile !== null ? user.mobile : "",
			address: "",
		},
		validationSchema: Yup.object({
			firstName: Yup.string().min(3, "should be atleast 3 characters"),
			lastName: Yup.string()
				.min(3, "should be atleast 3 characters")
				.required("last name is required"),
			aadhaar: Yup.number()
				.min(200000000000, "not a valid aadhaar number")
				.max(999999999999, "not a valid aadhaar number")
				.required("aadhaar number is required"),
			phone: Yup.number()
				.min(2000000000, "invalid number")
				.max(9999999999, "invalid number")
				.required("phone is required"),
			address: Yup.string().required("fill address field"),
		}),
		onSubmit: async values => {
			try {
				if (verified) {
					if (image && aadhaar) {
						const result = await createRequest({
							userId: user._id,
							firstName: values.firstName,
							lastName: values.lastName,
							adNumber: values.aadhaar,
							address: values.address,
							image: image,
							adImage: aadhaar,
						});
						if (result?.data?.success) {
							dispatch(setUserdata(result.data.user));
							toast.success(
								"Your request has been sent successfully, you can track your verification process",
								{
									position: "top-center",
									theme: "colored",
								}
							);
						} else {
							toast.error(result?.data?.err_msg, {
								position: "top-center",
								theme: "colored",
							});
						}
					} else {
						toast.error("Please add images properly", {
							position: "top-center",
							theme: "colored",
						});
					}
				} else {
					toast.error("Please verify your mobile number", {
						position: "top-center",
						theme: "colored",
					});
				}
			} catch (error) {
				console.log(error);
			}
		},
	});

	let content = (
		<div className="w-[90%] md:w-[70%] lg:w-[50%] p-2 duration-300 backdrop:blur md:p-4 flex flex-col rounded bg-slate-200 items-center justify-center">
			<h1 className="uppercase text-lg underline underline-offset-1 text-center text-gray-700 font-bold">
				membership application form
			</h1>
			<form
				onSubmit={formik.handleSubmit}
				className="w-full grid grid-cols-1 md:grid-cols-2 p-2 gap-5 md:p-4"
			>
				<div className="w-full col-span-2 md:col-span-1">
					<label className="ml-1 text-gray-500 text-xs" htmlFor="fName">
						First Name
					</label>
					<input
						className={`w-full rounded p-2 border ${
							formik.errors.firstName ? "border-red-500" : "border-green-500"
						} `}
						id="fName"
						type="text"
						name="firstName"
						value={formik.values.firstName}
						onChange={formik.handleChange}
					/>
					{formik.errors.firstName && (
						<p className="text-xs text-red-700">{formik.errors.firstName}</p>
					)}
				</div>
				<div className="w-full col-span-2 md:col-span-1">
					<label htmlFor="lName" className="ml-1 text-gray-500 text-xs">
						Last Name
					</label>
					<input
						className={`w-full rounded p-2 border ${
							formik.errors.lastName ? "border-red-500" : "border-green-500"
						} `}
						type="text"
						name="lastName"
						id="lName"
						value={formik.values.lastName}
						onChange={formik.handleChange}
					/>
					{formik.errors.lastName && (
						<p className="text-xs text-red-700">{formik.errors.lastName}</p>
					)}
				</div>
				<div className="w-full col-span-2 md:col-span-1">
					<label className="ml-1 text-gray-500 text-xs" htmlFor="adNumber">
						Aadhaar Number
					</label>
					<input
						className={`w-full rounded p-2 border ${
							formik.errors.aadhaar ? "border-red-500" : "border-green-500"
						}`}
						id="adNumber"
						type="number"
						name="aadhaar"
						value={formik.values.aadhaar}
						onChange={formik.handleChange}
					/>
					{formik.errors.aadhaar && (
						<p className="text-xs text-red-700">{formik.errors.aadhaar}</p>
					)}
				</div>
				<div className="w-full col-span-2 md:col-span-1">
					<label htmlFor="phone" className="ml-1 text-gray-500 text-xs">
						Mobile Number
					</label>
					<div className="w-full relative">
						<input
							className={`w-full rounded p-2 border ${
								formik.errors.phone ? "border-red-500" : "border-green-500"
							}`}
							type="number"
							id="phone"
							name="phone"
							disabled={verified ? true : false}
							value={formik.values.phone}
							onChange={formik.handleChange}
						/>
						{verified ? (
							<i className="text-2xl absolute top-1/2 right-3 -translate-y-1/2 fa-solid fa-check text-green-500"></i>
						) : (
							<>
								<button
									className={`${
										formik.errors.phone || formik.values.phone === "" || confirmation
											? "hidden"
											: "px-2 py-1 uppercase hover:bg-slate-500 duration-300 text-xs bg-gray-800 text-slate-200 -translate-y-1/2  rounded absolute top-1/2 right-2"
									}`}
									onClick={sendOTP}
									type="button"
									disabled={checking}
								>
									{checking || addingMob ? (
										<i className="fa-solid fa-spinner animate-spin"></i>
									) : (
										"send otp"
									)}
								</button>
							</>
						)}
					</div>

					{formik.errors.phone && (
						<p className="text-xs text-red-700">{formik.errors.phone}</p>
					)}
				</div>
				<div
					className={`${
						verified || confirmation ? "hidden" : "w-full col-span-2 md:col-span-1"
					}`}
				>
					<div id="recaptcha-container"></div>
				</div>
				{confirmation?.verificationId && (
					<>
						<div className="w-full col-span-2 md:col-span-1">
							<input
								type="number"
								className="w-full rounded"
								placeholder="enter OTP"
								name="OTP"
								onChange={e => setOTP(e.target.value)}
							/>
							<label htmlFor="address" className="ml-1 text-gray-500 text-xs">
								{invalid ? "invalid OTP" : "An OTP has been sent to your mobile number"}
							</label>
						</div>
						<div>
							<input
								className="p-2 px-5 cursor-pointer bg-green-700 uppercase text-slate-100 border-black hover:bg-gray-400 border duration-300 hover:text-black rounded"
								type="button"
								value="verify"
								onClick={verifyOtp}
							/>
						</div>
					</>
				)}

				<div className="w-full col-span-2">
					<label htmlFor="address" className="ml-1 text-gray-500 text-xs">
						Address
					</label>
					<input
						className={`w-full rounded p-2 border ${
							formik.errors.address ? "border-red-500" : "border-green-500"
						}`}
						placeholder="building, land mark, street, post office, pin"
						type="text"
						id="address"
						name="address"
						value={formik.values.address}
						onChange={formik.handleChange}
					/>
					{formik.errors.address && (
						<p className="text-xs text-red-700">{formik.errors.address}</p>
					)}
				</div>
				<div className="w-full col-span-2 border border-slate-500 p-4 rounded flex justify-center items-center flex-col">
					<label
						className="border-2 p-2 rounded border-gray-500 cursor-pointer"
						htmlFor="image"
					>
						Add an image
					</label>
					<div className="w-full h-40 mt-2 flex justify-center">
						{image ? (
							<img
								className="object-center object-contain h-full"
								src={image}
								alt=""
							/>
						) : (
							<p className="w-full h-full font-serif text-sm text-gray-500">
								Add an image of you. image should be clear and contain your face. please
								don't use black and white images.
							</p>
						)}
					</div>
					<input
						className="hidden"
						onChange={e => getBase64Image(e.target.files[0], setImage)}
						type="file"
						id="image"
						accept="image/*"
					/>
				</div>
				<div className="w-full border border-slate-400 rounded p-4 col-span-2 flex justify-center items-center flex-col">
					<label
						htmlFor="proof"
						className="border-2 p-2 rounded border-gray-500 cursor-pointer"
					>
						Add aadhaar
					</label>
					<div className="w-full h-40 mt-2 font-serif">
						{aadhaar ? (
							<img className="w-full h-full object-contain" src={aadhaar} alt="" />
						) : (
							<p className="w-full h-full text-sm text-gray-500">
								Add your aadhar card front side picture which is contained address and
								details. address should be same as address field, otherwise your
								application may be rejected. don't concern about your data, everything
								is secured.
							</p>
						)}
					</div>
					<input
						className="hidden"
						onChange={e => getBase64Image(e.target.files[0], setAadhaar)}
						type="file"
						id="proof"
						accept="image/*"
					/>
				</div>
				<input
					type="button"
					value="discard"
					onClick={formik.resetForm}
					className="border border-black p-2 rounded bg-red-600 uppercase col-span-2 md:col-span-1 hover:bg-white duration-300 cursor-pointer"
				/>
				{creatingReq ? (
					<div className="col-span-2 md:col-span-1 hover:cursor-wait flex p-2 justify-center items-center rounded border border-gray-700">
						<i className="fa-solid fa-spinner animate-spin"></i>
					</div>
				) : (
					<input
						type="submit"
						value="apply"
						className="border border-black p-2 rounded bg-green-600 uppercase col-span-2 md:col-span-1 hover:bg-white duration-300 cursor-pointer"
					/>
				)}
			</form>
		</div>
	);
	return content;
};

export default CreateRequest;
