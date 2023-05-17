import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminAuthReq() {
	const location = useLocation();
	const adminToken = useSelector(state => state.adminToken.adminToken);

	return adminToken !== null ? (
		<Outlet />
	) : (
		<Navigate to="/admin/login" state={{ from: location }} replace />
	);
}

export default AdminAuthReq;
