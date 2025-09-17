export const loginUser = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://reqres.in/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (data.token) {
                dispatch({ type: "LOGIN_SUCCESS", payload: data.token });
            } else {
                dispatch({ type: "LOGIN_FAILURE", payload: data.error });

            }
        }
        catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.message });
        }
    };
};