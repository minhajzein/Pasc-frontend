import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const pages = [
    {
        page: "home",
        link: "/admin",
        logo: <i class="fa-solid fa-house pr-2"></i>
    },
	{
		page: "users",
		link: "/admin/users",
		logo: <i class="fa-solid fa-users pr-2"></i>,
	},
	{
		page: "members",
		link: "/admin/members",
		logo: <i class="fa-solid fa-user-tag pr-2"></i>,
	},
	{
		page: "news",
		link: "/admin/news",
		logo: <i class="fa-solid fa-newspaper pr-2"></i>,
	},
	{
		page: "events",
		link: "/admin/events",
		logo: <i class="fa-solid fa-gift pr-2"></i>,
	},
];

function AdminHeader() {
	const [close, setClose] = useState(true);

	const navigate = useNavigate();
	const handleNavigate = link => {
		setClose(false);
		navigate(link);
	};
	return (
		<div className="fixed z-10 top-0 w-full h-12 md:h-16 bg-cyan-700 flex justify-between items-center p-2">
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
					onClick={() => setClose(!close)}
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
				<ul className="w-full">
					{pages.map(page => {
						return (
							<li key={page.link}>
								<div
									onClick={() => handleNavigate(page.link)}
									className="flex uppercase shadow-2xl shadow-black rounded-lg font-semibold justify-center mt-3 items-center w-full bg-gray-400 p-3 hover:scale-105 hover:bg-black cursor-pointer duration-200 hover:text-white"
								>
									{page.logo}
									{page.page}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default AdminHeader;
