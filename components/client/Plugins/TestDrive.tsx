"use client";
import { useData } from "@context/DataProviders";
import React, { useState } from "react";
import { notification } from "antd";
import { useStateProvider } from "@context/StateProvider";
import { AiOutlineClockCircle } from "react-icons/ai";
import Input from "@components/admin/Item/Input";
import { BsPhone } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";

const TestDrive = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cities, setCities] = useState<any>("");
  const [districts, setDistricts] = useState("");
  const [wards, setWards] = useState("");
  const [content, setContent] = useState("");
  const [selectedValue, setSelectedValue] = useState("XE ĐẠP TRỢ LỰC ĐIỆN");
  const { ContactData } = useData();
  const { setIsLoading } = useStateProvider();

  const HandleDiscard = () => {
    setName("");
    setPhone("");
    setEmail("");
    setCities("");
    setDistricts("");
    setWards("");
    setContent("");
  };

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name || !phone) {
      notification["warning"]({
        message: "Thao tác KHÔNG thành công !",
        description: `
           Vui lòng nhập đầy đủ THÔNG TIN !`,
      });
      setIsLoading(false);
    } else {
      const dataFields = [
        { title: "Họ Tên:", value: name },
        { title: "SĐT:", value: phone },
        { title: "Email:", value: email },
        { title: "Khu vực:", value: `${cities} - ${districts} - ${wards}` },
        { title: "Nội dung lời nhắn:", value: content },
      ];
      let data: any = {};

      dataFields?.forEach((field) => {
        data[field.title] = field.value;
      });

      const response = await fetch(
        `https://formsubmit.co/ajax/thanhb1906564@student.ctu.edu.vn`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        notification["success"]({
          message: "Thành công !",
          description: `
             Chúng tôi sẽ liên hệ trong thời gian sớm nhất !`,
        });
        setIsLoading(false);
        HandleDiscard();
      } else {
        setIsLoading(false);
        notification["error"]({
          message: "Lỗi !",
          description: `
             Lỗi không xác định !`,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-10 py-10">
      <div className="grid p:grid-cols-1 d:grid-cols-3 gap-10 py-5 font-LexendDeca">
        <div className="flex flex-col">
          <h2 className="py-5 text-[20px]  font-semibold">Đăng ký online</h2>
          <div className="flex flex-col gap-2">
            <Input text="Họ tên*" Value={name} setValue={setName} />
            <Input text="Địa chỉ" Value={email} setValue={setEmail} />
            <Input text="Số điện thoại*" Value={phone} setValue={setPhone} />

            {/* <div className="flex flex-col gap-2">
              <label className="font-semibold ">Khu vực</label>
              <AddressDropdown
                setSelectedCity={setCities}
                setSelectedDistrict={setDistricts}
                setSelectedWardName={setWards}
              />
            </div> */}

            <div className=" border">
              <div className="flex flex-col gap-2 p-3">
                <label className="font-semibold ">LOẠI XE QUAN TÂM *</label>
                <div>
                  {["XE ĐẠP TRỢ LỰC ĐIỆN", "XE MÁY ĐIỆN", "XE ĐẠP ĐIỆN"].map(
                    (item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`radio_${idx}`}
                          name="vehicle"
                          value={item}
                          checked={selectedValue === item}
                          onChange={(e) => setSelectedValue(e.target.value)}
                        />
                        <label className="">{item}</label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <div
                className="bg-mainGreen hover:bg-orange-600 duration-300 cursor-pointer uppercase px-14 text-white rounded-full py-2"
                onClick={(e) => HandleSubmit(e)}
              >
                Gửi yêu cầu{" "}
              </div>
            </div>
          </div>
        </div>
        <div className=" font-LexendDeca font-extralight flex w-full  justify-start col-span-2 items-start gap-3 flex-col">
          <h3 className="text-[48px] font-light ">
            <strong className="font-bold">Liên hệ</strong> Cửa hàng xe điện{" "}
            <strong>Ken EBIKE</strong> Cần Thơ
          </h3>

          <div className=" py-3 flex flex-col gap-3">
            <p className="text-[22px] font-normal">
              Địa chỉ liên hệ trực tiếp:
            </p>
            <div className="mt-5 flex flex-col gap-5">
              <div className="flex gap-2 ">
                <div className="flex items-center gap-2">
                  <CiLocationOn className="" />

                  <h2>Địa chỉ :</h2>
                </div>
                <p className="font-semibold">{ContactData.address}</p>
              </div>
              <div className="flex gap-2 ">
                <div className="flex items-center gap-2">
                  <SiGmail className="" />

                  <h2>Email :</h2>
                </div>

                <p className="font-semibold">{ContactData.gmail}</p>
              </div>
              <div className="flex gap-2 ">
                <div className="flex items-center gap-2">
                  <BsPhone className="" />

                  <h2>Điện thoại:</h2>
                </div>
                <p className="font-semibold">{ContactData.phone}</p>
              </div>
              <div className="flex gap-2 ">
                <div className="flex items-center gap-2">
                  <AiOutlineClockCircle className="" />

                  <h2>Thời gian làm việc:</h2>
                </div>
                <p className="font-semibold">{ContactData.worktime}</p>
              </div>
            </div>{" "}
          </div>
          <div className="w-full h-[500px]">
            <iframe src={ContactData.location} className="h-full w-full">
              {" "}
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDrive;
