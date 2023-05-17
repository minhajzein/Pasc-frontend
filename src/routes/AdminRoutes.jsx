import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginpage from "../pages/admin/AdminLoginpage";
import { Outlet } from "react-router-dom";
import AdminAuthReq from "../components/admin/AdminAuthreq/AdminAuthReq";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminPublic from "../components/admin/public/AdminPublic";

function AdminRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route element={<AdminPublic />}>
					<Route path="login" element={<AdminLoginpage />} />
				</Route>

				<Route element={<AdminAuthReq />}>
					<Route path="/" element={<AdminHomePage />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default AdminRoutes;
