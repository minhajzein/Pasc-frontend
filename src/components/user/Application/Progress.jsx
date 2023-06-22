import React from "react";

const Progress = () => {
	return (
		<div className="bg-slate-300 p-7 shadow-2xl shadow-black rounded-lg pb-20 flex duration-300 w-[90%] md:w-[70%] lg:w-[50%] justify-center items-center flex-col">
			<h1 className="text-xl font-black uppercase text-violet-700 text-center">
				Your application submission was successful !
			</h1>
			<p className="font-black text-yellow-700 mt-4 text-center">
				Here you can track your application status
			</p>
			<div className="w-[90%] bg-violet-100 shadow-2xl shadow-black rounded-lg mt-10 p-4">
				<p className="uppercase font-light">your application status</p>
				<p className="font-bold mt-2">Review in progress</p>
				<p className="mt-2 font-mono text-sm">
					This will take a while depending your data clarity and availablity of
					validator. Please be patient we will send you validation result as soon as
					possible.
				</p>
				<div className="w-full h-4 md:h-6 bg-violet-300 rounded-full mt-4">
					<div className="w-[50%] h-full bg-violet-900 rounded-full"></div>
				</div>
			</div>
		</div>
	);
};

export default Progress;
