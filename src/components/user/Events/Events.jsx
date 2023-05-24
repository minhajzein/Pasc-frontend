import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { useEventsMutation } from "../../../redux/userApiSlices/eventApiSlice";
import { setCredentials } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function Events() {
	const [events, setEvents] = useState(null);
	const dispatch = useDispatch();
	const [getAllEvents, { isLoading }] = useEventsMutation();
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
	console.log(events);
	return isLoading ? (
		<Loading />
	) : (
		<div className="w-full h-screen flex justify-center items-center">
			<h1 className="text-white text-2xl font-bold animate-pulse">
				This is events page
			</h1>
		</div>
	);
}

export default Events;
