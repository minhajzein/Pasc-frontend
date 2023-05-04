import React from "react";
import { Routes, Route } from "react-router-dom";
import Signupuser from "../pages/user/Signupuser";
import Homepage from "../pages/user/Homepage";
import Userlogin from "../pages/user/Userlogin";
import Eventpage from "../pages/user/Eventpage";
import Newspage from "../pages/user/Newspage";
import Aboutpage from "../pages/user/Aboutpage";
import Profilepage from "../pages/user/Profilepage";

//⚡⚡⚡⚡imports⚡⚡⚡⚡

function UserRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />

			<Route path="/login" element={<Userlogin />} />

			<Route path="/signup" element={<Signupuser />} />

			<Route path="/events" element={<Eventpage />} />

			<Route path="/news" element={<Newspage />} />

			<Route path="/about" element={<Aboutpage />} />

			<Route path="/accounts" element={<Profilepage />} />
		</Routes>
	);
}

export default UserRoutes;
