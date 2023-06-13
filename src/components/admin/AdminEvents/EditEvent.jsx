import React, { useState } from "react";
import {
	selectEventById,
	useAdminEditEventMutation,
} from "../../../redux/adminApiSlices/adminEventApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import moment from "moment";

//================= imports ===============================================================================

const EditEvent = ({ eventId }) => {
	const event = useSelector(state => selectEventById(state, eventId));

	const [editEvent, { isLoading }] = useAdminEditEventMutation();

	const [open, setOpen] = useState(false);
	const [image64, setImage64] = useState(event.image);
	const [unlimited, setUnlimited] = useState(
		event.limit === "limited" ? false : true
	);
	const [disabled, setDisabled] = useState(
		event.eventType === "Paid" ? false : true
	);

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
			name: event.name,
			category: event.category,
			limit: event.limit,
			playersLimit: event.playersLimit,
			teamLimit: event.teamLimit,
			eventType: event.eventType,
			eventFee: event.eventFee,
			startingDate: moment(event.startingDate).format("YYYY-MM-DD"),
			endingDate: moment(event.endingDate).format("YYYY-MM-DD"),
			description: event.description,
		},

		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string()
				.required("name is required")
				.min(3, "name is very short")
				.max(40, "name is very long"),
			category: Yup.string().required("please select a category"),
			limit: Yup.string().required("please select one"),
			teamLimit: Yup.number(),
			playersLimit: Yup.number(),
			eventType: Yup.string().required("please choose a type"),
			eventFee: Yup.number().moreThan(1, "amount cannot be less than 1"),
			startingDate: Yup.date()
				.min(
					moment(event.startingDate).format("YYYY-MM-DD"),
					"date cannot be less current date"
				)
				.required("starting date is required"),
			endingDate: Yup.date()
				.min(
					Yup.ref("startingDate"),
					"ending date cannot be less than starting date"
				)
				.required("ending date is required"),
			description: Yup.string().required("description is mandatory"),
		}),

		onSubmit: async values => {
			try {
				if (image64 !== null) {
					setOpen(false);
					if (values.eventType !== "free" && values.eventFee === "") {
						toast.error("Event is paid, please enter event fee.", {
							position: "top-center",
							theme: "colored",
						});
					} else {
						const credentials = {
							id: eventId,
							name: values.name,
							category: values.category,
							eventType: values.eventType,
							limit: values.limit,
							playersLimit:
								values.limit === "limited" ? Number(values.playersLimit) : 0,
							teamLimit: values.limit === "limited" ? Number(values.teamLimit) : 0,
							eventFee: values.eventType === "Free" ? 0 : Number(values.eventFee),
							startingDate: values.startingDate,
							endingDate: values.endingDate,
							description: values.description,
							image: image64,
						};
						const result = await editEvent(credentials);
						if (result?.data?.success) {
							toast.success("Event edited successfully", {
								position: "top-center",
								theme: "colored",
							});
							formik.resetForm();
						} else {
							if (!result?.data?.auth) {
								toast.error("Event edtion failed!", {
									position: "top-centered",
									theme: "colored",
								});
								dispatch(setAdminCredentials(null));
							}
							toast.error("Event edition failed!", {
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
				}
			} catch (error) {
				console.log(error + " error from on submit");
			}
		},
	});
	return (
		<div className="flex justify-center items-center">
			{isLoading ? (
				<i className="fa-solid fa-spinner animate-spin"></i>
			) : (
				<i
					className="fa-solid text-center fa-pen-to-square cursor-pointer hover:scale-105 hover:text-gray-600 duration-300"
					title="Edit event"
					onClick={() => setOpen(true)}
				></i>
			)}

			<Dialog
				visible={open}
				onHide={() => setOpen(!open)}
				header="Edit Event"
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
						<div className="w-full">
							<label htmlFor="category">Category</label>
							<select
								className="w-full rounded"
								name="category"
								value={formik.values.category}
								onChange={formik.handleChange}
								id="category"
							>
								<option defaultValue="">--select category</option>
								<option value="Anouncement">Anouncement</option>
								<option value="Decisions">Decisions</option>
								<option value="Registration">Registration</option>
							</select>
							{formik.errors.category && (
								<p className="text-red-600 text-xs">{formik.errors.category}</p>
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
										checked={formik.values.eventType === "Paid"}
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
										checked={formik.values.eventType === "free"}
										value="free"
										name="eventType"
									/>
								</div>
							</div>
							{formik.errors.eventType && (
								<p className="text-red-600 text-xs">{formik.errors.eventType}</p>
							)}
						</div>
						<div className="w-full">
							<label className="mt-2" htmlFor="eventFee">
								Event Fee
							</label>
							<input
								className={`rounded ${
									disabled ? "cursor-not-allowed" : "cursor-text"
								} w-full`}
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

						<div className="w-full">
							<p>Limitations</p>
							<div className="flex justify-between items-center px-8 border rounded p-3 border-black">
								<div className="flex justify-center items-center">
									<label htmlFor="limited">Limited</label>
									<input
										className="ml-2 cursor-pointer"
										type="radio"
										id="limited"
										onClick={() => setUnlimited(false)}
										onChange={formik.handleChange}
										value="limited"
										checked={formik.values.limit === "limited"}
										name="limit"
									/>
								</div>
								<div className="flex justify-center items-center">
									<label htmlFor="unlimited">Unlimited</label>
									<input
										className="ml-2 cursor-pointer"
										type="radio"
										onClick={() => setUnlimited(true)}
										id="unlimited"
										onChange={formik.handleChange}
										checked={formik.values.limit === "unlimited"}
										value="unlimited"
										name="limit"
									/>
								</div>
							</div>
						</div>
						<div className="w-full">
							<div className="flex justify-between w-full">
								<div className="w-[45%]">
									<label htmlFor="playerCount">Count of Players</label>
									<input
										id="playerCount"
										disabled={unlimited}
										className={`rounded ${
											unlimited ? "cursor-not-allowed" : "cursor-text"
										} w-full`}
										type="number"
										value={formik.values.playersLimit}
										onChange={e => formik.setFieldValue("playersLimit", e.target.value)}
									/>
								</div>
								<div className="w-[45%]">
									<label htmlFor="teamCount">Count of Team</label>
									<input
										id="teamCount"
										disabled={unlimited}
										className={`rounded ${
											unlimited ? "cursor-not-allowed" : "cursor-text"
										} w-full`}
										type="number"
										value={formik.values.teamLimit}
										onChange={e => formik.setFieldValue("teamLimit", e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="w-full">
							<label htmlFor="start">Starting date</label>
							<input
								name="start"
								id="date"
								className="w-full rounded cursor-pointer"
								value={formik.values.startingDate}
								onChange={e => formik.setFieldValue("startingDate", e.target.value)}
								type="date"
								placeholder="dd-mm-yyyy"
							/>
							{formik.errors.startingDate && (
								<p className="text-red-600 text-xs">{formik.errors.startingDate}</p>
							)}
						</div>
						<div className="w-full">
							<label htmlFor="end">Ending date</label>
							<input
								name="end"
								id="end"
								className="w-full rounded cursor-pointer"
								value={formik.values.endingDate}
								onChange={e => formik.setFieldValue("endingDate", e.target.value)}
								type="date"
								placeholder="dd-mm-yyyy"
							/>
							{formik.errors.endingDate && (
								<p className="text-red-600 text-xs">{formik.errors.endingDate}</p>
							)}
						</div>
						<div className="flex flex-col">
							<label
								className="border-black border rounded text-center bg-gray-400 hover:bg-black hover:text-white duration-300 cursor-pointer p-1"
								htmlFor="image"
							>
								Change image
							</label>
							<img
								className="border object-center border-black h-full mt-1 rounded object-cover"
								src={image64}
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
								setImage64(event.image);
							}}
						/>
						<input
							className="p-2 rounded bg-green-600 text-black uppercase cursor-pointer hover:bg-green-900 hover:text-white duration-300"
							type="submit"
							value="save"
						/>
					</form>
				</div>
			</Dialog>
		</div>
	);
};

export default EditEvent;
