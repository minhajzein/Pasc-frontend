import React from "react";
import { useSelector } from "react-redux";
import { selectNewsById } from "../../../redux/userApiSlices/newsApiSlice";
import moment from "moment";

const NewsContent = ({ newsId, i }) => {
	const news = useSelector(state => selectNewsById(state, newsId));
	if (news) {
		if (i % 2 === 0) {
			return (
				<div className="bg-white rounded-lg mt-1 p-1">
					<h1 className="text-2xl font-bold mt-1 ml-2 text-center">{news.title}</h1>
					<div className="w-full   p-2 grid grid-cols-1 md:grid-cols-2 ">
						<div className="w-full">
							<img
								src={news.image}
								className="object-contain object-center h-full rounded"
								alt=""
							/>
						</div>
						<div className="p-2 flex flex-col justify-between items-center">
							<p className="mt-1 p-2">
								{news.description.slice(0, 180)}
								<span className="text-blue-500 text-xl">...</span>
							</p>
							<div className="flex justify-between items-center  px-6 w-full">
								<i
									className="fa-solid fa-magnifying-glass-plus cursor-zoom-in hover:text-gray-600"
									title="expand"
								></i>
								<p className="text-gray-700 font-thin text-sm">
									{moment(news.createdAt).calendar()}
								</p>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="bg-white rounded-lg mt-1 p-1">
					<h1 className="text-2xl font-bold mt-1 ml-2 text-center">{news.title}</h1>
					<div className="w-full   p-2 grid grid-cols-1 md:grid-cols-2 ">
						<div className="p-2 flex flex-col justify-between items-center">
							<p className="mt-1 p-2">
								{news.description.slice(0, 180)}
								<span className="text-blue-500 text-xl">...</span>
							</p>
							<div className="flex justify-between items-center  px-6 w-full">
								<i
									className="fa-solid fa-magnifying-glass-plus cursor-zoom-in hover:text-gray-600"
									title="expand"
								></i>
								<p className="text-gray-700 font-thin text-sm">
									{moment(news.createdAt).calendar()}
								</p>
							</div>
						</div>
						<div className="w-full">
							<img
								src={news.image}
								className="object-contain object-center h-full rounded"
								alt=""
							/>
						</div>
					</div>
				</div>
			);
		}
	}
	return null;
};

export default NewsContent;
