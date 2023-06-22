import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginpage from "../pages/admin/AdminLoginpage";
import { Outlet } from "react-router-dom";
import AdminAuthReq from "../components/admin/AdminAuthreq/AdminAuthReq";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminPublic from "../components/admin/public/AdminPublic";
import AdminEventpage from "../pages/admin/AdminEventpage";
import AdminNewspage from "../pages/admin/AdminNewspage";
import AdminUserspage from "../pages/admin/AdminUserspage";
import AdminMemberspage from "../pages/admin/AdminMemberspage";
import RequestsPage from "../pages/admin/RequestsPage";

function AdminRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route element={<AdminPublic />}>
					<Route path="login" element={<AdminLoginpage />} />
				</Route>

				<Route element={<AdminAuthReq />}>
					<Route path="/" element={<AdminHomePage />} />
					<Route path="events" element={<AdminEventpage />} />
					<Route path="news" element={<AdminNewspage />} />
					<Route path="users" element={<AdminUserspage />} />
					<Route path="requests" element={<RequestsPage />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default AdminRoutes;
