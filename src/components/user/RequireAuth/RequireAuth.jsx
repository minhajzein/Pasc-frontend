import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireAuth() {
	const location = useLocation()
	const token = useSelector(state => state.auth.token)
	return token !== null ? (
		<Outlet />
	) : (
		<Navigate to='/' state={{ from: location }} replace />
	)
}

export default RequireAuth
