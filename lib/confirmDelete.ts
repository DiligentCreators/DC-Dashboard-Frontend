// lib/confirmDelete.ts
import Swal from 'sweetalert2'

export const confirmDelete = async (itemName = 'this item') => {
  const result = await Swal.fire({
    title: `Are you sure?`,
    text: `You won't be able to revert deleting ${itemName}!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  })

  return result.isConfirmed
}
