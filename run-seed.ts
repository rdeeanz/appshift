import * as dotenv from 'dotenv'
dotenv.config()
dotenv.config({ path: '.env.local', override: true })
import { seed } from './lib/seed'


seed().then(() => {
  process.exit(0)
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
