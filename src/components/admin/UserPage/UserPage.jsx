import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUsersById } from "../../../redux/adminApiSlices/usersApiSlice";

//=========== imports =================================================================================================================

const UserPage = ({ userId }) => {
	const user = useSelector(state => selectUsersById(state, userId));
	const navigate = useNavigate();

	if (user) {
		const handleEdit = () => navigate(`/users/${userId}`);
		return (
			<tr>
				<td>{user.username}</td>
				<td>{user.userType}</td>
				<td>
					<button className="p-2">
						<i
							className={`${
								user.isBanned ? "fa-solid fa-user-unlock" : "fa-regular fa-ban"
							}`}
						></i>
					</button>
				</td>
			</tr>
		);
	} else return null;
};

export default UserPage;
