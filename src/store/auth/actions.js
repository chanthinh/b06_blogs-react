import { ACCESS_TOKEN, MESSAGE_FORM_ERROR } from "../../constants"
import { mappingCurrentUser } from "../../helpers"
import { authService } from "../../services/auth"
// Action Types
export const ACT_LOGIN_SUCCESS = 'ACT_LOGIN_SUCCESS'
export const ACT_LOGOUT = 'ACT_LOGOUT'


// Action
export function actLoginSuccess({ user, token }) {
    return {
        type: ACT_LOGIN_SUCCESS,
        payload: {
            user,
            token
        }
    }
}

export function actLogout() {
    return {
        type: ACT_LOGOUT
    }
}

// Action Async
export function actFetchMeAsync(token) {
    return async dispatch => {
        if (token === undefined) {
            token = localStorage.getItem(ACCESS_TOKEN)
        }
        try {
            const response = await authService.fetchMe(token)
            const user = mappingCurrentUser(response.data)
            dispatch(actLoginSuccess({ user, token }))
            return {
                ok: true
            }
        } catch (err) {
            dispatch(actLogout())
            return {
                ok: false,
                error: 'Username hoặc Password không hợp lệ'
            }
        }
    }
}

export function actLoginAsync(username, password) {
    return async dispatch => {
        try {
            const response = await authService.login(username, password)
            const token = response.data.token
            const responseMe = await dispatch(actFetchMeAsync(token))

            return {
                ok: responseMe.ok,
                error: responseMe.error
            }
        } catch (err) {
            return {
                ok: false,
                error: 'Username hoặc Password không hợp lệ'
            }
        }
    }
}

export function actRegisterAsync({
    email,
    username,
    password,
    nickname
}) {
    return async dispatch => {
        try {
            const response = await authService.register({
                email,
                username,
                password,
                nickname
            })
            const responseLogin = await dispatch(actLoginAsync(username, password))

            if (responseLogin.ok) {
                return { ok: true }
            }

            throw new Error(MESSAGE_FORM_ERROR.default)

        } catch (err) {
            let errorMessage = MESSAGE_FORM_ERROR.default
            if (err.response && err.response.data && err.response.data.code) {
                const errorCode = err.response.data.code
                if (MESSAGE_FORM_ERROR[errorCode]) {
                    errorMessage = MESSAGE_FORM_ERROR[errorCode]
                }
            }
            return {
                ok: false,
                error: errorMessage
            }
        }
    }
}