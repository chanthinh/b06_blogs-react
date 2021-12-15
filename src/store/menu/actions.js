import { menuService } from "../../services/menu"

export function actFetchMainMenuAsync() {
    return async dispatch => {
        try {
            const response = await menuService.getAll()
            const mainMenus = response.data.items.map(menuItem => {
                const data = {
                    id: menuItem.ID,
                    url:menuItem.url,
                    title: menuItem.title,
                    childItems: menuItem.child_items || []
                }

                data.childItems = data.childItems.map(menuChildItem=>{
                    const data = {
                        id: menuChildItem.ID,
                        url:menuChildItem.url,
                        title: menuChildItem.title,
                        childItems: menuChildItem.menuChildItem || []
                    }
                    return data
                })

                return data
            })
            console.log('mainMenus', mainMenus)
        } catch (err) {

        }
    }
}

