<template>
  <div>
    <input type="file" id="fileInput" multiple>
    <button type="button" @click="uploadFile()" >上传</button>
    <div id="progressBar"></div>
    <!-- <iframe src="./test.html"></iframe> -->
  </div>
</template>

<script setup>
import axios from 'axios'
import { getToken } from '@/utils/cookie'
// import crypto from 'crypto'
var fileId = ref('')
var fileName = ref()
var file = ref()
const chunkSize = 1024 * 10 // 每个分片的大小10KB

const uploadFile = async() => {
  var fileInput = document.getElementById('fileInput')
  file = fileInput.files[0]
  fileName = document.getElementById('fileInput').files[0].name
  // 分片上传文件
  const chunks = Math.ceil(file.size / chunkSize)
  for (let i = 0; i < chunks; i++) {
    try {
      await uploadChunk(file, i)
    } catch (error) {
      console.error('Failed to upload chunk', i, error)
      // 如果上传失败，则尝试恢复上传
      try {
        await uploadChunk(file, i)
      } catch (error) {
        console.error('Failed to resume upload', i, error)
        return
      }
    }
  }
  // 合并文件
  try {
    const fileUrl = await mergeFile()
    console.log('File URL:', fileUrl)
  } catch (error) {
    console.error('Failed to merge file', error)
  }
}
const uploadChunk = (file, chunkIndex) => {
  return new Promise((resolve, reject) => {
    const fileTemp = file.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize)
    var myPromise = calculateHash(fileTemp)
    myPromise.then(result => {
      const formData = new FormData()
      formData.append('chunk', fileTemp)
      formData.append('chunkIndex', chunkIndex)
      formData.append('chunkChecksum', result)
      formData.append('chunkSize', chunkSize)
      formData.append('fileId', fileId.value)
      axios.post(import.meta.env.VITE_APP_BASE_API + '/backend/file2/upload', formData,
        {
          headers:
            { 'Content-Type': 'multipart/form-data',
              'Authorization': getToken()
            }
        })
        .then(response => {
          // 请求成功时的处理逻辑
          fileId.value = response.data.data // 假设响应中包含文件 ID
          resolve(response.data.data)
        })
        .catch(error => {
          // 请求失败时的处理逻辑
          reject(error.message)
        })
      //     const xhr = new XMLHttpRequest()
      //     xhr.open('POST', '/hospital/file2/upload', true)

      //     xhr.onload = () => {
      //       if (xhr.status === 200) {
      //         resolve(xhr.response)
      //         fileId = xhr.responseText
      //       } else {
      //         reject(xhr.statusText)
      //       }
      //     }

    //     xhr.onerror = () => {
    //       reject(xhr.statusText)
    //     }
    //   xhr.send(formData)
    })
  })
}

const mergeFile = () => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('fileId', fileId.value)
    formData.append('fileName', fileName)
    axios.post(import.meta.env.VITE_APP_BASE_API + '/backend/file2/merge', formData,
      {
        headers:
          {
            'Content-Type': 'multipart/form-data',
            'Authorization': getToken()
          }
      })
      .then(response => {
        // 请求成功时的处理逻辑
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response.statusText)
          resume(response.data.replace(/\[|]/g, '').split(','))
        }
      })
      .catch(error => {
        // 请求失败时的处理逻辑
        reject(error.message)
      })
    // const xhr = new XMLHttpRequest()
    // xhr.open('POST', '/hospital/file2/merge', true)

    // xhr.onload = () => {
    //   if (xhr.status === 200) {
    //     resolve(xhr.response)
    //   } else {
    //     reject(xhr.statusText)
    //     resume(xhr.response.replace(/\[|]/g, '').split(','))
    //   }
    // }

    // xhr.onerror = () => {
    //   reject(xhr.statusText)
    // }

    // xhr.send(formData)
  })
}
const resume = async(list) => {
  for (let i = 0; i < list.length; i++) {
    try {
      await uploadChunk(file, i)
    } catch (error) {
      console.error('Failed to upload chunk', i, error)
      // 如果上传失败，则尝试恢复上传
      try {
        await uploadChunk(file, i)
      } catch (error) {
        console.error('Failed to resume upload', i, error)
        return
      }
    }
  }
  // 合并文件
  try {
    const fileUrl = await mergeFile()
    console.log('File URL:', fileUrl)
  } catch (error) {
    console.error('Failed to merge file', error)
  }
}

// 计算文件的 SHA-256 校验和
const calculateHash = (fileChunk) => {
  return new Promise((resolve, reject) => {
    const blob = new Blob([fileChunk])
    const reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    reader.onload = () => {
      const arrayBuffer = reader.result
      //   const crypto = window.crypto || window.msCrypto
      const digest = crypto.subtle.digest('SHA-256', arrayBuffer)
      digest.then(hash => {
        const hashArray = Array.from(new Uint8Array(hash))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        resolve(hashHex)
      })
    }
    reader.onerror = () => {
      reject(new Error('Failed to calculate hash'))
    }
  })
}

</script>

<style lang="scss" scoped>

</style>
