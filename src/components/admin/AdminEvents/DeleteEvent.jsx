import React from "react";

const DeleteEvent = ({ eventId }) => {
	return (
		<i
			className="fa-solid fa-trash cursor-pointer hover:scale-105 text-red-700 hover:text-gray-600 duration-300"
			title="Delete event"
		></i>
	);
};

export default DeleteEvent;
