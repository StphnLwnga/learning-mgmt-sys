import { ClerkProvider } from '@clerk/nextjs'; // Authentication provider
import { dark,neobrutalism } from '@clerk/themes';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider" // Shadcn theme provider
import { ModeToggle } from '@/components/ui/mode-toggle';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

/**
 * Render the root layout for the application.
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to render.
 * @return {React.ReactNode} The rendered root layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <ClerkProvider
      // appearance={{
      //   baseTheme: dark
      // }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            {/* <div className='fixed right-28 top-4 z-50'>
              <ModeToggle />
            </div> */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
