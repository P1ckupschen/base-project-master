
import http from '@/utils/request'
import { envUrl } from '@/utils/prod'
// import request from '../../utils/request'

export const isDev = import.meta.env.DEV
export const uploadPdfUrl = import.meta.env.VITE_APP_BASE_API + '/index.php/common/uploadpdf'
// export const uploadFileUrl = envUrl + '/file/increUpload'
export const uploadFileUrl = envUrl + '/file/uploadFile'

export const deleteFile = (params) => {
  console.log('delete server pic', params)
  const url = '/file/deleteFile'
  http.delete(url, { params: params })
}
export function uploadFile() {
}
export const filePublicHost = import.meta.env.VITE_APP_BASE_API
