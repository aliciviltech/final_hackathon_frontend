import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    activeUser: {}
}

const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        storeUser: (state, {payload})=> {state.activeUser = payload},
        clearUser: (state)=> {state.activeUser = {}}
    }
})

export const {storeUser, clearUser} = userSlice.actions;
export default userSlice.reducer;