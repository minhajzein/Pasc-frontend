import React from "react";
import { useSelector } from "react-redux";
import { selectNewsById } from "../../../redux/adminApiSlices/adminNewsApiSlice";
import EditNews from "./EditNews";
import DeleteNews from "./DeleteNews";
import moment from "moment";

//======== imports ========================================================================================================================

const NewsRow = ({ newsId, i }) => {
	const news = useSelector(state => selectNewsById(state, newsId));
	if (news) {
		return (
			<tr key={i} className={` ${i % 2 === 0 ? "bg-slate-400" : "bg-none"}`}>
				<td className="p-3 cursor-pointer flex justify-center">
					<img className="h-10 " src={news.image} alt="" />
				</td>
				<td className="p-3 text-center">{news.title}</td>
				<td className="p-3 text-center">{news.category}</td>
				<td className="p-3 text-center">
					{moment(news.createdAt).format("MMM Do YY")}
				</td>
				<td className="p-3 text-center">
					<EditNews newsId={newsId} />
					<DeleteNews newsId={newsId} />
				</td>
			</tr>
		);
	} else return null;
};

export default NewsRow;
