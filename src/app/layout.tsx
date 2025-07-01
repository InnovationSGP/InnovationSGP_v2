import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";
import "@/styles/wordpress.css"; // Import WordPress global styles
import Header from "@/components/header/header";
import Footer from "@/components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchAPI } from "@/config/api";
import type { Metadata } from "next";
import ClientOnlyLayout from "@/components/client-only-layout";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const parseYoastValue = (val: any) => {
  if (typeof val === "string") {
    const parts = val.split(":");
    return parseInt(parts.length > 1 ? parts[1] : parts[0], 10);
  } else if (typeof val === "number") {
    return val;
  }
  return -1;
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { yoast_head_json } = await fetchAPI({ endpoint: "pages/34" });
    const yoast = yoast_head_json;

    if (!yoast) {
      // Return default metadata directly instead of calling function
      return {
        title: "Innovation Strategy Group",
        description: "Innovation Strategy Group",
        icons: {
          icon: "/images/favicon.png",
        },
      };
    }

    return {
      title: yoast.title.replace(/&#0*39;/g, "'") || "Home - InnovationSGP", // decode HTML entity
      description: yoast.og_description || "Home - InnovationSGP", // you can add more if available
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
        maxSnippet: parseYoastValue(yoast.robots["max-snippet"]),
        maxImagePreview: yoast.robots["max-image-preview"]?.split(":")[1],
        maxVideoPreview: parseInt(
          yoast.robots["max-video-preview"]?.split(":")[1] ?? "-1"
        ),
      } as any,
      icons: {
        icon: "/images/favicon.png", // 👈 Ensure this file exists in /public
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    // Return default metadata directly instead of calling function
    return {
      title: "Innovation Strategy Group",
      description: "Innovation Strategy Group",
      icons: {
        icon: "/images/favicon.png",
      },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${sora.variable} antialiased`}>
        <ClientOnlyLayout>
          <Header />
          {children}
          <Footer />
        </ClientOnlyLayout>
      </body>
    </html>
  );
}
