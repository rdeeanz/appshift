import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'
import configPromise from '../../payload.config'
import { importMap } from './admin/importMap.js'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout
    config={configPromise}
    importMap={importMap}
    serverFunction={handleServerFunctions}
  >
    {children}
  </RootLayout>
)

export default Layout
