import React from "react";
import { useSelector } from "react-redux";
import {
	selectRequestById,
	useApproveRequestMutation,
} from "../../../redux/adminApiSlices/requestsApiSlice";

//======== imports ===============================================================================

const ApproveReq = ({ reqId }) => {
	const request = useSelector(state => selectRequestById(state, reqId));

	const [approveRequest, { isLoading, isSuccess, isError }] =
		useApproveRequestMutation();

	return isLoading ? (
		<i className="fa-solid fa-spinner fa-spin text-2xl"></i>
	) : (
		<i
			title="Approve"
			onClick={() => approveRequest(request)}
			className="fa-solid fa-circle-check fa-shake text-2xl hover:text-gray-700 duration-300 text-green-600 cursor-pointer"
		></i>
	);
};

export default ApproveReq;
