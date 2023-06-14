import { createSlice } from '@reduxjs/toolkit'

interface ui {
  drawerOpen: boolean
  overlayHidden: boolean
}

const uiInitialState: ui = {
  drawerOpen: false,
  overlayHidden: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: uiInitialState,
  reducers: {
    showDrawer: (state, action) => {
      state.drawerOpen = action.payload
    },
    showOverlay: (state, action) => {
      state.overlayHidden = action.payload
    },
  },
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer
