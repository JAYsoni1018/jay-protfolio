import cloudinary from '../config/cloudinary.js'

export const streamUpload = (fileBuffer, folder, resourceType = 'image') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: `portfolio/${folder}`, resource_type: resourceType },
      (error, result) => {
        if (result) resolve(result)
        else reject(error)
      }
    )
    uploadStream.end(fileBuffer)
  })
}

export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}