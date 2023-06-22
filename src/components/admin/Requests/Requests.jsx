import React from "react";
import { motion as m } from "framer-motion";
import { useGetAllRequestsQuery } from "../../../redux/adminApiSlices/requestsApiSlice";
import ReqContent from "./ReqContent";
import Loading from "../Loading/Loading";

//========= imports ======================================================================

const Requests = () => {
	const {
		data: requests,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetAllRequestsQuery();

	let content;

	if (isLoading) content = <Loading />;

	if (isSuccess) {
		const { ids } = requests;
		const tableContent = ids?.length
			? ids.map(reqId => <ReqContent key={reqId} reqId={reqId} />)
			: null;
		return (
			<m.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
				className="w-full flex flex-col mt-12 md:mt-16"
			>
				<div className="w-full p-2">
					<table className="w-full bg-slate-400 rounded">
						<thead className="border-b-2 border-black">
							<tr>
								<th className="p-3 border-r-2 border-black">Picture</th>
								<th className="p-3 border-r-2 border-black">Full Name</th>
								<th className="p-3 border-r-2 border-black">Aadhaar Number</th>
								<th className="p-3 border-r-2 border-black">Recieved On</th>
								<th className="p-3">Options</th>
							</tr>
						</thead>
						<tbody>{tableContent}</tbody>
					</table>
				</div>
			</m.div>
		);
	}

	if (isError) {
		return (
			<div className="mt-12 md:mt-16 p-5  h-40 rounded">
				<div className="bg-gray-400 w-full rounded p-4 h-full flex justify-center items-center">
					<h1 className="font-serif text-lg text-center">No more requests</h1>
				</div>
			</div>
		);
	}

	return content;
};

export default Requests;
