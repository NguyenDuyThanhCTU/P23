"use client";
import { addDocument } from "@config/Services/Firebase/FireStoreDB";
import { useData } from "@context/DataProviders";
import { useStateProvider } from "@context/StateProvider";
import { Modal, notification } from "antd";
import Lottie from "lottie-react";
import React, { useState } from "react";

const FormConfirm = ({ setStep, setOrderId }: any) => {
  const { Bill, currentUser, setCurrentUser } = useData();

  const { setIsLoading } = useStateProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const HandlePayment = () => {
    setIsLoading(true);
    const newBill = {
      ...Bill,
      status: "Đang chờ xử lý",
      userId: currentUser.id,
      createdAt: new Date(),
    };
    addDocument("orders", newBill)
      .then((res: any) => {
        setOrderId(res.id);
        setIsLoading(false);
        notification.success({
          message: "Đặt hàng thành công",
          description: "Đơn hàng của bạn đang được xử lý",
        });
        setCurrentUser({
          ...currentUser,
          cartItems: [],
        });
        setStep(3);
      })
      .catch((err) => {
        setIsLoading(false);
        notification.error({
          message: "Đặt hàng thất bại",
          description: "Vui lòng thử lại",
        });
      });
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[25px] font-normal">Thông tin đơn hàng</h2>
      <div className="grid grid-cols-2 gap-5">
        <div className="border">
          <div className="p-4 flex flex-col gap-2">
            <p>
              <strong>Khách hàng:</strong> {Bill?.name}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {Bill?.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {Bill?.address}
            </p>
            <p>
              <strong>Email</strong> {Bill?.email}
            </p>
          </div>
        </div>
        <div className="border">
          <div className=" p-4 flex h-full justify-between flex-col">
            <div className="pb-2 flex flex-col gap-2">
              <div className="flex gap-2">
                <strong>Sản phẩm:</strong>{" "}
                <div
                  className="text-mainorange font-normal cursor-pointer hover:text-orange-600 duration-300"
                  onClick={() => setIsModalOpen(true)}
                >
                  {Bill?.productId}
                </div>
              </div>

              <p>
                <strong>giá:</strong> {Bill?.price} VNĐ
              </p>
            </div>
            <div className="flex w-full justify-between border-t pt-2">
              <div className="text-[22px] font-normal">Tổng thanh toán:</div>
              <div>
                <span className="text-[22px] font-normal">
                  {Bill?.price} VNĐ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-[25px] font-normal">Phương thức thanh toán</h2>
        <p>Sau khi gửi đi sẽ có nhân viên bên Ken Ebike liên hệ lại</p>
      </div>
      <div className="grid grid-cols-2">
        <div className="font-normal text-[18px] flex justify-between w-full">
          <div>Tổng thanh toán</div>
          <div>
            <span className=" font-normal"> {Bill?.price} VNĐ</span>
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex w-full  gap-5">
        <div
          className="py-2 px-6  duration-300 cursor-pointer text-mainyellow border-mainGreen uppercase border rounded-full font-normal hover:text-orange-500 hover:border-orange-500"
          onClick={() => setStep(1)}
        >
          Quay về
        </div>
        <div
          className="py-2  px-10 duration-300 cursor-pointer text-white bg-mainGreen border-mainyellow uppercase border rounded-full font-normal hover:bg-orange-500 hover:border-orange-500"
          onClick={() => HandlePayment()}
        >
          Tiếp tục
        </div>
      </div>
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="flex gap-3 py-3 border-b cursor-pointer hover:bg-gray-100">
          <div className="flex-[30%]">
            <img src={Bill?.image} alt="similarProduct" />
          </div>
          <div className="flex-[60%] ">
            <div>
              <h3 className="truncate1">
                {Bill?.name} - cấp {Bill?.level}
              </h3>

              <div className="flex items-center ">
                <div className="w-10"></div>
                <span className="text-red-500">{Bill?.price} VNĐ</span>
              </div>
              <div className="flex flex-col">
                <p>
                  {" "}
                  Tốc độ tối đa:{" "}
                  <span className="text-green-500">
                    +${Bill?.limitspeed} km/h
                  </span>
                </p>
                <p>
                  {" "}
                  Quãng đường tối đa :{" "}
                  <span className="text-green-500">
                    +${Bill?.limitdistance} km{" "}
                  </span>
                </p>
                <p>
                  {" "}
                  Số coin nhận được:{" "}
                  <span className="text-green-500">
                    +${Bill?.limitcoinearning} VNĐ{" "}
                  </span>
                </p>
                <p>
                  {" "}
                  Thời gian chờ:{" "}
                  <span className="text-green-500">
                    +${Bill?.limittime} phút{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FormConfirm;
