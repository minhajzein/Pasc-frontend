import React, { useState } from "react";
import { motion as m } from "framer-motion";
import { useGetNewsQuery } from "../../../redux/userApiSlices/newsApiSlice";
import Loading from "../Loading/Loading";
import NewsContent from "./NewsContent";

//============ imports ================================================================================================================

function News() {
	const { data: news, isLoading, isSuccess, isError, error } = useGetNewsQuery();

	let content;

	if (isLoading) content = <Loading />;

	if (isSuccess) {
		const { ids } = news;
		const newsContent = ids?.length
			? ids.map((newsId, i) => <NewsContent key={newsId} newsId={newsId} i={i} />)
			: null;
		content = (
			<m.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				exit={{ opacity: 0 }}
				className="w-full mt-28 md:mt-32 flex justify-center flex-row items-center duration-300"
			>
				<div className="lg:w-[50%] w-full p-1 duration-300">{newsContent}</div>
			</m.div>
		);
	}

	return content;
}

export default News;
