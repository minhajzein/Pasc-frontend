import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleClose } from "../../../redux/slices/closeSlice";

//⚡⚡⚡⚡ imports ⚡⚡⚡⚡

function Header() {
	const user = useSelector(state => state.user.value);
	const closed = useSelector(state => state.closed.value);
	const dispatch = useDispatch();

	const handleClosed = () => {
		dispatch(handleClose(!closed));
	};

	const pages = [
		{ name: "home", link: "/" },
		{ name: "events", link: "/events" },
		{ name: "news", link: "/news" },
		{ name: "about", link: "/about" },
	];

	return (
		<div className="w-full relative p-1 md:p-2 top-0 z-50 h-12 md:h-16 shadow-2xl md:fixed bg-gradient-to-r from-black to-teal-900 flex justify-between items-center">
			<div className=" cursor-pointer flex justify-center items-center">
				<img
					className="w-6 md:w-8 h-6 md:h-auto"
					src="/src/assets/images/pasc_logo.png"
					alt="logo"
				/>
				<h1 className="text-xl md:text-2xl font-bold text-white">PASC</h1>
			</div>
			{user ? (
				<div>
					<div className="flex flex-row justify-center items-center">
						<ul className="md:flex md:flex-row ml-2 hidden">
							{pages.map(page => {
								return (
									<li key={page.link}>
										<Link
											className="uppercase mr-5 text-cyan-200 font-semibold hover:text-gray-400 duration-300"
											key={page.link}
											to={page.link}
										>
											{page.name}
										</Link>
									</li>
								);
							})}
						</ul>
						<i
							onClick={handleClosed}
							className={`${
								closed !== true ? "fa-solid fa-bars" : "fa-sharp fa-solid fa-xmark"
							} mr-2 text-2xl md:hidden cursor-pointer`}
						></i>
						<div
							title="profile"
							className="rounded-full w-9 bg-gray-700 h-9 border-2 border-black cursor-pointer"
						>
							<img src="" alt="" />
						</div>
					</div>
					<div
						className={`${
							closed !== true ? "hidden" : ""
						} w-full absolute md:hidden top-[61px] left-0 duration-400`}
					>
						<ul
							className={`${closed !== true ? "hidden" : ""}
						flex flex-col  justify-center items-center  duration-300`}
						>
							{pages.map(page => {
								return (
									<li key={page.link} className="w-full">
										<Link to={page.link}>
											<div
												onClick={handleClosed}
												className="w-full flex justify-center hover:scale-95 hover:text-gray-400 hover:bg-black py-7 bg-gray-600 duration-300"
											>
												<h1 className="uppercase font-bold">{page.name}</h1>
											</div>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default Header;
