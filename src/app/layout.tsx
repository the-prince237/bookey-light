import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Le PIB Eto'o — Guy Bertrand MESSINA",
  description: "Autopsie d'une Puissance Soft-Power Africaine.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}