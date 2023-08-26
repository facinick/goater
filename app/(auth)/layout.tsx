import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import '../globals.css'
import { Providers } from './providers'

export const metadata = {
    title: 'Goater',
    description: "Vote for the Goat"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider appearance={{
            baseTheme: dark
        }}>
            <html suppressHydrationWarning>
                <head />
                <body>
                    <Providers>{children}</Providers>
                </body>
            </html>
        </ClerkProvider>)
}