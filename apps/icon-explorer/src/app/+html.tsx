import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

/**
 * Custom HTML document for the web build.
 * Sets dark background immediately to prevent flash of white before React hydrates.
 * The inline script is a static string (no user input), safe from XSS.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta
          name="description"
          content="The most complete icon library for React Native. Browse 90,000+ icons across 34 font families."
        />
        <title>RNVI — React Native Vector Icons</title>

        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.style.backgroundColor='#0a0a0b';document.documentElement.style.color='#fafafa';",
          }}
        />

        <ScrollViewStyleReset />
      </head>
      <body style={{ backgroundColor: '#0a0a0b' }}>{children}</body>
    </html>
  );
}
