import app from './src/app.js'
import { connectDB } from './src/config/db.js'
import { env } from './src/config/env.js'

connectDB().then(() => {
  app.listen(env.port, () => console.log(`Server running on port ${env.port}`))
})