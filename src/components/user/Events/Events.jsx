import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { useEventsMutation } from "../../../redux/userApiSlices/eventApiSlice";
import { setCredentials } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { motion as m } from "framer-motion";
import Search from "../SearchComponent/Search";

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
	return isLoading ? (
		<Loading />
	) : (
		<m.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			exit={{ opacity: 0 }}
			className="w-full mt-12 md:mt-16  flex justify-center flex-col items-center"
		>
			<Search />
			<h1 className="text-white text-2xl font-bold animate-pulse">
				This is events page
			</h1>
		</m.div>
	);
}

export default Events;
