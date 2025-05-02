import "./globals.css";
import Wrapper from "@/components/Wrapper";

export const metadata = {
    title: "Test Task",
    description: "Test tast posts app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Wrapper>{children}</Wrapper>
            </body>
        </html>
    );
}
