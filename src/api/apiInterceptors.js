import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./apiConfig";
import Toast from "react-native-toast-message";
import { logoutAsync } from "redux/authSlice";

export default function InterceptorProvider({ children }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    // Request Interceptor - Add token to headers
    useLayoutEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                // Add token to Authorization header if it exists
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
        };
    }, [token]);

    // Response Interceptor - Handle errors including expired tokens
    useLayoutEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                // Handle app version update required
                if (error.response?.status === 423) {
                    Toast.show({
                        type: 'error',
                        text1: 'Please Update App',
                        text2: 'Must update app version first'
                    });
                    return Promise.reject(error);
                }

                // Handle token expiration or invalid token (401 Unauthorized)
                if (error.response?.status === 401) {
                    Toast.show({
                        type: 'error',
                        text1: 'Session Expired',
                        text2: 'Please login again'
                    });

                    // Dispatch logout action
                    dispatch(logoutAsync());

                    return Promise.reject(error);
                }

                // Handle forbidden access (403)
                if (error.response?.status === 403) {
                    Toast.show({
                        type: 'error',
                        text1: 'Access Denied',
                        text2: 'You do not have permission to access this resource'
                    });
                }

                // Handle server errors (500+)
                if (error.response?.status >= 500) {
                    Toast.show({
                        type: 'error',
                        text1: 'Server Error',
                        text2: 'Something went wrong. Please try again later.'
                    });
                }

                console.log('API Error:', error.response);
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [dispatch]);

    return children;
}
