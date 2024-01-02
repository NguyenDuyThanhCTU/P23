import Contact from "@components/client/Contact/Contact";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Liên hệ | Ken EBIKE Cần Thơ",
  description: "Ken EBIKE - cửa hàng xe điện uy tín tại Cần Thơ",
};

const ContactPage = () => {
  return (
    <div>
      <div className="flex flex-col d:w-[1300px] d:mx-auto p:w-auto p:mx-2 py-5">
        <>
          <Contact />
        </>
      </div>
    </div>
  );
};

export default ContactPage;
