import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {todoApi} from "../services/TodoService";

const rootReducer = combineReducers({
    [todoApi.reducerPath]:todoApi.reducer
})

export const setupStore = () =>{
    return configureStore({
        reducer:rootReducer,
        middleware:(getDefaultMiddleware) =>
            getDefaultMiddleware().concat(todoApi.middleware)
    })

}

