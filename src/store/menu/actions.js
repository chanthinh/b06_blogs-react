import { mappingMainMenus } from "../../helpers"
import { menuService } from "../../services/menu"

export const ACT_FETCH_MAIN_MENU = 'ACT_FETCH_MAIN_MENU'

export function actFetchMainMenu(mainMenus) {
    return {
        type: ACT_FETCH_MAIN_MENU,
        payload: { mainMenus }
    }
}

export function actFetchMainMenuAsync() {
    return async dispatch => {
        try {
            const response = await menuService.getAll()
            const mainMenus = response.data.items.map(mappingMainMenus)

            dispatch(actFetchMainMenu(mainMenus))
        } catch (err) {

        }
    }
}

