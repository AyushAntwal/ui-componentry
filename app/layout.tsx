import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "./globals.css";
export const metadata = {
  title: "Doc",
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

const banner = <Banner storageKey="some-key">New Doc released 🎉</Banner>;
const navbar = (
  <Navbar
    logo={<b>UI Componentry</b>}

    // ... Your additional navbar options
  />
);
const footer = <Footer>MIT {new Date().getFullYear()} © Ayush.</Footer>;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <Layout
          banner={banner}
          copyPageButton={false}
          navbar={navbar}
          pageMap={await getPageMap()}
          // docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
