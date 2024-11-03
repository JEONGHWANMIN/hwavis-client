'use client'

import localFont from 'next/font/local'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import ConfigProvider from 'antd/es/config-provider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#B39DDB',
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
