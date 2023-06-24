import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import ReactCrop, { PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { imgPreview } from "../../../utils/imageCrop";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Accounts() {
	const user = useSelector(state => state.user.value);
	const navigate = useNavigate();
	const [visible, setVisible] = useState(false);
	const [profile, setProfile] = useState(null);
	const profileRef = useRef(null);
	const profileCanvasRef = useRef(null);
	const [croppedProfile, setCroppedProfile] = useState(
		"/images/profile_dummy.jpg"
	);
	const [profileCrop, setProfileCrop] = useState({
		unit: "%",
		x: 50,
		y: 50,
		width: 50,
		height: 50,
	});

	const [coverDialog, setCoverDialog] = useState(false);
	const [cover, setCover] = useState(null);
	const [result, setResult] = useState(null);
	const [coverImage, setCoverImage] = useState("/images/cover_photo.JPG");
	const coverRef = useRef(null);
	const coverCanvasRef = useRef(null);
	const [crop, setCrop] = useState({
		unit: "%",
		width: 100,
		height: 100 / 3,
	});

	const updateProfilePicture = async () => {
		try {
			const profileURL = await imgPreview(
				profileRef.current,
				profileCanvasRef.current,
				croppedProfile,
				1,
				0
			);
			console.log(profileURL);
		} catch (error) {
			console.log(error);
		}
	};

	const updateCoverPhoto = async () => {
		try {
			const imgURL = await imgPreview(
				coverRef.current,
				coverCanvasRef.current,
				coverImage,
				1,
				0
			);
			setResult(imgURL);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<m.div
			initial={{ y: "100%" }}
			animate={{ y: "0%" }}
			exit={{ y: "0%" }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className="w-full h-auto mt-12 md:mt-16 flex flex-col items-center"
		>
			<div className="bg-gray-400 max-w-4xl lg:rounded-xl shadow-2xl w-full lg:mt-3 lg:p-2">
				<div
					className={`h-32 sm:h-64 lg:rounded-xl shadow-2xl bg-cover bg-center relative${
						user.coverPhoto !== null
							? ` bg-[url(${user.coverPhoto})]`
							: ` bg-[url(/images/temprorarry_cover.png)]`
					}`}
				>
					<div className="absolute top-1 right-1">
						<label className="cursor-pointer" onClick={() => setCoverDialog(true)}>
							<i className="fa-solid fa-upload m-1"></i>
						</label>
					</div>
					<Dialog
						className="w-[90%] sm:w-[50%] lg:w-[30%] bg-slate-600"
						header="Change profile picture"
						visible={coverDialog}
						onHide={() => setCoverDialog(false)}
					>
						<div className="w-95% ms:w-1/2 h-auto flex flex-col justify-center items-center">
							<label
								className="uppercase mb-5 text-lg border-2 rounded-xl p-2 font-semibold text-black border-black cursor-pointer hover:text-white hover:bg-black hover:scale-105 duration-300"
								htmlFor="cover"
							>
								Choose image
							</label>
							{cover && (
								<>
									<ReactCrop
										aspect={3 / 1}
										src={cover}
										onComplete={c => setCoverImage(c)}
										crop={crop}
										onChange={setCrop}
									>
										<img src={cover} alt="" ref={coverRef} />
									</ReactCrop>
									<button
										onClick={updateCoverPhoto}
										className="w-1/2 mt-4 uppercase py-1 font-semibold bg-green-500 rounded-2xl hover:scale-105 duration-300 "
									>
										Update
									</button>
								</>
							)}
							<input
								id="cover"
								className="hidden"
								type="file"
								accept="image/*"
								onChange={e => setCover(URL.createObjectURL(e.target.files[0]))}
							/>
						</div>
						<canvas
							className="hidden"
							ref={coverCanvasRef}
							style={{
								border: "1px solid black",
								objectFit: "contain",
								width: coverImage.width,
								height: coverImage.height,
							}}
						/>
					</Dialog>
				</div>
				<div className="w-full flex flex-col relative">
					<div className="w-full flex justify-center items-center py-3">
						<img
							className="w-24 h-auto sm:w-36 object-cover object-center rounded-full border-2 sm:left-10 left-1 absolute sm:-top-1/2 border-green-500 -top-12"
							src={user.avatar !== null ? user.avatar : "/images/profile_dummy.jpg"}
							alt=""
						/>
						{user.type.includes("guest") && (
							<div>
								<button
									onClick={() => navigate("/membership")}
									className="bg-green-600 mt-16 sm:mt-5 rounded-xl px-2 text-xs sm:text-lg uppercase font-semibold h-[0%] hover:scale-105 duration-300 shadow-lg"
								>
									+ membership
								</button>
							</div>
						)}
						{user.type.includes("review") && (
							<div>
								<button
									onClick={() => navigate("/membership")}
									className="bg-orange-800 mt-16 sm:mt-5 rounded-xl px-3 py-1 text-xs sm:text-lg uppercase font-semibold h-[0%] hover:scale-105 duration-300 shadow-lg"
								>
									<i className="fa-solid fa-bars-progress mr-2"></i>
									track request
								</button>
							</div>
						)}
						{user.type.includes("paymentPending") && (
							<div>
								<button
									onClick={() => navigate("/membership")}
									className="bg-blue-500 mt-16 sm:mt-5 rounded-xl px-3 py-1 text-xs sm:text-lg uppercase font-semibold h-[0%] hover:scale-105 duration-300 shadow-lg"
								>
									<i className="fa-brands fa-google-pay mr-1"></i>
									complte payment
								</button>
							</div>
						)}
						<div className="absolute right-3 md:right-8 top-1">
							<h1 className="text-gray-900 text-right text-sm sm:text-md md:text-lg lg:text-2xl uppercase font-black">
								{user.username}
							</h1>
							{user.type.includes("member" || "executive") && (
								<h2 className="text-cyan-700  uppercase font-semibold">{user.type}</h2>
							)}
						</div>
					</div>
					<div className="flex justify-around  pb-5">
						<p
							onClick={() => setVisible(true)}
							className="sm:mt-9 mt-4 text-xs sm:text-smt text-blue-700 cursor-pointer"
						>
							<i className="fa-solid fa-upload mr-1"></i>Channge avatar
						</p>
						<Dialog
							className="w-[90%] sm:w-[50%] lg:w-[30%] bg-slate-600"
							header="Change profile picture"
							visible={visible}
							onHide={() => setVisible(false)}
						>
							<div className="w-95% ms:w-1/2 h-auto flex flex-col justify-center items-center">
								<label
									className="uppercase mb-5 text-lg border-2 rounded-xl p-2 font-semibold text-black border-black cursor-pointer hover:text-white hover:bg-black hover:scale-105 duration-300"
									htmlFor="avatar"
								>
									Choose image
								</label>
								{profile && (
									<div className="w-full flex flex-col justify-center items-center">
										<ReactCrop
											aspect={1 / 1}
											src={profile}
											onComplete={c => setCroppedProfile(c)}
											crop={profileCrop}
											onChange={setProfileCrop}
										>
											<img src={profile} alt="" ref={profileRef} />
										</ReactCrop>
										<button
											onClick={updateProfilePicture}
											className="w-1/2 mt-4 uppercase py-1 font-semibold bg-green-500 rounded-2xl hover:scale-105 duration-300 "
										>
											Update
										</button>
									</div>
								)}
							</div>
							<input
								id="avatar"
								className="hidden"
								type="file"
								accept="image/*"
								onChange={e => setProfile(URL.createObjectURL(e.target.files[0]))}
							/>
							<canvas
								className="hidden"
								style={{
									border: "1px solid black",
									objectFit: "contain",
									width: croppedProfile.width,
									height: croppedProfile.height,
								}}
								ref={profileCanvasRef}
							/>
						</Dialog>
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
		</m.div>
	);
}

export default Accounts;
