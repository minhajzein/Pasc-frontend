import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function Loading() {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);
	return loading ? (
		<div className="w-full bg-[#333333] h-screen flex justify-center items-center">
			<img
				src="/src/assets/images/Soccer-Ball-Hexagon-Pattern-Loader.gif"
				alt="Loading"
			/>
		</div>
	) : (
		<Outlet />
	);
}

export default Loading;
