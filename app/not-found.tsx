import { Button, Eyebrow } from "@/components/ui";
import { WaterRippleAttachment } from "@/components/water-ripple-section";
export default function NotFound() {
  return (
    <section className="inner-hero ripple-surface" data-water-ripple>
      <div className="container">
        <Eyebrow>404 / PAGINA NON TROVATA</Eyebrow>
        <h1>
          Riprendiamo
          <br />
          il filo.
        </h1>
        <div className="inner-intro">
          <p>
            Questa pagina non è disponibile. Torna alla homepage per esplorare
            le nostre soluzioni.
          </p>
          <Button href="/">Torna alla homepage</Button>
        </div>
      </div>
      <WaterRippleAttachment />
    </section>
  );
}
