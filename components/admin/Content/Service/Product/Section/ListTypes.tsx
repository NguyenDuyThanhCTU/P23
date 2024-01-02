"use client";
import { TypeProductItems } from "@assets/item";
import { uploadImage } from "@components/items/server-items/Handle";
import { updateDocument } from "@config/Services/Firebase/FireStoreDB";
import { useData } from "@context/DataProviders";
import { useStateProvider } from "@context/StateProvider";
import { getAllDataProps } from "@lib/get-data";
import { Drawer, Modal, notification } from "antd";
import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ListType: React.FC = () => {
  const { setDropDown } = useStateProvider();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { productTypes } = useData();
  const [imageUrl, setImageUrl] = React.useState<any>();
  const [Data, setData] = React.useState<any>([]);
  const [OpenModel, setOpenModel] = React.useState(false);
  const [Topic, setTopic] = React.useState<any>("");
  const { setIsRefetch } = useStateProvider();
  getAllDataProps("website").then((data: any) => {
    setData(data.filter((item: any) => item.id === "Contact")[0]);
  });

  const HandleUploadImage = (e: any, locate: string) => {
    uploadImage(e, locate).then((data: any) => {
      setImageUrl(data);
    });
  };

  const HandleDiscard = () => {
    setImageUrl("");
    setTopic("");
    setOpenModel(false);
  };

  const HandleUpdate = () => {
    if (Topic && imageUrl) {
      const data = {
        [Topic]: imageUrl,
      };
      updateDocument("website", "Contact", data).then(() => {
        notification.success({
          message: "Thành công !",
          description: "Thông tin đã được CẬP NHẬT !",
        });
        HandleDiscard();
        setIsRefetch("CRUD website");
      });
    } else {
      notification["error"]({
        message: "Lỗi !",
        description: "Vui lòng chọn danh mục hình ảnh bạn muốn thay đổi ảnh",
      });
    }
  };

  return (
    <div className="d:w-[400px] shadow-2xl bg-[#353535] p:w-auto">
      <div className="p-3">
        <div className="flex justify-between items-center text-[25px] p-3 flex-col gap-3">
          <p className="uppercase text-center w-full from-yellow-400">
            Mục sản phẩm
          </p>
          <div className="h-[400px] p:w-[60vw] d:w-[370px] bg-white text-black overflow-y-auto">
            <div className="p-2">
              {TypeProductItems.map((items, idx) => {
                const children = productTypes.filter(
                  (data: any) => data.parent === items.label
                );

                return (
                  <div key={idx} className="pb-4 border-b border-black">
                    <span className="text-[20px]">{items.label}</span>
                    {children.length > 0 && (
                      <div className="ml-3 indent-2 flex flex-col border-l-2 border-black">
                        {children.map((item: any, idx: any) => (
                          <div key={idx}>
                            {" "}
                            <span className="text-[18px]">{item.type}</span>
                            {item.children.length > 0 && (
                              <div>
                                {item.children.map((data: any, idx: any) => (
                                  <div className="ml-6 indent-2 flex flex-col border-l-2 border-black">
                                    <span className="text-[16px]">
                                      {data.children}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="bg-white text-redPrimmary px-4 py-1 rounded-lg uppercase cursor-pointer hover:scale-110 duration-300"
            onClick={() => setDropDown("add-types")}
          >
            Thêm
          </div>
          <div
            className="bg-white text-redPrimmary text-center text-[16px] px-4 py-1 rounded-lg uppercase cursor-pointer hover:scale-110 duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Thay đổi hình ảnh phân loại sản phẩm
          </div>
        </div>
      </div>
      <>
        <Drawer
          title="Cập nhật hình ảnh phân loại sản phẩm"
          onClose={() => setIsModalOpen(false)}
          width={700}
          open={isModalOpen}
          footer={false}
        >
          {Data && (
            <>
              <div className="grid grid-cols-4 gap-4 ">
                <div className="w-auto p:h-auto ">
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <img
                        src={Data.image1}
                        alt=""
                        className="w-96 h-96 object-cover"
                      />
                    </div>
                  </label>
                </div>
                <div className="w-auto p:h-auto ">
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <img
                        src={Data.image2}
                        alt=""
                        className="w-96 h-96 object-cover"
                      />
                    </div>
                  </label>
                </div>
                <div className="w-auto p:h-auto ">
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <img
                        src={Data.image3}
                        alt=""
                        className="w-96 h-96 object-cover"
                      />
                    </div>
                  </label>
                </div>
                <div className="w-auto p:h-auto ">
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <img
                        src={Data.image4}
                        alt=""
                        className="w-96 h-96 object-cover"
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex w-full justify-center mt-5">
                <div
                  className="py-2 px-6 bg-redPrimmary text-white cursor-pointer hover:bg-red-700 duration-300 "
                  onClick={() => setOpenModel(true)}
                >
                  Cập nhật
                </div>
              </div>
            </>
          )}
        </Drawer>
      </>
      <>
        <Modal
          open={OpenModel}
          onCancel={() => setOpenModel(false)}
          footer={false}
        >
          <div>
            {" "}
            <div className="flex flex-col gap-2">
              <label className="cursor-pointer">
                {imageUrl ? (
                  <div>
                    <img src={imageUrl} alt="" />
                  </div>
                ) : (
                  <>
                    {" "}
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">
                          Chọn hình ảnh để tải lên
                        </p>
                      </div>
                      <p className="text-gray-400  text-center mt-10 text-sm leading-10">
                        Định dạng jpg hoặc png <br />
                      </p>
                      <p className="bg-[#0047AB] hover:bg-[#0000FF] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Chọn từ thiết bị
                      </p>
                    </div>
                  </>
                )}

                <input
                  type="file"
                  name="upload-video"
                  className="w-0 h-0"
                  onChange={(e) => HandleUploadImage(e, "slides")}
                />
              </label>
              <label className="text-md font-medium ">Danh mục sản phẩm</label>
              <select
                className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                onChange={(e) => setTopic(e.target.value)}
              >
                <option> -- Chọn mục bài viết --</option>

                {[
                  { label: "Hình 1", value: "image1" },
                  { label: "Hình 2", value: "image2" },
                  { label: "Hình 3", value: "image3" },
                  { label: "Hình 4", value: "image4" },
                ].map((item, idx) => (
                  <option
                    key={idx}
                    className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
              <div className="w-full flex justify-center">
                <div
                  className="px-6 py-2 bg-redPrimmary cursor-pointer hover:bg-red-700 duration-300 text-white"
                  onClick={() => HandleUpdate()}
                >
                  Tải lên
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default ListType;
