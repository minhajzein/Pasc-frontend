import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useRefreshMutation } from "../../../redux/userApiSlices/authApiSlice";
import usePersist from "../../../hooks/usePersist";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../../redux/slices/authSlice";
import { setUserdata } from "../../../redux/slices/userSlice";
import Loading from "../Loading/Loading";

//⚡⚡⚡⚡⚡ Imports ⚡⚡⚡⚡⚡

const PersistLoginComp = () => {
	const [persist] = usePersist();
	const token = useSelector(selectCurrentToken);
	const [truePersist, setTruePersist] = useState(false);
	const effectRan = useRef(false);
	const dispatch = useDispatch();

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation();
	useEffect(() => {
		if (effectRan.current === true || process.env.NODE_ENV !== "development") {
			const verifyRefreshToken = async () => {
				try {
					const refreshtoken = await refresh();
					dispatch(setUserdata(refreshtoken.data.user));
					setTruePersist(true);
				} catch (error) {
					console.log(error);
				}
			};
			if (!token && persist) verifyRefreshToken();
		}
		const setEffectRan = () => {
			effectRan.current = true;
		};

		return setEffectRan;
	}, []);

	let content;
	if (!persist) {
		content = <Outlet />;
	} else if (isLoading) {
		content = <Loading />;
	} else if (isError) {
		content = <Outlet />;
	} else if (isSuccess && truePersist) {
		content = <Outlet />;
	} else if (token && isUninitialized) {
		content = <Outlet />;
	}

	return content;
};

export default PersistLoginComp;
