import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: null | { id: string; username: string; token: string; role?: string };
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

// Create authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        id: string;
        username: string;
        token: string;
        role?: string;
      }>
    ) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
