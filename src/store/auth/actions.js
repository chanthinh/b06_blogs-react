import { authService } from "../../services/auth"
// Action Types



// Action
export function actLogin() {
    // return {
    //     type: ,
    //     payload: {

    //     }
    // }
}

// Action Async
export function actLoginAsync(username, password) {
    return async dispatch => {
        try {
            const response = await authService.login(username, password)
            const token = response.data.token
            console.log('response', response.data.token)
            return {
                ok: true
            }
        } catch (err) {
            return {
                ok: false,
                error: 'Username hoặc Password không hợp lệ'
            }
        }
    }
}