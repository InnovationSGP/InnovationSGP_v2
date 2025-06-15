import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchAPI } from "@/config/api";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});


export async function generateMetadata() {
  const {yoast_head_json} = await fetchAPI({ endpoint: "pages/34" })
  const yoast = yoast_head_json
  return {
    title: yoast.title.replace(/&#0*39;/g, "'"), // decode HTML entity
    description: yoast.og_description, // you can add more if available
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    openGraph: {
      title: yoast.og_title.replace(/&#0*39;/g, "'"),
      url: yoast.og_url,
      siteName: yoast.og_site_name.replace(/&#0*39;/g, "'"),
      type: yoast.og_type,
      locale: yoast.og_locale,
    },
    twitter: {
      card: yoast.twitter_card,
    },
    robots: {
      index: yoast.robots.index === "index",
      follow: yoast.robots.follow === "follow",
      maxSnippet: parseInt(yoast.robots["max-snippet"]?.split(":")[1] ?? "-1"),
      maxImagePreview: yoast.robots["max-image-preview"]?.split(":")[1],
      maxVideoPreview: parseInt(yoast.robots["max-video-preview"]?.split(":")[1] ?? "-1"),
    },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${sora.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
