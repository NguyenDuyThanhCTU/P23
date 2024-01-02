"use client";
import { IconMapping, SocialMediaCustom, TypePostItems } from "@assets/item";
import { useData } from "@context/DataProviders";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiLogoTelegram } from "react-icons/bi";
import { GiRotaryPhone } from "react-icons/gi";
import { IoLocation } from "react-icons/io5";

const Footer = () => {
  const { ContactData, SocialMedia } = useData();

  return (
    <div className="bg-green-50">
      <div className="d:w-[1440px]  p:w-auto d:mx-auto p:mx-2 py-10  font-LexendDeca font-extralight ">
        <div className="grid p:grid-cols-2 d:grid-cols-6 gap-4 ">
          <div className="col-span-2 ">
            <Link href={`/`}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/xedapdiencantho.appspot.com/o/DANH%20THI%E1%BA%BEP%20KEN%20EBIKE.jpg?alt=media&token=fc253a3e-8e98-459b-911f-381ced6d2f11"
                alt="logo"
                width={400}
                height={200}
                sizes="(min-width: 808px) 30vw , 50vw"
              />
            </Link>
            <h2 className="text-[18px] font-normal  mt-5">
              Ken EBIKE - Cửa hàng xe điện uy tín tại Cần Thơ
            </h2>
            <div className="mt-4 flex flex-col text-[15px]">
              <p>
                Ken EBIKE - Chuyên các dòng xe đạp điện, xe máy điện chính hãng,
                chất lượng cao, uy tín số 1 tại Cần Thơ
              </p>

              <Image
                src="https://firebasestorage.googleapis.com/v0/b/xedapdiencantho.appspot.com/o/logo_bct_019590229b4c4dfda690236b67f7aff4.webp?alt=media&token=4aa6eecc-7a39-46ca-bf8f-d5e35e8ff904"
                alt="logo"
                width={200}
                height={200}
              />
            </div>
          </div>

          <div className="col-span-2">
            <h2 className="text-[18px] font-normal ">Thông tin liên hệ</h2>
            <div className="mt-5 flex flex-col gap-2 text-[14px]">
              <div className=" flex gap-3">
                <div className="flex mt-1">
                  <IoLocation className="" />
                </div>
                <div className="hover:underline hover:text-blue-500 cursor-pointer">
                  {ContactData.address}
                </div>
              </div>

              <div className="flex items-center gap-3 cursor-pointer hover:underline ">
                <GiRotaryPhone />
                <div>{ContactData.phone}</div>
              </div>
              <div className="flex items-center gap-3">
                <BiLogoTelegram />
                <div className="hover:underline cursor-pointer">
                  {ContactData.gmail}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex mt-2 gap-5">
                {SocialMediaCustom.map((items: any, idx: number) => {
                  let Icon = IconMapping[items.icon];
                  let Point = SocialMedia[items.id];
                  return (
                    <div
                      key={idx}
                      className={`text-[20px] cursor-pointer  p-1  hover:scale-125 duration-300`}
                    >
                      {Icon && (
                        <div>
                          <Icon />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <h2 className="text-[18px] font-normal ">Fanpage</h2>
            <div className="h-52 overflow-hidden mt-4">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKEN.EBIKE%2Fabout_contact_and_basic_info&tabs=timeline&width=340&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="600"
                height="600"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
