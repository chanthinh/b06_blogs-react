import { ACT_FETCH_ALL_CATEGORIES } from "./action";

export const initSate = {
    hashCategoryById: {}
}

function reducer(categoryState = initSate, action) {
    switch (action.type) {
        case ACT_FETCH_ALL_CATEGORIES:
            return {
                ...categoryState,
                hashCategoryById: action.payload.hashCategoryById
            }
        default:
            return categoryState
    }
}

export default reducer