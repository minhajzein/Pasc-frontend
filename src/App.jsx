import "./App.css";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

//⚡⚡⚡⚡import⚡⚡⚡⚡

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/*" element={<UserRoutes />} />

				<Route path="/admin/*" element={<AdminRoutes />} />
			</Routes>
		</Router>
	);
}
export default App;
