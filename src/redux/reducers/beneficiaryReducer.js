import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    allBeneficiaries: []
}

const beneficiarySlice = createSlice({
    name: 'beneficiaryReducer',
    initialState,
    reducers: {
        storeAllBeneficiaries: (state, {payload})=> {state.allBeneficiaries = payload},
        addBeneficiaryRedux: (state, {payload})=>{state.allBeneficiaries = [...state.allBeneficiaries, payload]},
        deleteBeneficiary: (state,{payload})=> {state.allBeneficiaries = state.allBeneficiaries.filter((bene)=>bene._id !== payload)},
        editBeneficiary: (state, { payload }) => {
            state.allBeneficiaries = state.allBeneficiaries.map((bene) =>
              bene._id === payload._id ? { ...bene, ...payload.updatedData } : bene
            );
          }
    }
})

export const {storeAllBeneficiaries, deleteBeneficiary, editBeneficiary, addBeneficiaryRedux} = beneficiarySlice.actions;
export default beneficiarySlice.reducer;