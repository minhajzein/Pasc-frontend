import React from "react";
import { Routes, Route } from "react-router-dom";
import Signupuser from "../pages/user/Signupuser";
import Homepage from "../pages/user/Homepage";
import Userlogin from "../pages/user/Userlogin";
import Eventpage from "../pages/user/Eventpage";
import Newspage from "../pages/user/Newspage";
import Aboutpage from "../pages/user/Aboutpage";
import Profilepage from "../pages/user/Profilepage";
import RequireAuth from "../components/user/RequireAuth/RequireAuth";
import { Outlet } from "react-router-dom";
import Public from "../components/user/Public/Public";
import ApplicationForm from "../pages/user/ApplicationForm";

//⚡⚡⚡⚡imports⚡⚡⚡⚡

function UserRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				{/*Public routes */}

				<Route element={<Public />}>
					<Route path="login" element={<Userlogin />} />
					<Route path="signup" element={<Signupuser />} />
				</Route>
				{/* Private routes */}

				<Route element={<RequireAuth />}>
					<Route path="/" element={<Homepage />} />
					<Route path="events" element={<Eventpage />} />
					<Route path="news" element={<Newspage />} />
					<Route path="about" element={<Aboutpage />} />
					<Route path="profile" element={<Profilepage />} />
					<Route path="membership" element={<ApplicationForm />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default UserRoutes;
