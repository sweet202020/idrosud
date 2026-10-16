import { SectorPage } from "@/components/sector-page";
import { sectors } from "@/content/site";
export const metadata = {
  alternates: { canonical: "/giardinaggio-e-irrigazione" },
  title: "Giardinaggio e irrigazione",
  description: sectors[1].description,
  openGraph: {
    title: "Giardinaggio e irrigazione | IDROSUD",
    description: sectors[1].description,
  },
};
export default function Page() {
  return <SectorPage sector={sectors[1]} />;
}
