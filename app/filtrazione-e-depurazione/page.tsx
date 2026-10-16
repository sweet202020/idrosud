import { SectorPage } from "@/components/sector-page";
import { sectors } from "@/content/site";
export const metadata = {
  alternates: { canonical: "/filtrazione-e-depurazione" },
  title: "Filtrazione e depurazione",
  description: sectors[2].description,
  openGraph: {
    title: "Filtrazione e depurazione | IDROSUD",
    description: sectors[2].description,
  },
};
export default function Page() {
  return <SectorPage sector={sectors[2]} />;
}
