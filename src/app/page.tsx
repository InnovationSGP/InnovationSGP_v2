import HomePageTemplate from "@/template/home-page";
import { WordPressProvider } from "@/providers/WordPressProvider";

export default function Home() {
  return (
    <WordPressProvider>
      <HomePageTemplate />
    </WordPressProvider>
  );
}
