import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdminRight } from "../../../redux/adminSlices/adminRighclose";
import { useAdminLogoutMutation } from "../../../redux/adminApiSlices/adminAuthApiSlice";
import useAdminPersist from "../../../hooks/useAdminPersist";

const pages = [
	{
		page: "home",
		link: "/admin",
		logo: <i className="fa-solid fa-house pr-2"></i>,
	},
	{
		page: "users",
		link: "/admin/users",
		logo: <i className="fa-solid fa-users pr-2"></i>,
	},
	{
		page: "requests",
		link: "/admin/requests",
		logo: <i className="fa-solid fa-clipboard pr-2"></i>,
	},
	{
		page: "news",
		link: "/admin/news",
		logo: <i className="fa-solid fa-newspaper pr-2"></i>,
	},
	{
		page: "events",
		link: "/admin/events",
		logo: <i className="fa-solid fa-gift pr-2"></i>,
	},
	{
		page: "logout",
		logo: <i className="fa-solid fa-right-from-bracket pr-2"></i>,
	},
];

function AdminHeader() {
	const close = useSelector(state => state.adminClose.close);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [logout, { isLoading }] = useAdminLogoutMutation();

	const handleNavigate = link => {
		navigate(link);
		dispatch(setAdminRight(!close));
	};
	const adminLogout = () => {
		dispatch(setAdminRight(false));
		logout();
	};
	return (
		<div className="fixed z-50 top-0 w-full h-12 md:h-16 bg-cyan-700 flex justify-between items-center p-2">
			<div
				onClick={() => navigate("/admin")}
				className="flex items-center cursor-pointer"
			>
				<img
					className="w-8 md:w-10 hover:scale-90 duration-300"
					src="/src/assets/images/pasc_logo.png"
					alt=""
				/>
				<h1 className="font-bold text-3xl text-stone-900 hover:text-slate-300 duration-700">
					PASC
				</h1>
			</div>
			<div>
				<i
					onClick={() => dispatch(setAdminRight(!close))}
					className={`${
						close
							? "fa-solid fa-list hover:pr-2"
							: "fa-solid fa-arrow-right pr-2 hover:pr-0"
					} text-3xl cursor-pointer hover:text-gray-800 duration-300`}
				></i>
			</div>
			<div
				className={`absolute w-[95%] sm:w-1/3 md:w-1/4 top-12 md:top-16 ${
					close ? "-right-full" : "right-3"
				} duration-300`}
			>
				<ul className="w-full z-50">
					{pages.map(page => {
						if (page.page !== "logout") {
							return (
								<li key={page.link}>
									<div
										onClick={() => handleNavigate(page.link)}
										className={`${
											location.pathname === page.link
												? "hidden"
												: "flex uppercase z-50 shadow-2xl shadow-black rounded-lg font-semibold justify-center mt-3 items-center w-full bg-gray-400 p-3 hover:scale-105 hover:bg-black cursor-pointer duration-200 hover:text-white"
										}`}
									>
										{page.logo}
										{page.page}
									</div>
								</li>
							);
						} else {
							return (
								<li key={page.page}>
									{isLoading ? (
										<div className="flex uppercase shadow-2xl shadow-black rounded-lg font-semibold justify-center mt-3 items-center w-full bg-red-600 p-3 hover:scale-105 hover:bg-red-900 cursor-pointer duration-200 hover:text-white">
											<i className="fa-solid fa-spinner animate-spin"></i>
										</div>
									) : (
										<div
											onClick={adminLogout}
											className="flex uppercase shadow-2xl shadow-black rounded-lg font-semibold justify-center mt-3 items-center w-full bg-red-600 p-3 hover:scale-105 hover:bg-red-900 cursor-pointer duration-200 hover:text-white"
										>
											{page.logo}
											{page.page}
										</div>
									)}
								</li>
							);
						}
					})}
				</ul>
			</div>
		</div>
	);
}

export default AdminHeader;
