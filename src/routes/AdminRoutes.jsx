import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginpage from "../pages/admin/AdminLoginpage";
import Layout from "../components/Layout";

function AdminRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="login" element={<AdminLoginpage />} />
			</Route>
		</Routes>
	);
}

export default AdminRoutes;
