'use client'

import localFont from 'next/font/local'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import ConfigProvider from 'antd/es/config-provider'
import type { ReactNode } from 'react'

const lineSeedKrBd = localFont({
  src: './fonts/LineSeedKrBd.woff',
  variable: '--font-lineSeedKrBd',
  weight: '700',
  display: 'swap',
})

const lineSeedKrRg = localFont({
  src: './fonts/LineSeedKrRg.woff',
  variable: '--font-lineSeedKrRg',
  weight: '400',
  display: 'swap',
})

const lineSeedKrTh = localFont({
  src: './fonts/LineSeedKrTh.woff',
  variable: '--font-lineSeedKrTh',
  weight: '300',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${lineSeedKrBd.variable} ${lineSeedKrRg.variable} ${lineSeedKrTh.variable} font-lineSeedKrRg`}
      >
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#B39DDB',
                fontFamily: 'var(--font-lineSeedKrRg)', // Ant Design 컴포넌트에 기본 폰트 적용
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
