import React from "react";
import { useSelector } from "react-redux";
import { selectRequestById } from "../../../redux/adminApiSlices/requestsApiSlice";
import moment from "moment";
import ApproveReq from "./ApproveReq";
import DeclineReq from "./DeclineReq";

//================ imports =====================================================================

const ReqContent = ({ reqId }) => {
	const request = useSelector(state => selectRequestById(state, reqId));
	if (request) {
		return (
			<tr className="bg-slate-200 border-b border-black">
				<td className="p-3 cursor-pointer border-r border-black flex justify-center">
					<img
						className="h-10 rounded-lg object-contain object-center"
						src={request.image}
						alt=""
					/>
				</td>
				<td className="p-3 border-r border-black text-center">
					{request.firstName + " " + request.lastName}
				</td>
				<td className="p-3 border-r border-black text-center">
					{request.adNumber}
				</td>
				<td className="p-3 border-r border-black text-center">
					{moment(request.createdAt).format("MMM Do YYYY")}
				</td>
				<td className="p-3 text-center">
					{request.status === "paymentPending" ? (
						<i
							title="Pending"
							className="fa-sharp fa-solid fa-sack-dollar fa-flip text-2xl text-orange-600"
						></i>
					) : (
						<>
							<ApproveReq reqId={reqId} />
							<DeclineReq reqId={reqId} />
						</>
					)}
				</td>
			</tr>
		);
	} else return null;
};

export default ReqContent;
