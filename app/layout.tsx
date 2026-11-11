
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}

        <Toaster
          position="top-right"
          closeButton
          toastOptions={{
            classNames: {
              toast:
                "border border-[#D9E2D9] bg-[#E8F0E9] text-[#245B43] shadow-lg",
              title: "font-semibold text-[#245B43]",
              description: "!text-[#245B43]",
              success: "border-[#D9E2D9]",
            },
          }}
        />
      </body>
    </html>
  );
}
