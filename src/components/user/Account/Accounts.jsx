import React from "react";
import { useSelector } from "react-redux";

function Accounts() {
	const user = useSelector(state => state.user.value);
	return (
		<div className="w-full  h-auto mt-12 md:mt-16 flex flex-col items-center">
			<div className="bg-gray-400 max-w-4xl lg:rounded-xl shadow-2xl w-full lg:mt-3 lg:p-2">
				<div
					className={`h-32 sm:h-64 lg:rounded-xl shadow-2xl bg-cover bg-center relative${
						user.coverPhoto !== null
							? ` bg-[url(${user.coverPhoto})]`
							: ` bg-[url(/src/assets/images/temprorarry_cover.png)]`
					}`}
				>
					<p
						title="Change cover photo"
						className="text-xs sm:text-sm text-black absolute right-1 top-[2px] cursor-pointer flex"
					>
						<i className="fa-solid fa-upload m-1"></i>
						<span className="hidden sm:block">Change Cover Photo</span>
					</p>
				</div>
				<div className="w-full flex flex-col relative">
					<div className="w-full flex justify-center items-center py-3">
						<img
							className="w-24 h-auto sm:w-36 object-cover object-center rounded-full border-2 sm:left-10 left-1 absolute sm:-top-1/2 border-green-500 -top-12"
							src={
								user.avatar !== null
									? user.avatar
									: "/src/assets/images/profile_dummy.jpg"
							}
							alt=""
						/>
						{user.type !== "member" && (
							<div>
								<button className="bg-green-600 mt-16 sm:mt-5 rounded-xl px-2 text-xs sm:text-lg uppercase font-semibold h-[0%] hover:scale-105 duration-300 shadow-lg">
									+ membership
								</button>
							</div>
						)}
						<div className="absolute right-1 sm:right-10 top-1">
							<h1 className="text-gray-900 sm:text-3xl uppercase font-bold">
								{user.username}
							</h1>
							<h2 className="text-cyan-700 sm:text-2xl uppercase text-sm font-semibold">
								{user.type}
							</h2>
						</div>
					</div>
					<div className="flex justify-around  pb-5">
						<p className="sm:mt-9 mt-4 text-xs sm:text-sm text-blue-700 cursor-pointer">
							<i className="fa-solid fa-upload mr-1"></i>Change Photo
						</p>
						<p className="sm:mt-9 mt-4 text-xs sm:text-smt text-blue-700 cursor-pointer">
							<i className="fa-solid fa-pen-to-square mr-1"></i>Edit Details
						</p>
					</div>
				</div>
				<div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-4 p-1">
					<div className="bg-gradient-to-r from-black to-blue-900  rounded-3xl shadow-2xl py-4 flex flex-col justify-center items-center">
						<h1 className="text-gray-400 sm:text-2xl font-semibold pb-5">
							Personal Details
						</h1>
						<div className="w-full px-6">
							<h1 className="text-gray-200 sm:text-lg text-sm">
								Email : {user.email}
							</h1>
							{user?.mobile ? (
								<h1 className="text-gray-200 sm:text-lg text-sm">
									Mobile : {user.mobile}
								</h1>
							) : (
								""
							)}
						</div>
					</div>
					<div className="bg-gradient-to-l from-black to-blue-900  rounded-3xl shadow-2xl py-4 flex flex-col justify-center items-center">
						<h1 className="text-gray-400 sm:text-2xl font-semibold pb-5">
							Achievements
						</h1>
						<div className="w-full px-6">
							<h1 className="text-sm text-center text-red-500">No Achievements</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Accounts;
