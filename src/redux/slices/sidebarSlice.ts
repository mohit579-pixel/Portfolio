import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isSidebarOpen: boolean;
}

const initialState: SidebarState = {
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { toggleSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
