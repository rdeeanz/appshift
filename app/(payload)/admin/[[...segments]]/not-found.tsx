import { NotFoundPage } from '@payloadcms/next/views'
import configPromise from '../../../../payload.config'
import { importMap } from '../importMap.js'

const NotFound = (props: any) => (
  <NotFoundPage {...props} config={configPromise} importMap={importMap} />
)

export default NotFound
