import "./globals.css";
import AppShell from "@/components/layout/AppShell";

export const metadata = {
  title: "SALESOS",
  description: "Enterprise CRM Operating System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}