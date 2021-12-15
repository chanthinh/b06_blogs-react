import { ACT_FETCH_MAIN_MENU } from "./actions";

const initState = {
    mainMenus: []
}

function reducer(menuState = initState, action) {
    switch (action.type) {
        case ACT_FETCH_MAIN_MENU:
            return {
                ...menuState,
                mainMenus: action.payload.mainMenus //action.payload. tiếp tới cái gì thì phải phụ thuộc vào action
            }
        default:
            return menuState
    }
}

export default reducer