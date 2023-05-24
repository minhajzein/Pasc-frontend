import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function Search() {
	const formik = useFormik({
		initialValues: {
			searchValue: "",
		},
		validationSchema: Yup.object({
			searchValue: Yup.string()
				.min(3, "Minimum 3 characters")
				.required("type something"),
		}),
		onSubmit: async values => {
			try {
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<div className="w-full p-2 md:p-3 flex justify-center items-center">
			<div className="md:w-1/2 w-[95%]">
				<form
					onSubmit={formik.handleSubmit}
					className="w-full flex justify-center items-center relative"
				>
					<input
						placeholder="Search here..."
						onChange={formik.handleChange}
						value={formik.values.searchValue}
						className="rounded w-full pr-12 shadow-black shadow-2xl border-2 border-slate-300"
						type="search"
						name="search"
					/>
					{formik.errors.searchValue && (
						<p className="absolute top-full text-xs left-1 text-red-600">
							{formik.errors.searchValue}
						</p>
					)}
					<button
						className="absolute hover:bg-slate-900 duration-200 hover:text-gray-400 right-0 h-full text-gray-700 bg-slate-300 px-4 rounded felx justify-center items-center"
						type="submit"
					>
						<i className="fa-solid fa-magnifying-glass"></i>
					</button>
				</form>
			</div>
		</div>
	);
}

export default Search;
