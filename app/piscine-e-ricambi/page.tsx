import { SectorPage } from "@/components/sector-page";
import { sectors } from "@/content/site";
export const metadata = {
  alternates: { canonical: "/piscine-e-ricambi" },
  title: "Piscine e ricambi",
  description: sectors[0].description,
  openGraph: {
    title: "Piscine e ricambi | IDROSUD",
    description: sectors[0].description,
  },
};
export default function Page() {
  return <SectorPage sector={sectors[0]} />;
}
