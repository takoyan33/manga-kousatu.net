import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from 'firebaseConfig'

//single image file upload
export const postImage = async (image: File | null = null) => {
  let uploadResult: string = ''

  if (image === null) {
    return uploadResult
  } else {
    const storageRef = ref(storage)
    const ext: any = image.name.split('.').pop()
    const hashName: string = Math.random().toString(36).slice(-8)
    const fullPath: string = '/images/' + hashName + '.' + ext
    const uploadRef = ref(storageRef, fullPath)

    // 'file' comes from the Blob or File API
    await uploadBytes(uploadRef, image).then(async function () {
      await getDownloadURL(uploadRef).then(function (url) {
        uploadResult = url
      })
    })
  }
  return uploadResult
}
