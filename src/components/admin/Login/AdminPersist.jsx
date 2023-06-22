import React, { useEffect, useRef, useState } from "react";
import useAdminPersist from "../../../hooks/useAdminPersist";
import { useDispatch, useSelector } from "react-redux";
import { useAdminRefreshMutation } from "../../../redux/adminApiSlices/adminAuthApiSlice";
import Loading from "../Loading/Loading";
import { setAdminCredentials } from "../../../redux/adminSlices/adminAuthSlice";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

//⚡⚡⚡⚡⚡ Imports ⚡⚡⚡⚡⚡

const AdminPersist = () => {
	const [adminPersist] = useAdminPersist();
	const adminToken = useSelector(state => state.adminToken.adminToken);

	const [trueAdminPersist, setTrueAdminPersist] = useState(false);
	const effectRan = useRef(false);
	const dispatch = useDispatch();

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
        useAdminRefreshMutation();
    
	useEffect(() => {
		if (effectRan.current === true || process.env.NODE_ENV !== "development") {
			const verifyRefreshToken = async () => {
				try {
					const refreshToken = await refresh();
					if (refreshToken?.data?.adminToken) {
						dispatch(setAdminCredentials(refreshToken.data.adminToken));
						setTrueAdminPersist(true);
					} else {
						toast.error(refreshToken.error.data.message, {
							position: "top-center",
							theme: "colored",
						});
					}
				} catch (error) {
					toast.error("Server not responding", {
						position: "top-center",
						theme: "colored",
					});
				}
			};
			if (!adminToken && adminPersist) verifyRefreshToken();
		}
		const setEffectRan = () => {
			effectRan.current = true;
		};
		return setEffectRan;
	}, []);
	let content;
	if (!adminPersist) {
		content = <Outlet />;
	} else if (isLoading) {
		content = <Loading />;
	} else if (isError) {
		content = <Outlet />;
	} else if (isSuccess && trueAdminPersist) {
		content = <Outlet />;
	} else if (adminToken && isUninitialized) {
		content = <Outlet />;
	}

	return content;
};

export default AdminPersist;
