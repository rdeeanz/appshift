import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import configPromise from '../../payload.config.ts'
import { importMap } from './admin/importMap.js'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout config={configPromise} importMap={importMap}>
    {children}
  </RootLayout>
)

export default Layout
