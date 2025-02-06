import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    activeUser: {},
    userRole:'receptionist'
}

const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        storeUser: (state, {payload})=> {state.activeUser = payload},
        clearUser: (state)=> {state.activeUser = {}},
        storeUserRole: (state, {payload})=>{state.userRole = payload}
    }
})

export const {storeUser, clearUser,storeUserRole} = userSlice.actions;
export default userSlice.reducer;