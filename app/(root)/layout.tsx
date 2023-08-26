import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import '../globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Goater',
  description: "Vote for the Goat"
}

/*
 Note! If you do not add suppressHydrationWarning to your <html> you
 will get warnings because next-themes updates that element. 
 This property only applies one level deep, so it won't block 
 hydration warnings on other elements.
*/
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
    </ClerkProvider>
  )
}