import React from "react";
import { motion as m } from "framer-motion";
import { useSelector } from "react-redux";
import CreateRequest from "./CreateRequest";
import Progress from "./Progress";
import PendingPayment from "./PendingPayment";

//============ imports =============================================================================================================================================================

const Application = () => {
	const user = useSelector(state => state.user.value);

	let content;

	if (user.type.includes("guest")) content = <CreateRequest user={user} />;

	if (user.type.includes("review")) content = <Progress />;

	if (user.type.includes("paymentPending")) content = <PendingPayment />;

	return (
		<>
			<m.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
				className="w-full h-auto flex flex-col mt-16 md:mt-20 pb-5 justify-center items-center"
			>
				<video
					className="w-full h-screen object-cover object-center -z-50 fixed top-0 left-0"
					playsInline
					muted
					autoPlay
					loop
				>
					<source src="/src/assets/images/background_video.mp4" type="video/mp4" />
				</video>
				{content}
			</m.div>
		</>
	);
};

export default Application;
