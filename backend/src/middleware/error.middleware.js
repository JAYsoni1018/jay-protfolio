import multer from 'multer'

export const errorMiddleware = (err, req, res, next) => {
  console.error(err)

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message })
  }

  const status = err.statusCode || 500
  res.status(status).json({
    success: false,
    message: err.message || 'Something went wrong',
  })
}