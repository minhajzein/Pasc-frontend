import { useAdminDeleteEventMutation } from '../../../redux/adminApiSlices/adminEventApiSlice'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2/dist/sweetalert2.all'

//============= imports ===============================================================================================================

const DeleteEvent = ({ eventId }) => {
	const [deleteEvent, { isLoading }] = useAdminDeleteEventMutation()

	const handleDelete = async () => {
		try {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
			}).then(async result => {
				if (result.isConfirmed) {
					const result = await deleteEvent({ eventId })
					if (result.data.success) {
						toast.success('Event deleted successfully', {
							position: 'top-center',
							theme: 'colored',
						})
					} else {
						toast.error('Something went wrong', {
							position: 'top-center',
							theme: 'colored',
						})
					}
				}
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{isLoading ? (
				<i className='fa-solid fa-spinner animate-spin cursor-wait'></i>
			) : (
				<i
					className='fa-solid fa-trash cursor-pointer hover:scale-105 text-red-700 hover:text-gray-600 duration-300'
					title='Delete event'
					onClick={handleDelete}
				></i>
			)}
		</>
	)
}

export default DeleteEvent
