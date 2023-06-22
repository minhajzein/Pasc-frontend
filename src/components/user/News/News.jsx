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
				className="w-full mt-24 md:mt-32  flex justify-center flex-row duration-300"
			>
				<div className="w-[24.5%] fixed left-1 h-[70dvh] top-32 mt-2 rounded-lg hidden lg:block bg-white"></div>
				<div className="lg:w-[50%] w-full p-1 duration-300">{newsContent}</div>
				<div className="w-[24.5%] overflow-hidden fixed right-1 h-[70dvh]  top-32 hidden lg:block p-4 hover:overflow-y-scroll bg-white mt-2 rounded-lg">
					<p>
						Where does it come from? Contrary to popular belief, Lorem Ipsum is not
						simply random text. It has roots in a piece of classical Latin literature
						from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
						professor at Hampden-Sydney College in Virginia, looked up one of the more
						obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
						through the cites of the word in classical literature, discovered the
						undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
						"de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
						written in 45 BC. This book is a treatise on the theory of ethics, very
						popular during the Renaissance. The first line of Lorem Ipsum, "Lorem
						ipsum dolor sit amet..", comes from a line in section 1.10.32. The
						standard chunk of Lorem Ipsum used since the 1500s is reproduced below for
						those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
						Malorum" by Cicero are also reproduced in their exact original form,
						accompanied by English versions from the 1914 translation by H. Rackham.
					</p>
				</div>
			</m.div>
		);
	}

	return content;
}

export default News;
