import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginpage from "../pages/admin/AdminLoginpage";

function AdminRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<AdminLoginpage />} />
		</Routes>
	);
}

export default AdminRoutes;
