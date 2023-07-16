import React, { useRef } from "react";
import { motion as m } from "framer-motion";
import { Opacity } from "@mui/icons-material";

//=====================  imports  ===========================================================================================================================================================

function Home() {
	return (
		<>
			<m.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
				className="w-full h-auto"
			>
				<div className="w-full h-screen absolute -z-10 top-0 bg-cover bg-center left-0 bg-[url('/images/home-wallpaper.jpg')]"></div>
				<div className="w-full mt-12 md:mt-16 flex justify-center items-center"></div>
			</m.div>
		</>
	);
}

export default Home;
