import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useBanUnbanUserMutation } from "../../../redux/adminApiSlices/usersApiSlice";
import { selectUsersById } from "../../../redux/adminApiSlices/usersApiSlice";
import { toast } from "react-toastify";

//================================ imports =================================================================================

const UserRow = ({ userId }) => {
	const user = useSelector(state => selectUsersById(state, userId));

    const [banOrUnban, { isLoading }] = useBanUnbanUserMutation();
    
	const changeStatus = async () => {
		try {
			const result = await banOrUnban(userId);
			if (result.data?.success) {
				if (!user.isBanned) {
					toast.error(user.username + " is blocked", {
						position: "top-center",
						theme: "colored",
					});
				} else {
					toast.success(user.username + " is unlocked", {
						position: "top-center",
						theme: "colored",
					});
				}
			} else {
				toast.error(result.err_msg, {
					position: "top-center",
					theme: "colored",
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	if (user) {
		return (
			<tr className="text-center border border-black">
				<td className="py-2 flex justify-center items-center border-r border-black">
					<img
						src={user.avatar ? user.avatar : "/src/assets/images/profile_dummy.jpg"}
						className={`h-12 cursor-pointer rounded-full border-2 ${
							user.isBanned ? "border-red-600" : "border-green-600"
						}`}
						alt=""
					/>
				</td>
				<td className="py-2 border-r border-black">{user.username}</td>
				<td className="py-2 border-r border-black">
					{user.type}

					<i
						className="fa-solid fa-pen-to-square cursor-pointer ml-2  text-gray-700"
						title="Add role"
					></i>
				</td>
				<td className="py-2">
					<button className="p-2 text-xl">
						<i
							className={` ${
								isLoading
									? "fa-solid fa-spinner animate-spin"
									: `${
											user.isBanned
												? "fa-solid fa-unlock text-green-600"
												: "fa-sharp fa-solid fa-ban text-red-600"
									  }`
							}`}
							onClick={changeStatus}
							title={user.isBanned ? "Unban" : "Ban"}
						></i>
					</button>
				</td>
			</tr>
		);
	} else return null;
};

export default UserRow;
