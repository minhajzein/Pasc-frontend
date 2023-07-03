import React from "react";
import { useSelector } from "react-redux";
import { selectEventById } from "../../../redux/userApiSlices/eventApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterEvent = ({ eventId }) => {
	const event = useSelector(state => selectEventById(state, eventId));

	const user = useSelector(state => state.user.value);

	const navigate = useNavigate();

	const registerEvent = async () => {
		try {
			if (user.type.includes("member")) {
			} else {
				toast.error(
					"You don't have membership in club, please complete processes",
					{
						position: "top-center",
						theme: "colored",
					}
				);
				navigate("/membership");
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (event) {
		return (
			<button
				onClick={registerEvent}
				className="bg-emerald-700 p-2 rounded border uppercase text-xs text-white hover:bg-white hover:text-black duration-300 hover:border hover:border-black"
			>
				register
			</button>
		);
	} else return null;
};

export default RegisterEvent;
