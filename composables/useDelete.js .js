import Swal from 'sweetalert2';

export function useDelete() {
    const confirmDelete = async (deleteFn, onSuccessCallback = () => {}) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await deleteFn(); // <- call the passed function here
                await Swal.fire("Deleted!", "The item has been deleted.", "success");
                onSuccessCallback();
            } catch (error) {
                console.error(error);
                Swal.fire("Error!", "Something went wrong while deleting.", "error");
            }
        }
    };

    return {
        confirmDelete,
    };
}
