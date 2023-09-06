import { storage } from 'firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

//single image file upload
export const postContextImage = async (image = null) => {
  let uploadResult = ''

  if (image.name) {
    const storageRef = ref(storage)
    const ext = image.name.split('.').pop()
    const hashName = Math.random().toString(36).slice(-8)
    const fullPath = '/images/' + hashName + '.' + ext
    const uploadRef = ref(storageRef, fullPath)

    // 'file' comes from the Blob or File API
    await uploadBytes(uploadRef, image).then(async function (result) {
      console.log(result)
      console.log('2番目の画像がupされました')

      await getDownloadURL(uploadRef).then(function (url) {
        uploadResult = url
        console.log(uploadResult)
      })
    })
  }
  return uploadResult
}
