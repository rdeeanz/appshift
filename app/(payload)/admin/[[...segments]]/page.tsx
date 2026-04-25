import { RootPage, generateMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

export { generateMetadata }

const Page = (props: any) => <RootPage {...props} importMap={importMap} />

export default Page
