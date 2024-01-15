// 判断当前环境
export const whatEnv = () => {
  const httpUrl = 'http://' + window.location.host

  return import.meta.env.VITE_APP_ENV === 'development' ? import.meta.env.VITE_APP_BASE_API : httpUrl
}

export const whatDevTech = () => {
  if (import.meta.env.VITE_APP_DEV_TECH === 'Php') {
    return 'index.php'
  } else if (import.meta.env.VITE_APP_DEV_TECH === 'Java') {
    return ''
  }
}
