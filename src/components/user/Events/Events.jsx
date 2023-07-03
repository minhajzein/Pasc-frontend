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
				className="w-full mt-24 md:mt-32 flex justify-center flex-col items-center"
			>
				<div className="w-full rounded p-2 grid grid-cols-1 lg:grid-cols-2 gap-3">
					{cardContent}
				</div>
			</m.div>
		);
	}
	return content;
}

export default Events;
