import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleClose } from "../../../redux/slices/closeSlice";

//⚡⚡⚡⚡ imports ⚡⚡⚡⚡

function Header() {
	const user = useSelector(state => state.user.value);
	const token = useSelector(state => state.auth.token);
	const closed = useSelector(state => state.closed.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [searchValue, setSearchValue] = useState("");

	const search = async searchValue => {
		try {
		} catch (error) {
			console.log(error);
		}
	};

	const handleClosed = () => {
		dispatch(handleClose(!closed));
	};

	const goToProfile = () => {
		dispatch(handleClose(false));
		navigate("/profile");
	};

	const goToHome = () => {
		dispatch(handleClose(false));
		navigate("/");
	};

	const pages = [
		{ name: "home", link: "/" },
		{ name: "events", link: "/events" },
		{ name: "news", link: "/news" },
		{ name: "about", link: "/about" },
	];

	return (
		<div className="flex flex-col  backdrop-blur bg-opacity-50  bg-gradient-to-b fixed top-0 w-full  from-black to-transparent">
			<div className="w-full p-1 md:p-2 z-50 h-12 md:h-16 flex justify-between items-center">
				<div
					onClick={goToHome}
					title="home"
					className=" cursor-pointer flex justify-center items-center"
				>
					<img
						className="w-6 md:w-8 h-6 md:h-auto"
						src="/src/assets/images/pasc_logo.png"
						alt="logo"
					/>
					<h1 className="text-xl md:text-2xl font-bold text-cyan-300">PASC</h1>
				</div>

				{token ? (
					<div>
						<div className="flex flex-row justify-center items-center">
							<ul className="md:flex md:flex-row ml-2 hidden">
								{pages.map(page => {
									return (
										<li key={page.link}>
											<Link
												className={`${
													location.pathname === page.link
														? "text-gray-400 uppercase  border-b-2 rounded px-1 mr-10 duration-300 border-gray-300"
														: "uppercase mr-10 text-slate-200  hover:text-gray-400 duration-300"
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
								} mr-2 text-2xl md:hidden cursor-pointer text-cyan-300`}
							></i>
							<div
								title="profile"
								onClick={goToProfile}
								className={`${
									location.pathname !== "/profile"
										? "rounded-full w-10 h-10 bg-gray-700 border-2 border-green-500 cursor-pointer"
										: "hidden"
								}`}
							>
								<img
									className="w-full rounded-full"
									src={
										user.avatar !== null
											? user.avatar
											: "/src/assets/images/profile_dummy.jpg"
									}
									alt="profile"
								/>
							</div>
						</div>
						<div
							className={`${
								closed !== true ? "absolute left-full" : "left-0"
							} w-full absolute md:hidden top-12 duration-300`}
						>
							<ul
								className={`${closed !== true ? "flex-row" : "grid grid-cols-1"}
						  duration-300 justify-center w-full items-center`}
							>
								{pages.map(page => {
									return (
										<li key={page.link} className="w-full duration-300">
											<Link to={page.link}>
												<div
													onClick={handleClosed}
													title={page.name}
													className="w-full flex justify-center hover:scale-95 border-b-2 border-gray-800 hover:border-cyan-300 hover:text-gray-400 hover:bg-black py-7 bg-gray-600 duration-300"
												>
													<h2 className="uppercase text-sm">{page.name}</h2>
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
			<div
				className={`${
					location.pathname === "/" ? "hidden" : "block"
				} w-full p-2 md:p-3  flex justify-center sticky top-12 md:top-16 items-center`}
			>
				<div className="md:w-1/2 w-[95%] relative">
					<input
						placeholder="Search here..."
						name="search"
						className="rounded w-full pr-12 shadow-black shadow-2xl border-2 z-10 border-slate-300"
						type="search"
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
					/>

					<button
						className="absolute hover:bg-slate-900 duration-200 hover:text-gray-400 right-0 h-full text-gray-700 bg-slate-300 px-4 rounded felx justify-center items-center"
						type="button"
						onClick={search}
					>
						<i className="fa-solid fa-magnifying-glass"></i>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Header;
