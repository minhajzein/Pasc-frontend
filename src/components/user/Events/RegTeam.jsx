import React from "react";
import { useSelector } from "react-redux";
import { selectEventById } from "../../../redux/userApiSlices/eventApiSlice";

//============== imports ==================================================================================================================

const RegTeam = ({ eventId }) => {
	const event = useSelector(state => selectEventById(state, eventId));

	if (event) {
		return (
			<button className="bg-emerald-700 p-2 rounded border uppercase text-xs text-white hover:bg-white hover:text-black duration-300 hover:border hover:border-black">
				reg. team
			</button>
		);
	} else return null;
};

export default RegTeam;
