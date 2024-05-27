
import http from '@/utils/request'
import { envUrl } from '@/utils/prod'
// import request from '../../utils/request'

export const isDev = import.meta.env.DEV
export const uploadPdfUrl = import.meta.env.VITE_APP_BASE_API + '/index.php/common/uploadpdf'
// export const uploadFileUrl = envUrl + '/file/increUpload'
export const uploadFileUrl = envUrl + '/file/fullUpload'

export const deleteFile = (params) => {
  console.log('delete server pic', params)
  const url = '/index.php/common/deletefile'
  http.delete(url, { data: params })
}
export function uploadFile() {
  console.log('Sdsd')
}
export const filePublicHost = import.meta.env.VITE_APP_BASE_API
