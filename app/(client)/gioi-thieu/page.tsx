import Introduction from "@components/client/Introduction/Introduction";
import { getDataByTypeProps } from "@lib/get-data";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Giới Thiệu | Sửa Nhà Cần Thơ",
  description: "Sửa Nhà Cần Thơ - An Lành Cho Gia Đình Việt",
};

const IntroductionPage = async () => {
  return (
    <div>
      <div className="flex flex-col d:w-[1300px] d:mx-auto p:w-auto p:mx-2 py-5">
        <div className="border-b pb-2">
          <div className="uppercase font-bold text-[1.5rem] ">
            <div className="hover:text-mainblue before:w-[50px] before:h-[1px] before:inline-block  before:bg-black before:mr-2 text-center cursor-default">
              Tại sao Mọi người lại tin dùng Xe điện của Ken EBIKE
            </div>
          </div>
          <div className="text-center">
            <strong>Ken Ebike </strong>là một trong những đơn vị hàng đầu về
            lĩnh vực cung cấp các dòng xe điện chất lượng cao, giá cả phải
            chăng, uy tín, chất lượng, bảo hành lâu dài tại Cần Thơ. Với phương
            châm "Uy tín là vàng" chúng tôi luôn đặt lợi ích của khách hàng lên
            hàng đầu, đảm bảo mang đến cho khách hàng những sản phẩm tốt nhất.
          </div>
        </div>
        <div className="mt-4">
          <Introduction />
        </div>
      </div>
    </div>
  );
};

export default IntroductionPage;
