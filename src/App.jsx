import "./App.css";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import { Route, Routes } from "react-router-dom";

//⚡⚡⚡⚡import⚡⚡⚡⚡

function App() {
	return (
		<Routes>
			<Route path="/*" element={<UserRoutes />} />
			<Route path="/admin/*" element={<AdminRoutes />} />
		</Routes>
	);
}
export default App;
