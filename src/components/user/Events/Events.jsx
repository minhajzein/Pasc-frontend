import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { useEventsMutation } from "../../../redux/userApiSlices/eventApiSlice";
import { setCredentials } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { motion as m } from "framer-motion";
import { Dialog } from "primereact/dialog";

//======================== imports =========================================================================================================================

function Events() {
	const [events, setEvents] = useState(null);
	const [searchValue, setSearchValue] = useState("");
	const [showDescription, setShowDescription] = useState(false);
	const dispatch = useDispatch();
	const [getAllEvents, { isLoading }] = useEventsMutation();
	const [dialogContent, setDialogContent] = useState({});

	const handleSearchChange = e => {
		setSearchValue(e.target.value);
	};

	const search = async searchValue => {
		try {
		} catch (error) {
			console.log(error);
		}
	};

	const allEvents = async () => {
		try {
			const result = await getAllEvents();
			if (result?.data?.success) {
				setEvents(result.data.events);
			} else if (!result?.data?.auth) {
				dispatch(setCredentials({ accessToken: null }));
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		allEvents();
	}, []);

	return isLoading ? (
		<Loading />
	) : (
		<m.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			exit={{ opacity: 0 }}
			className="w-full mt-12 md:mt-16 flex justify-center flex-col items-center"
		>
			<div className="w-full p-2 md:p-3 flex justify-center sticky top-12 md:top-16 items-center">
				<div className="md:w-1/2 w-[95%] relative">
					<input
						placeholder="Search here..."
						name="search"
						className="rounded w-full pr-12 shadow-black shadow-2xl border-2 z-10 border-slate-300"
						type="search"
						value={searchValue}
						onChange={handleSearchChange}
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
			<div className="w-full bg-white rounded p-1 grid grid-cols-1 lg:grid-cols-2 gap-2">
				{events &&
					events.map(obj => {
						return (
							<>
								<div className="border-2 h-full p-2 border-black rounded bg-slate-200">
									<h1 className="text-center lg:text-xl font-bold">{obj.name}</h1>
									<div className="grid grid-cols-1 h-[90%] md:grid-cols-2">
										<div className="flex flex-col justify-between md:p-5">
											<p className="text-left p-4">
												{obj.description.slice(0, 90)}...
												<span
													className="text-blue-600 cursor-pointer"
													onClick={() => {
														setShowDescription(true);
														setDialogContent({
															header: obj.name,
															description: obj.description,
														});
													}}
												>
													more
												</span>
											</p>
											<div className="w-full flex flex-col p-4">
												<h1 className="text-sm text-neutral-700 font-semibold text-center uppercase">
													Available slots
												</h1>
												<div className="w-full flex justify-between">
													<div className="border w-full border-black flex flex-col text-left p-2">
														<h1>Team</h1>
														<h1>Players</h1>
													</div>
													<div className="border w-full border-black flex flex-col text-right p-2">
														<h1>{obj.registereddTeams.length}/12</h1>
														<h1>{obj.registeredIndividuals.length}/72</h1>
													</div>
												</div>
											</div>
											<div className="w-full text-xs flex justify-between font-semibold p-4 text-gray-600">
												<div>
													<h1>Event started on : </h1>
													<h1 className="mt-2">Event ends on :</h1>
												</div>
												<div>
													<h1>{obj.startingDate.slice(0, 10)}</h1>
													<h1 className="mt-2">{obj.endingDate.slice(0, 10)}</h1>
												</div>
											</div>
										</div>
										<div className="h-full p-2 flex flex-col items-center justify-between">
											<img
												className="h-full object-contain rounded"
												src={obj.image}
												alt=""
											/>
											<div className="w-full flex justify-between p-1 text-sm">
												<button className="bg-emerald-700 p-2 rounded border uppercase text-white hover:bg-white hover:text-black duration-300 hover:border hover:border-black">
													register
												</button>
												<button className="bg-emerald-700 p-2 rounded border uppercase text-white hover:bg-white hover:text-black duration-300 hover:border hover:border-black">
													reg. team
												</button>
											</div>
										</div>
									</div>
								</div>
							</>
						);
					})}
			</div>
			<Dialog
				visible={showDescription}
				onHide={() => setShowDescription(false)}
				className="md:w-[50%] w-[95%]"
				header={dialogContent.header}
			>
				{dialogContent.description}
				<div className="w-full flex justify-between p-2">
					<button className="bg-emerald-700 p-2 rounded border uppercase text-xs text-white hover:bg-white hover:text-black duration-300 hover:border hover:border-black">
						register
					</button>
					<button className="bg-emerald-700 p-2 rounded border uppercase text-xs text-white hover:bg-white hover:text-black duration-300 hover:border hover:border-black">
						register team
					</button>
				</div>
			</Dialog>
		</m.div>
	);
}

export default Events;
