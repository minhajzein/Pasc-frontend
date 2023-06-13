import React from "react";
import { useSelector } from "react-redux";
import { selectEventById } from "../../../redux/adminApiSlices/adminEventApiSlice";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import moment from "moment";

//=========== imports =====================================================================================================================

const EventRow = ({ eventId }) => {
	const event = useSelector(state => selectEventById(state, eventId));

	if (event) {
		return (
			<tr className="bg-slate-200 border-b border-black">
				<td className="p-3 cursor-pointer border-r border-black flex justify-center">
					<img className="h-10 " src={event.image} alt="" />
				</td>
				<td className="p-3 border-r border-black text-center">{event.name}</td>
				<td className="p-3 border-r border-black text-center">
					{event.eventFee === 0 ? "Free" : event.eventFee}
				</td>
				<td className="p-3 border-r border-black text-center">
					{moment(event.startingDate).format("MMM Do YYYY")}
				</td>
				<td className="p-3 border-r border-black text-center">
					{moment(event.endingDate).format("MMM Do YYYY")}
				</td>
				<td className="p-3 text-center">
					<EditEvent eventId={eventId} />
					<DeleteEvent eventId={eventId} />
				</td>
			</tr>
		);
	} else return null;
};

export default EventRow;
