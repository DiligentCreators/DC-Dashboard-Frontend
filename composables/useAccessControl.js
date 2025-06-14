export const useAccessControl = () => {
    const auth = useAuthStore()

    const hasRole = (role) => {
        return auth.user?.data?.roles?.includes(role) ?? false
    }

    const hasAnyRole = (roles = []) => {
        return roles.some((r) => hasRole(r))
    }

    const hasPermission = (permission) => {
        return auth.user?.data?.permissions?.includes(permission) ?? false
    }

    const hasAnyPermission = (permissions = []) => {
        return permissions.some((p) => hasPermission(p))
    }

    return {
        hasRole,
        hasAnyRole,
        hasPermission,
        hasAnyPermission
    }
}
