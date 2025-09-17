import { useLayoutEffect } from "react";
import axiosInstance from "./apiConfig";
import Toast from "react-native-toast-message";


export default function InterceptorProvider({ children }) {
    useLayoutEffect(() => {

        let requestInterceptor;
        const token = async () => {
            try {
                requestInterceptor = axiosInstance.interceptors.request.use((config) => {
                    return config;
                });
            } catch (e) {
            }
        };
        token();
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
        };
    }, []);

    useLayoutEffect(() => {
        const responseInter = axiosInstance.interceptors.response.use(config => config, (error) => {
            if (error.status === 423) {
                Toast.show({
                    type: 'error',
                    text1: 'Please Update App',
                    text2: 'Must update app version first'
                });
                return false;
            }
            console.log(error.response);
            return error.response;
        });
        return () => {
            axiosInstance.interceptors.response.eject(responseInter);
        };
    }, []);

    return children;
}