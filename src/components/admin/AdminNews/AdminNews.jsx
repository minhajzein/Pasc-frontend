import React from "react";
import { motion as m } from "framer-motion";
import { useGetNewsQuery } from "../../../redux/adminApiSlices/adminNewsApiSlice";
import Loading from "../Loading/Loading";
import NewsRow from "./NewsRow";
import AddNews from "./AddNews";

//⚡⚡⚡⚡⚡⚡ imports  ⚡⚡⚡⚡⚡⚡

function AdminNews() {
	const { data: news, isLoading, isSuccess, isError, error } = useGetNewsQuery();

	let content;

	if (isLoading) content = <Loading />;
	if (isSuccess) {
		const { ids } = news;
		const tableContent = ids?.length
			? ids.map((newsId, i) => <NewsRow key={newsId} newsId={newsId} i={i} />)
			: null;
		content = (
			<>
				<m.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					exit={{ opacity: 0 }}
					className="w-full mt-12 md:mt-16"
				>
					<AddNews />
					<div className="w-full p-2">
						<table className="w-full relative bg-slate-300 rounded">
							<thead className="border-b-2 border-black bg-blue-400 table-header-group">
								<tr>
									<th className="p-3  sticky top-0 rounded-tl">Picture</th>
									<th className="p-3  sticky top-0">Title</th>
									<th className="p-3  sticky top-0">Category</th>
									<th className="p-3  sticky top-0">Date</th>
									<th className="p-3  sticky top-0 rounded-tr">Options</th>
								</tr>
							</thead>
							<tbody className="pt-10">{tableContent}</tbody>
						</table>
					</div>
				</m.div>
			</>
		);
	}

	return content;
}

export default AdminNews;
