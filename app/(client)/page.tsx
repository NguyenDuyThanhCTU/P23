import HomeSlide from "@components/client/Home/HomeSlide";
import ShortIntro from "@components/client/Home/ShortIntro";
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
      <HomeSlide />
      <div className="w-[1100px] mx-auto">
        <ShortIntro />
      </div>
      <div className="bg-green-200 mt-2">
        <div className="mx-10 py-5  ">
          <div className="bg-green-600 text-white text-center text-[30px] font-normal py-2">
            ✨ SẢN PHẨM BÁN CHẠY NHẤT 🔥
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
