import { ACT_FETCH_ALL_CATEGORIES } from "./actions";

export const initSate = {
    hashCategoryById: {},
    isFetched: false
}

function reducer(categoryState = initSate, action) {
    switch (action.type) {
        case ACT_FETCH_ALL_CATEGORIES:
            return {
                ...categoryState,
                isFetched: true,
                hashCategoryById: action.payload.hashCategoryById
            }
        default:
            return categoryState
    }
}

export default reducer