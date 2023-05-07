import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginpage from "../pages/admin/AdminLoginpage";
import { Outlet } from "react-router-dom";

function AdminRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route path="login" element={<AdminLoginpage />} />
			</Route>
		</Routes>
	);
}

export default AdminRoutes;
