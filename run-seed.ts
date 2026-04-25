import * as dotenv from 'dotenv'
dotenv.config()
import { seed } from './lib/seed.ts'


seed().then(() => {
  process.exit(0)
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
