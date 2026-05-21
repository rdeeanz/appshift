import { getPayload } from 'payload'
import configPromise from './payload.config'

async function checkUser() {
  const payload = await getPayload({ config: configPromise })
  const users = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@appshift.io'
      }
    }
  })
  console.log('Users found:', users.totalDocs)
  if (users.totalDocs > 0) {
    console.log('User email:', users.docs[0].email)
  }
  process.exit(0)
}

checkUser()
