import { api } from './api'

export const authService = {
    login(username, password) {
        return api.call().post('/jwt-auth/v1/token', {
            username,
            password
        })
    },
    fetchMe(token) {
        return api.call().get('/wp/v2/users/me', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    },
    register({
        email,
        username,
        password,
        nickname
    }) {
        return api.call().post('/wp/v2/users/register',{
            email,
            username,
            password,
            nickname
        })
    },
}