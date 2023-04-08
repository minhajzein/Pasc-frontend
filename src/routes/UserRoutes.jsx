import React from "react";
import { Routes, Route } from "react-router-dom";
import Signupuser from "../pages/Signupuser";
import Homepage from "../pages/Homepage";
import Userlogin from "../pages/Userlogin";
import Eventpage from "../pages/Eventpage";
import Newspage from "../pages/Newspage";
import Aboutpage from "../pages/Aboutpage";
import Profilepage from "../pages/Profilepage";

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

			<Route path="accounts" element={<Profilepage />} />
		</Routes>
	);
}

export default UserRoutes;
