import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { Dialog } from "primereact/dialog";
import { ToastContainer, toast } from "react-toastify";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import Loading from "../Loading/Loading";
import {
	useEventsMutation,
	useAddEventMutation,
} from "../../../redux/adminApiSlices/adminEventApiSlice";
import { setAdminCredentials } from "../../../redux/adminSlices/adminAuthSlice";
import { useDispatch } from "react-redux";

function AdminEvents() {
	const [events, setEvents] = useState(null);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [image64, setImage64] = useState(null);
	const [getAllEvents, { isLoading }] = useEventsMutation();
	const [addEvent, {}] = useAddEventMutation();
	const [disabled, setDisabled] = useState(false);
	const dispatch = useDispatch();

	const convertToBase64 = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	};

	const getBase64Image = async file => {
		try {
			const imageUrl = await convertToBase64(file);
			setImage64(imageUrl);
		} catch (error) {
			console.log(error);
		}
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			eventType: "",
			eventFee: "",
			description: "",
		},

		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string()
				.required("name is required")
				.min(3, "name is very short")
				.max(40, "name is very long"),
			eventType: Yup.string().required("please choose a type"),
			eventFee: Yup.number("please enter a number").moreThan(
				1,
				"amount cannot be less than 1"
			),
			description: Yup.string().required("description is mandatory"),
		}),

		onSubmit: async values => {
			try {
				if (image64 !== null) {
					setOpen(false);
					setLoading(true);
					if (values.eventType !== "free" && values.eventFee === "") {
						toast.error("Event is paid, please enter event fee.", {
							position: "top-center",
							theme: "colored",
						});
						setLoading(false);
					} else {
						const credentials = {
							name: values.name,
							eventType: values.eventType,
							eventFee: values.eventFee === "" ? 0 : Number(values.eventFee),
							description: values.description,
							image: image64,
						};
						const result = await addEvent(credentials);
						if (result?.data?.success) {
							toast.success("Event added successfully", {
								position: "top-center",
								theme: "colored",
							});
							setEvents(result?.data?.events);
							formik.resetForm();
							setImage64(null);
							setLoading(false);
						} else {
							if (!result?.data?.auth) {
								toast.error(result.data.error_msg, {
									position: "top-centered",
									theme: "colored",
								});
								dispatch(setAdminCredentials(null));
							}
							toast.error("Creating news failed!", {
								position: "top-center",
								theme: "colored",
							});
						}
					}
				} else {
					toast.error("Please add an image", {
						position: "top-center",
						theme: "colored",
					});
					setLoading(false);
				}
			} catch (error) {
				console.log(error + " error from on submit");
			}
		},
	});

	const allEvents = async () => {
		try {
			const result = await getAllEvents();
			if (result.data.success) {
				setEvents(result?.data?.events);
			} else if (!result?.data?.auth) {
				dispatch(setAdminCredentials(null));
			}
		} catch (error) {
			console.log(error);
		}
	};
	console.log(events);
	useEffect(() => {
		allEvents();
	}, []);
	return isLoading ? (
		<Loading />
	) : (
		<m.div
			className="w-full mt-12 md:mt-16"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			exit={{ opacity: 0 }}
		>
			<div className="w-full p-2">
				<table className="w-full bg-slate-300 rounded">
					<thead className="border-b-2 border-black">
						<tr>
							<th className="p-3">Picture</th>
							<th className="p-3">Name</th>
							<th className="p-3">Type</th>
							<th className="p-3">Charge</th>
							<th className="p-3">Date</th>
						</tr>
					</thead>
					<tbody>
						{events &&
							events.map((obj, i) => {
								if (i % 2 === 0) {
									return (
										<tr key={i} className="bg-slate-400">
											<td className="p-3 cursor-pointer flex justify-center">
												<img className="w-10 " src={obj.image} alt="" />
											</td>
											<td className="p-3 text-center">{obj.name}</td>
											<td className="p-3 text-center">{obj.eventType}</td>
											<td className="p-3 text-center">{obj.eventFee}</td>
											<td className="p-3 text-center">{obj.createdAt}</td>
										</tr>
									);
								} else {
									return (
										<tr key={i}>
											<td className="p-3 cursor-pointer flex justify-center">
												<img className="w-10 " src={obj.image} alt="" />
											</td>
											<td className="p-3 text-center">{obj.name}</td>
											<td className="p-3 text-center">{obj.eventType}</td>
											<td className="p-3 text-center">{obj.eventFee}</td>
											<td className="p-3 text-center">{obj.createdAt}</td>
										</tr>
									);
								}
							})}
					</tbody>
				</table>
			</div>
			{loading ? (
				<div className="rounded-full w-16 h-16 bg-gray-500 fixed right-4 bottom-4 md:right-10 md:bottom-10 flex justify-center items-center text-3xl">
					<i className="fa-solid fa-spinner animate-spin"></i>
				</div>
			) : (
				<div
					onClick={() => setOpen(!open)}
					className="rounded-full w-16 h-16 z-20 fixed bg-cyan-700 right-4 bottom-4 md:right-10 md:bottom-10 flex justify-center items-center duration-100 text-white text-3xl cursor-pointer"
				>
					<i className="fa-solid fa-plus"></i>
					<div className="rounded-full w-12 h-12 z-10 bg-cyan-500 absolute right-2 bottom-2 animate-ping"></div>
				</div>
			)}
			<Dialog
				visible={open}
				onHide={() => setOpen(!open)}
				header="Create news"
				position="right"
				className="md:w-[50%] w-[95%]"
			>
				<div>
					<form
						onSubmit={formik.handleSubmit}
						className="grid lg:grid-cols-2 gap-2 text-xs md:text-sm"
					>
						<div className="flex flex-col">
							<label htmlFor="name">Event Name</label>
							<input
								name="name"
								value={formik.values.name}
								onChange={formik.handleChange}
								className="rounded"
								id="name"
								type="text"
							/>
							{formik.errors.name && (
								<p className="text-red-600 text-xs">{formik.errors.name}</p>
							)}
						</div>
						<div className="flex flex-col">
							<p>Event Type</p>
							<div className="flex justify-between items-center px-8 border rounded p-3 border-black">
								<div className="flex justify-center items-center">
									<label htmlFor="paid">Paid</label>
									<input
										className="ml-2 cursor-pointer"
										type="radio"
										id="paid"
										onClick={() => setDisabled(false)}
										onChange={formik.handleChange}
										value="Paid"
										name="eventType"
									/>
								</div>
								<div className="flex justify-center items-center">
									<label htmlFor="free">Free</label>
									<input
										className="ml-2 cursor-pointer"
										type="radio"
										onClick={() => setDisabled(true)}
										id="free"
										onChange={formik.handleChange}
										value="Free"
										name="eventType"
									/>
								</div>
							</div>
							{formik.errors.eventType && (
								<p className="text-red-600 text-xs">{formik.errors.eventType}</p>
							)}
							<label className="mt-2" htmlFor="eventFee">
								Event Fee
							</label>
							<input
								className={`rounded ${disabled ? "cursor-not-allowed" : "cursor-text"}`}
								type="number"
								name="eventFee"
								disabled={disabled}
								onChange={formik.handleChange}
								value={formik.values.eventFee}
							/>
							{formik.errors.eventFee && (
								<p className="text-red-600 text-xs">{formik.errors.eventFee}</p>
							)}
						</div>
						<div className="flex flex-col">
							<label
								className="border-black border rounded text-center bg-gray-400 hover:bg-black hover:text-white duration-300 cursor-pointer p-1"
								htmlFor="image"
							>
								+Add Picture
							</label>
							<img
								className="border object-center border-black h-full mt-1 rounded object-cover"
								src={
									image64 !== null
										? image64
										: "/src/assets/images/wood-blog-placeholder.jpg"
								}
								alt="Picture"
							/>
							{image64 === null && (
								<p className="text-red-600 text-xs">please add a picture</p>
							)}
							<input
								onChange={e => getBase64Image(e.target.files[0])}
								className="hidden"
								id="image"
								type="file"
								accept="image/*"
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="description">Description</label>
							<textarea
								name="description"
								id="description"
								cols="30"
								rows="10"
								className="rounded"
								value={formik.values.description}
								onChange={formik.handleChange}
							></textarea>
							{formik.errors.description && (
								<p className="text-red-600 text-xs">{formik.errors.description}</p>
							)}
						</div>

						<hr className="border-black" />
						<hr className="hidden lg:block border-black" />
						<input
							className="p-2 rounded bg-red-600 text-black uppercase cursor-pointer hover:bg-red-900 hover:text-white duration-300"
							type="reset"
							value="Discard"
							onClick={() => {
								formik.resetForm();
								setImage64(null);
							}}
						/>
						<input
							className="p-2 rounded bg-green-600 text-black uppercase cursor-pointer hover:bg-green-900 hover:text-white duration-300"
							type="submit"
							value="Add"
						/>
					</form>
				</div>
			</Dialog>
			<ToastContainer />
		</m.div>
	);
}

export default AdminEvents;
