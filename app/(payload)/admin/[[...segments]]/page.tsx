import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import configPromise from '../../../../payload.config'
import { importMap } from '../importMap.js'

export const generateMetadata = (props: any) =>
  generatePageMetadata({ ...props, config: configPromise })

const Page = (props: any) => (
  <RootPage {...props} config={configPromise} importMap={importMap} />
)

export default Page
