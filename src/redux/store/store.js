import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from '../reducers/userReducer'
import beneficiaryReducer from '../reducers/beneficiaryReducer'
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";


const persistConfig = {
    key: "root",
    storage,
};

// Combine all reducers
const rootReducer = combineReducers({
    user: userReducer,
    beneficiary: beneficiaryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer:  persistedReducer,
})

const persistor = persistStore(store);
export { store, persistor }