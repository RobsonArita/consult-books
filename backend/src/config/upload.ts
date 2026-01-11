import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { globals } from './globals'

const uploadDir = '/server/uploads'

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

export const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

export const deleteFileByUrl = (fileUrl?: string) => {
  if (!fileUrl) return

  const fileName = fileUrl.replace('/files/', '').replace(globals.URL, '')
  const filePath = path.resolve('/server/uploads', fileName)

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
    console.log(`File deleted: ${filePath}`)
  } else {
    console.log(`File not found, cannot delete: ${filePath}`)
  }
}
