import { createStore } from "redux";
import data from './warehouse.json';

const ADD_WAREHOUSE_DATA = "ADD_WAREHOUSE_DATA";
const UPDATE_WAREHOUSE_DATA = "UPDATE_WAREHOUSE_DATA";

const initialData = data;

function warehouseReducer(state = initialData, action) {
    switch (action.type) {
        case ADD_WAREHOUSE_DATA:
            return [...state, action.value];
        case UPDATE_WAREHOUSE_DATA:
            let index = state.findIndex(item => item.id == action.value.id);
            if (index >= 0) state[index] = action.value;
            return [...state]
        default:
            return state
    }
}

export function addWarehouse(data) {
    return { type: ADD_WAREHOUSE_DATA, value: data }
}

export function updateWarehouse(data) {
    return { type: UPDATE_WAREHOUSE_DATA, value: data }
}

const store = createStore(warehouseReducer);
export default store;