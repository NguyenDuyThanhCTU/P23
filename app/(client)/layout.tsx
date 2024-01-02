import Copyright from "@components/layout/client-layout/Copyright";
import Footer from "@components/layout/client-layout/Footer";
import Header from "@components/layout/client-layout/Header";
import Hotline from "@components/layout/client-layout/Hotline";
import OnTop from "@components/layout/client-layout/OnTop";
import React from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <div className="font-LexendDeca font-extralight d:text-[16px] p:text-[14px]">
      <Header />
      {children}
      <Footer />
      {/* <OnTop />
      <Hotline /> */}
      <Copyright />
    </div>
  );
};

export default ClientLayout;
