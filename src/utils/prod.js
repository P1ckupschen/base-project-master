// 判断当前环境
export const whatEnv = () => {
  const httpUrl = 'http://' + window.location.host

  return import.meta.env.VITE_APP_ENV === 'development' ? import.meta.env.VITE_APP_BASE_API : httpUrl
}
