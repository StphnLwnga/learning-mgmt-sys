import React from 'react';
import { ClerkProvider } from '@clerk/nextjs'; 
import { dark, neobrutalism } from '@clerk/themes';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Locale, i18n } from '@/i18n';
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/toaster";
import ToastProvider from '@/components/providers/toast-provider';
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { LanguageProvider } from '@/components/providers/language-provider';

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LMS Next App',
  description: 'Learning Management System by create next app',
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

/**
 * Render the root layout for the application.
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to render.
 * @return {React.ReactNode} The rendered root layout.
 */
export default function RootLayout({
  children, params,
}: {
  children: React.ReactNode, params: { lang: Locale }
}): React.ReactNode {
  return (
    <ClerkProvider /* appearance={{ baseTheme: dark, }} */>
      <html lang={params.lang} suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <LanguageProvider>
              {React.Children.map(children, (child, i) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, {
                    key: child.props.id || child.props.children,
                  })
                }
              })}
              <ConfettiProvider />
              <Toaster />
              {/* <ToastProvider /> */}
            </LanguageProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
