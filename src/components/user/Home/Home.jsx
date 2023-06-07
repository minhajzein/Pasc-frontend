import React, { useRef } from "react";

function Home() {
	return (
		<>
			<div className="w-full h-screen absolute -z-10 top-0 bg-cover bg-center left-0 bg-[url('/src/assets/images/home-wallpaper.jpg')]"></div>
			<div className="w-full mt-12 md:mt-16 flex justify-center items-center"></div>
		</>
	);
}

export default Home;
