import React from "react";

function Loading() {
	return (
		<div className="w-full bg-[#333333] h-screen flex justify-center items-center">
			<img
				src="/images/Soccer-Ball-Hexagon-Pattern-Loader.gif"
				className="w-1/4"
				alt="Loading"
			/>
		</div>
	);
}

export default Loading;
