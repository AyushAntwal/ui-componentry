import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "./globals.css";
export const metadata = {
  title: "Doc",
  description: "Documentation for UI Componentry",
  icons: {
    icon: "/favicon.ico",
  },
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

const banner = (
  <Banner storageKey="ui-componentry-version">
    UI Componentry v0.1 • Actively maintained
  </Banner>
);
const navbar = (
  <Navbar
    logo={<b>UI Componentry</b>}
    projectLink="https://github.com/AyushAntwal/ui-componentry"
    // ... Your additional navbar options
  />
);
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <Layout
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          banner={banner}
          copyPageButton={false}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/AyushAntwal/ui-componentry/tree/main">
          {children}
        </Layout>
      </body>
    </html>
  );
}
