// src/redux/store.js
import { createStore } from "redux";
import rootReducer from "./reducers"; // Create this file later

const store = createStore(rootReducer);

export default store;
