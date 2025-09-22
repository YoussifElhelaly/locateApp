import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from 'features/auth/loginUser.js';
import { signUpUser } from 'features/auth/signUpUser.js';
import localStorage from 'utils/localStorageProvider.js';
// Async thunk for login
export const loginUserAsync = createAsyncThunk(
    'auth/login',
    async ({ phone, password }, { rejectWithValue }) => {
        try {
            const response = await loginUser(phone, password);

            if (response.status && response.data) {
                // Store token and user data in AsyncStorage
                await localStorage.setItemObject('authData', {
                    token: response.data.token,
                    user: response.data
                });

                return response.data;
            } else {
                throw new Error(response.msg || 'Login failed');
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.msg || error.message || 'Login failed'
            );
        }
    }
);

// Async thunk for signup
export const signUpUserAsync = createAsyncThunk(
    'auth/signup',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await signUpUser(
                userData.user_type,
                userData.first_name,
                userData.last_name,
                userData.email,
                userData.phone,
                userData.password,
                userData.password_confirmation
            );

            if (response.status && response.data) {
                // Store token and user data in AsyncStorage
                await localStorage.setItemObject('authData', {
                    token: response.data.token,
                    user: response.data
                });

                return response.data;
            } else {
                throw new Error(response.msg || 'Registration failed');
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.errors?.[0] ||
                error.response?.data?.msg ||
                error.message ||
                'Registration failed'
            );
        }
    }
);

// Async thunk for checking existing auth
export const checkAuthAsync = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const authData = await localStorage.getItemObject('authData');

            if (authData && authData.token && authData.user) {
                // Verify token is still valid (optional: make API call to validate)
                return authData;
            } else {
                throw new Error('No valid authentication data found');
            }
        } catch (error) {
            // Clear invalid data
            await localStorage.removeItem('authData');
            return rejectWithValue('No valid authentication found');
        }
    }
);

// Async thunk for logout
export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await localStorage.removeItem('authData');
            return null;
        } catch (error) {
            return rejectWithValue('Logout failed');
        }
    }
);

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false, // Track if auth check is complete
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetAuthState: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUserAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // Signup cases
            .addCase(signUpUserAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signUpUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(signUpUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // Check auth cases
            .addCase(checkAuthAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isInitialized = true;
                state.error = null;
            })
            .addCase(checkAuthAsync.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.isInitialized = true;
                state.user = null;
                state.token = null;
            })

            // Logout cases
            .addCase(logoutAsync.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
            });
    }
});

export const { clearError, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
