import Footer from "@components/layout/client-layout/Footer";
import Header from "@components/layout/client-layout/Header";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Ken EBIKE Cần Thơ",
  description: "Ken EBIKE - cửa hàng xe điện uy tín tại Cần Thơ",
};

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="py-10 font-LexendDeca">
        <div className=" relative h-[500px] ">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/config%2FConstruction.png?alt=media&token=45dc073f-a7fb-4589-bd1d-ca1580eda90f"
            alt="404 Not Found"
            fill
            sizes="(min-width: 808px) 30vw , 50vw"
            style={{
              objectFit: "contain", // cover, contain, none
            }}
          />
        </div>
        <div>
          <div className="text-center p:text-[14px] d:text-[16px]">
            <p>We're sorry the page you requested under maintenance!</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
