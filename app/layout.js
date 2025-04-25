import "./globals.css";
import Wraper from "@/components/Wraper";

export const metadata = {
  title: "test task",
  description: "test task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Wraper>
          {children}
        </Wraper>
      </body>
    </html>
  );
}
