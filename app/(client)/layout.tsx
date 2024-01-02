import React from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return <div className="font-LexendDeca font-extralight">{children}</div>;
};

export default ClientLayout;
