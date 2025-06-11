
export function useMyToast() {
    const toast = useToast()

    const success = (message) =>
        toast.add({
            title: 'Success',
            description: message,
            color: 'green',
            icon: 'i-heroicons-check-circle',
        })

    const error = (message) =>
        toast.add({
            title: 'Error',
            description: message,
            color: 'red',
            icon: 'i-heroicons-exclamation-circle',
        })

    const warning = (message) =>
        toast.add({
            title: 'Warning',
            description: message,
            color: 'yellow',
            icon: 'i-heroicons-exclamation-triangle',
        })

    const loading = (message) =>
        toast.add({
            title: 'Loading',
            description: message,
            color: 'blue',
            icon: 'i-heroicons-arrow-path',
            timeout: 9999, // stays until manually removed
        })

    return { success, error, warning, loading }
}
