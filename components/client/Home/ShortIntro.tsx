import Link from "next/link";
import React from "react";
import localFont from "next/font/local";
import Image from "next/image";

const UTMFleur = localFont({
  src: "../../../assets/fonts/UTMFleur.ttf",
  display: "swap",
});

const UTMAmerican = localFont({
  src: "../../../assets/fonts/UTMAmericanSans.ttf",
  display: "swap",
});

const ShortIntro = () => {
  return (
    <div className="bg-[url(https://firebasestorage.googleapis.com/v0/b/quangcaocokhixaydung.appspot.com/o/UI%2F201313823_1160040927807717_7589381226147591092_n.jpg?alt=media&token=675fe7a8-72a8-4c33-9dcf-35b463488a38)] bg-center bg-no-repeat">
      <div className="bg-[rgba(0,0,0,0.79)]">
        <div className="flex gap-2 py-5 p:px-0 d:px-5 d:flex-row p:flex-col">
          <div className=" flex-[45%] h-[500px] items-center justify-center flex">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/xedapdiencantho.appspot.com/o/DANH%20THI%E1%BA%BEP%20KEN%20EBIKE.jpg?alt=media&token=fc253a3e-8e98-459b-911f-381ced6d2f11"
              alt="banner"
              width={500}
              height={500}
              className=" object-contain border-4 border-white"
            />
          </div>
          <div className=" flex-[55%] p:px-0 d:px-10 text-white">
            <h3 className={`font-UTMFleur text-[40px] ${UTMFleur.className}`}>
              Giới thiệu
            </h3>
            <h3
              className={`font-UTMAmerican font-bold text-green-400 text-center text-[30px] leading-7 uppercase ${UTMAmerican.className}`}
            >
              Tại sao nên chọn Ken Ebike?
            </h3>
            <div className="indent-3 mt-5">
              <p>
                Ken Ebike là một trong những đơn vị hàng đầu về lĩnh vực cung
                cấp các dòng xe điện chất lượng cao, giá cả phải chăng, uy tín,
                chất lượng, bảo hành lâu dài tại Cần Thơ ...
              </p>
            </div>
            <Link href={`/gioi-thieu`}>
              <div className="text-redPrimmary mt-5 hover:text-red-700 cursor-pointer">
                Đọc thêm _
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortIntro;
