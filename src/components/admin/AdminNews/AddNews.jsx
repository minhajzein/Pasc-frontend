import React, { useState } from "react";
import { useCreateNewsMutation } from "../../../redux/adminApiSlices/adminNewsApiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog } from "primereact/dialog";
import { setAdminCredentials } from "../../../redux/adminSlices/adminAuthSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

//================ imports ================================================================================================================

const AddNews = () => {
	const [createNews, { isLoading }] = useCreateNewsMutation();
	const [open, setOpen] = useState(false);
	const [image64, setImage64] = useState(null);
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
			title: "",
			category: "",
			description: "",
		},

		enableReinitialize: true,
		validationSchema: Yup.object({
			title: Yup.string()
				.required("Title is required")
				.min(5, "title is very short")
				.max(40, "title is very long"),
			category: Yup.string().required("please choose a category"),
			description: Yup.string().required("description is mandatory"),
		}),

		onSubmit: async values => {
			try {
				if (image64 !== null) {
					setOpen(false);
					const credentials = {
						title: values.title,
						category: values.category,
						description: values.description,
						image: image64,
					};
					const result = await createNews(credentials);
					if (result?.data?.success) {
						toast.success("News added successfully", {
							position: "top-center",
							theme: "colored",
						});
						formik.resetForm();
						setImage64(null);
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
		<>
			{isLoading ? (
				<div className="rounded-full w-16 z-30 h-16 bg-gray-500 fixed right-4 bottom-4 md:right-10 md:bottom-10 flex justify-center items-center text-3xl">
					<i className="fa-solid fa-spinner animate-spin"></i>
				</div>
			) : (
				<div
					onClick={() => setOpen(!open)}
					className="rounded-full w-16 h-16 z-30 fixed bg-cyan-700 right-4 bottom-4 md:right-10 md:bottom-10 flex justify-center items-center duration-100 text-white text-3xl cursor-pointer"
				>
					<i className="fa-solid fa-plus"></i>
					<div className="rounded-full w-12 h-12 bg-cyan-500 absolute right-2 bottom-2 animate-ping"></div>
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
							<label htmlFor="title">Title</label>
							<input
								name="title"
								value={formik.values.title}
								onChange={formik.handleChange}
								className="rounded"
								id="title"
								type="text"
							/>
							{formik.errors.title && (
								<p className="text-red-600 text-xs">{formik.errors.title}</p>
							)}
						</div>
						<div className="flex flex-col">
							<label htmlFor="category">Category</label>
							<select
								name="category"
								value={formik.values.category}
								onChange={formik.handleChange}
								className="rounded cursor-pointer"
							>
								<option defaultValue="">--choose category</option>
								<option value="Anoucement">Anouncement</option>
								<option value="Decisions">Decisions</option>
							</select>
							{formik.errors.category && (
								<p className="text-red-600 text-xs">{formik.errors.category}</p>
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
								src={image64 !== null ? image64 : "/images/wood-blog-placeholder.jpg"}
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
		</>
	);
};

export default AddNews;
