import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { useGetEventsQuery } from "../../../redux/userApiSlices/eventApiSlice";
import { motion as m } from "framer-motion";
import EventCard from "./EventCard";

//======================== imports =========================================================================================================================

function Events() {
	const {
		data: events,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetEventsQuery();

	const [searchValue, setSearchValue] = useState("");

	const search = async searchValue => {
		try {
		} catch (error) {
			console.log(error);
		}
	};
	let content;

	if (isLoading) content = <Loading />;

	if (isSuccess) {
		const { ids } = events;
		const cardContent = ids?.length
			? ids.map(eventId => <EventCard key={eventId} eventId={eventId} />)
			: null;
		content = (
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
				</div>{" "}
				<div className="w-full rounded p-2 grid grid-cols-1 lg:grid-cols-2 gap-3">
					{cardContent}
				</div>
			</m.div>
		);
	}
	return content;
}

export default Events;
