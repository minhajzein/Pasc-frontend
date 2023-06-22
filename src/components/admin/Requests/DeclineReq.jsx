import React from "react";
import { useSelector } from "react-redux";
import { selectRequestById } from "../../../redux/adminApiSlices/requestsApiSlice";

function DeclineReq({ reqId }) {
    const request = useSelector(state => selectRequestById(state, reqId));
    
	return (
		<i className="fa-solid fa-circle-xmark fa-shake ml-2 cursor-pointer text-red-600 text-2xl"></i>
	);
}

export default DeclineReq;
