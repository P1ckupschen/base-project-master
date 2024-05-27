import Cookies from 'js-cookie'

// const TOKEN_KEY = 'ADMIN_TOKEN'
const TOKEN_KEY = 'sys-token'

export const getToken = () => Cookies.get(TOKEN_KEY)

export const setToken = TOKEN => Cookies.set(TOKEN_KEY, TOKEN)

export const removeToken = () => Cookies.remove(TOKEN_KEY)
