import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleClose } from "../../../redux/slices/closeSlice";

//⚡⚡⚡⚡ imports ⚡⚡⚡⚡

function Header() {
	const user = useSelector(state => state.user.value);
	const closed = useSelector(state => state.closed.value);
	const dispatch = useDispatch();
	const location = useLocation();

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
		<div className="w-full p-1 md:p-2	az z-50 h-12 md:h-16 shadow-2xl fixed top-0 bg-gradient-to-r from-black to-teal-900 flex justify-between items-center">
			<div
				title="home"
				className=" cursor-pointer flex justify-center items-center"
			>
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
											className={`${
												location.pathname === page.link
													? "text-gray-400 uppercase font-semibold border rounded px-1 mr-5 duration-300 border-cyan-400"
													: "uppercase mr-5 text-cyan-200 font-semibold hover:text-gray-400 duration-300"
											}`}
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
							title={closed === true ? "close" : "menu"}
							className={`${
								closed !== true ? "fa-solid fa-bars" : "fa-sharp fa-solid fa-xmark"
							} mr-2 text-2xl md:hidden cursor-pointer`}
						></i>
						<div
							title="profile"
							className="rounded-full w-9 bg-gray-700 h-9 border-2 border-black cursor-pointer"
						>
							<img
								className="w-full rounded-full"
								src={user.avatar !== null ? "/src/assets/images/profile_dummy.jpg" : ""}
								alt="profile"
							/>
						</div>
					</div>
					<div
						className={`${
							closed !== true ? "hidden" : ""
						} w-full absolute md:hidden top-[49px] left-0 duration-400`}
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
												title={page.name}
												className="w-full flex justify-center hover:scale-95 border-b-2 border-cyan-300 hover:text-gray-400 hover:bg-black py-7 bg-gray-600 duration-300"
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
