import HomeDisplayProduct from "@components/client/Home/HomeDisplayProduct";
import HomeSlide from "@components/client/Home/HomeSlide";
import ShortIntro from "@components/client/Home/ShortIntro";
import Footer from "@components/layout/client-layout/Footer";
import Header from "@components/layout/client-layout/Header";
import { getAllDataProps } from "@lib/get-data";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Ken EBIKE Cần Thơ",
  description: "Ken EBIKE - cửa hàng xe điện uy tín tại Cần Thơ",
};

const HomePage = async () => {
  const Data = await getAllDataProps("products");

  return (
    <div>
      <HomeSlide />
      <div className="d:w-[1100px] d:mx-auto p:w-auto p:mx-2">
        <ShortIntro />
      </div>
      <div className="bg-green-200 mt-2">
        <div className="p:mx-2 d:mx-10 py-5  ">
          <div className="bg-green-600 text-white text-center text-[30px] font-normal py-2">
            ✨ SẢN PHẨM BÁN CHẠY NHẤT 🔥
          </div>
          <div>
            {Data.map((item: any, index: number) => (
              <div key={index}>
                <HomeDisplayProduct Data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
