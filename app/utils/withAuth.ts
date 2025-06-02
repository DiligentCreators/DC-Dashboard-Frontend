// // utils/withAuth.ts
// import { GetServerSidePropsContext } from 'next'
// import { getCookie } from 'cookies-next'
// import API from '@/lib/api'
// import { UserType } from '@/app/types/UserType'
//
// export const getServerAuth = async (context: GetServerSidePropsContext) => {
//   try {
//     // Get token from cookies (you might want to use httpOnly cookies for better security)
//     const token = getCookie('token', { req: context.req, res: context.res })
//
//     if (!token) {
//       return { user: null }
//     }
//
//     // Set the token for the API client
//     API.defaults.headers.common['Authorization'] = `Bearer ${token}`
//
//     // Fetch user data
//     const response = await API.get<{ data: UserType }>('/user')
//     return { user: response.data.data }
//   } catch (error) {
//     return { user: null }
//   }
// }