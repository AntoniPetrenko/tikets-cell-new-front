"use client";

import { Footer } from "../Footer/Footer";
import { GlobalModal } from "../GlobalModal/GlobalModal";
import { Header } from "../Header/Header";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <GlobalModal />
    </>
  );
};
