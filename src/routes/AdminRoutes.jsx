import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginpage from "../pages/admin/AdminLoginpage";
import { Outlet } from "react-router-dom";
import AdminPublic from "../components/admin/public/AdminPublic";
import AdminAuthReq from "../components/admin/AdminAuthreq/AdminAuthReq";
import AdminHomePage from "../pages/admin/AdminHomePage";

function AdminRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route element={<AdminPublic />}>
					<Route path="login" element={<AdminLoginpage />} />

					<Route element={<AdminAuthReq />}>
						<Route path="/" element={<AdminHomePage />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default AdminRoutes;
