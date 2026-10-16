"use client";
import { useState, type FormEvent } from "react";
import { company, sectors } from "@/content/site";
import { Arrow, Button } from "./ui";
export function ContactForm() {
  const [draft, setDraft] = useState<string | null>(null);
  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `Nome: ${data.get("name")}\nEmail: ${data.get("email")}\nTelefono: ${data.get("phone") || "Non indicato"}\nArea: ${data.get("sector")}\n\n${data.get("message")}`;
    setDraft(
      `mailto:${company.email}?subject=${encodeURIComponent(`Richiesta informazioni — ${data.get("sector")}`)}&body=${encodeURIComponent(body)}`,
    );
  }
  return (
    <form
      className="contact-form"
      onSubmit={prepare}
      onChange={() => setDraft(null)}
    >
      <h2>Di cosa hai bisogno?</h2>
      <p className="form-note" id="form-help">
        Compila i campi per preparare una bozza da aprire nel tuo programma
        email. Nessun messaggio viene inviato da questo sito.
      </p>
      <div className="form-grid">
        <label>
          Nome e cognome *
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Come ti chiami"
          />
        </label>
        <label>
          Email *
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="La tua email"
          />
        </label>
        <label>
          Telefono
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            maxLength={30}
            placeholder="Facoltativo"
          />
        </label>
        <label>
          Area di interesse *
          <select name="sector" required defaultValue="">
            <option value="" disabled>
              Seleziona un’area
            </option>
            {sectors.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
            <option>Altre informazioni</option>
          </select>
        </label>
        <label className="full-width">
          Il tuo messaggio *
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={4}
            placeholder="Raccontaci cosa stai cercando"
          />
        </label>
      </div>
      <p className="form-note">
        * Campi obbligatori. I dati restano nel browser fino all’apertura del
        programma email.{" "}
        <a href="/privacy-policy">Consulta la Privacy Policy ↗</a>
      </p>
      <Button type="submit" describedBy="form-help">
        Prepara la bozza email
      </Button>
      <div aria-live="polite">
        {draft && (
          <div className="form-result">
            <p>
              La bozza è pronta. Aprila nel tuo programma email, controllala e
              inviala da lì.
            </p>
            <a className="text-link" href={draft}>
              Apri la bozza email <Arrow diagonal />
            </a>
            <p className="form-note">
              Serve un programma email configurato. Puoi anche scriverci
              direttamente a {company.email}.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
