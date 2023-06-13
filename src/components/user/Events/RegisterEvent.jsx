import React from "react";
import { useSelector } from "react-redux";
import { selectEventById } from "../../../redux/userApiSlices/eventApiSlice";

const RegisterEvent = ({ eventId }) => {
	const event = useSelector(state => selectEventById(state, eventId));
	if (event) {
		return (
			<button className="bg-emerald-700 p-2 rounded border uppercase text-xs text-white hover:bg-white hover:text-black duration-300 hover:border hover:border-black">
				register
			</button>
		);
	} else return null;
};

export default RegisterEvent;
