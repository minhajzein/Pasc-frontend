import React from "react";
import { useSelector } from "react-redux";

function Accounts() {
	const user = useSelector(state => state.user.value);
	return (
		<div className="w-full  h-auto mt-12 md:mt-16 flex flex-col items-center">
			<div className="bg-gray-400 max-w-4xl lg:rounded-xl shadow-2xl w-full lg:mt-3 lg:p-2">
				<div className=" h-32 sm:h-64 lg:rounded-xl bg-[url(/src/assets/images/cover_photo.JPG)] shadow-2xl bg-cover bg-center relative">
					<p className="sm:mt-9 mt-4 text-xs sm:text-sm text-blue-700 absolute right-1 bottom-1 cursor-pointer">
						<i className="fa-solid fa-upload mr-1"></i>Uplaod Cover Photo
					</p>
				</div>
				<div className="w-full flex flex-col">
					<div className="w-full flex justify-between sm:px-10 px-1">
						<img
							className="w-24 h-auto sm:w-36 object-cover object-center rounded-full border-2 -translate-y-1/2 border-green-500"
							src="/src/assets/images/profile_picture.JPG"
							alt=""
						/>
						<div>
							<h1 className="text-gray-900 sm:text-3xl uppercase font-bold">
								{user.username}
							</h1>
							<h2 className="text-cyan-700 sm:text-2xl uppercase text-sm font-semibold">
								{user.type}
							</h2>
						</div>
					</div>
					<div className="flex justify-between -translate-y-1/2 px-1 sm:px-10">
						<p className="sm:mt-9 mt-4 text-xs sm:text-sm text-blue-700 cursor-pointer">
							<i className="fa-solid fa-upload mr-1"></i>Uplaod Photo
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
