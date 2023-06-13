import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import Loading from "../Loading/Loading";
import { useAdminGetEventsQuery } from "../../../redux/adminApiSlices/adminEventApiSlice";
import EventRow from "./EventRow";
import AddEvent from "./AddEvent";

//=================== imports ======================================================================

function AdminEvents() {
	const {
		data: events,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useAdminGetEventsQuery();

	let content;

	if (isSuccess) {
		const { ids } = events;
		const tableContent = ids?.length
			? ids.map(eventId => <EventRow key={eventId} eventId={eventId} />)
			: null;
		content = (
			<m.div
				className="w-full mt-12 md:mt-16"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				exit={{ opacity: 0 }}
			>
				<div className="w-full p-2">
					<table className="w-full bg-slate-400 rounded">
						<thead className="border-b-2 border-black">
							<tr>
								<th className="p-3 border-r-2 border-black">Picture</th>
								<th className="p-3 border-r-2 border-black">Name</th>
								<th className="p-3 border-r-2 border-black">Reg.fee</th>
								<th className="p-3 border-r-2 border-black">Starting Date</th>
								<th className="p-3 border-r-2 border-black">Ending Date</th>
								<th className="p-3">Options</th>
							</tr>
						</thead>
						<tbody>{tableContent}</tbody>
					</table>
				</div>
			</m.div>
		);
	}

	return isLoading ? (
		<Loading />
	) : (
		<>
			{content}
			<AddEvent />
		</>
	);
}

export default AdminEvents;
