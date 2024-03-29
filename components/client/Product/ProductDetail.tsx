"use client";
import { useEffect, useState } from "react";

import { Image, Modal, Skeleton, Tabs } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { FiPhoneCall } from "react-icons/fi";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FacebookProvider, Comments } from "react-facebook";
import moment from "moment";
import { useStateProvider } from "@context/StateProvider";
import { useData } from "@context/DataProviders";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import ShopCart from "@components/items/client-items/ShopCart";
import { BsFillCartPlusFill } from "react-icons/bs";
import Contact from "./Contact";

const ProductDetail = () => {
  const [similarProduct, setSimilarProduct] = useState([]);
  const [ProductFetch, setProductFetch] = useState<any>();
  const [isCombo, setIsCombo] = useState(1);
  const [openContact, setOpenContact] = useState<any>(false);
  const [colorSelected, setColorSelected] = useState<any>("");
  const { setCartItems, Sale } = useData();
  const { setOpenCart, OpenCart } = useStateProvider();
  const router = useRouter();
  const { Products, setBill, currentUser } = useData();
  const [isCheckPaymentOpen, setIsCheckPaymentOpen] = useState(false);

  const params = useParams();

  useEffect(() => {
    const sort = Products.filter((item: any) => item.url === params.slug);
    if (sort) {
      setProductFetch(sort[0]);
    }
  }, [params.slug, Products]);

  useEffect(() => {
    const similarproduct = Products.filter(
      (item: any) => item.type === ProductFetch?.type
    );
    setSimilarProduct(similarproduct);
  }, [Products, ProductFetch]);

  const onMinus = () => {
    if (isCombo > 0) {
      setIsCombo(isCombo - 1);
    }
  };
  const currentTime = new Date();
  const formatCurrentTime = moment(currentTime).format("YYYY-MM-DD");
  const isSale =
    ProductFetch?.sale.discount === 0 || formatCurrentTime > Sale.end;

  const HandleOrder = (id: string, type: string) => {
    if (type === "buy") {
      if (currentUser) {
        const OrderData = {
          id: currentUser.id,
          name: currentUser.displayName,
          address: currentUser.address,
          email: currentUser.email,
          phone: currentUser.phone,
        };
        setBill(OrderData);
        router.push(`/thanh-toan`);
      } else {
        setIsCheckPaymentOpen(true);
      }
      setCartItems((prevItems: any) => [...prevItems, id]);

      router.push("/thanh-toan");
    } else {
      setCartItems((prevItems: any) => [
        ...prevItems,
        ...Array(isCombo).fill(id),
      ]);
      setOpenCart(true);
    }
  };

  const HandleColorSelected = (item: any) => {
    setCartItems((prevItems: any) => [...prevItems, item]);

    setColorSelected(item);
  };

  const items = [
    {
      key: "1",
      label: "Chi tiết sản phẩm",
      children: (
        <>
          <h3 className="text-[24px] font-semibold ">Chi tiết sản phẩm</h3>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: ProductFetch?.content }}
          ></div>
        </>
      ),
    },
    {
      key: "2",
      label: "Bình luận",
      children: (
        <>
          <div className="w-[778px]">
            <FacebookProvider appId="781034490143336">
              {" "}
              <Comments
                href="https://khogachcaocaptinphat.com"
                width={778}
              />{" "}
            </FacebookProvider>
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-5  d:w-[1300px] d:mx-auto p:w-auto p:mx-2">
      <div>
        <div className="flex d:mx-16 gap-16 font-LexendDeca d:flex-row p:flex-col p:mx-2 py-14">
          <div className="flex-[40%] rounded-lg d:h-max p:h-auto overflow-hidden">
            <Image.PreviewGroup>
              <Image
                className="p-2 h-full w-full object-contain hover:scale-110 duration-500"
                src={ProductFetch?.image}
              />
            </Image.PreviewGroup>
            {ProductFetch?.subimage?.length > 0 && (
              <>
                {" "}
                <div className="w-full bg-gray-100 mt-3">
                  <div className="p-2 flex w-full">
                    <Image.PreviewGroup>
                      <Swiper
                        loop={true}
                        spaceBetween={30}
                        centeredSlides={true}
                        slidesPerView={2}
                        slidesPerGroup={1}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper w-full"
                      >
                        {ProductFetch?.subimage?.map(
                          (item: any, idx: number) => (
                            <SwiperSlide key={idx}>
                              {" "}
                              <div className="mx-4 w-[150px] h-[150px] overflow-hidden flex items-center">
                                <Image
                                  className="p-2 h-full w-full object-contain"
                                  src={item.url}
                                />
                              </div>
                            </SwiperSlide>
                          )
                        )}
                      </Swiper>
                    </Image.PreviewGroup>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex-[70%] flex flex-col gap-5">
            <div>
              <h3 className="text-[26px] uppercase">{ProductFetch?.title}</h3>
              <div className="bg-black w-24 h-1"></div>
            </div>
            <div className="flex gap-1 flex-col text-[20px]">
              {ProductFetch?.sale?.discount === 0 ? (
                <>
                  <p>
                    Giá:{" "}
                    <span className="text-red-500">
                      {ProductFetch?.price} <sup>VNĐ</sup>
                    </span>
                  </p>
                </>
              ) : (
                <div>
                  <p>
                    Giá cũ:{" "}
                    <span className="text-[16px] line-through">
                      {ProductFetch?.price} <sup>VNĐ</sup>
                    </span>
                  </p>
                  <div className="flex items-end">
                    <p>
                      Giá mới:{" "}
                      <span className="text-red-500 text-[20px]">
                        {ProductFetch?.sale?.newPrice} <sup>VNĐ</sup>
                      </span>{" "}
                    </p>
                    <div className="ml-5 border-2 border-red-500 bg-red-500 text-white p-2">
                      Giảm {ProductFetch?.sale?.discount} %
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-[200px] ">
              {ProductFetch?.state ? (
                <div className=" text-green-500 rounded-xl font-bold">
                  Tình trạng: Còn hàng
                </div>
              ) : (
                <div className=" text-red-500  rounded-xl font-bold">
                  Tình trạng: Hết hàng
                </div>
              )}
            </div>
            <div>
              <h3 className="py-1">Màu sắc:</h3>
              <div className="flex gap-2 flex-col ">
                {ProductFetch?.color?.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      onClick={() => HandleColorSelected(item)}
                      className={`${
                        item === colorSelected
                          ? "bg-mainGreen"
                          : item === "Cam"
                          ? "bg-orange-500"
                          : item === "Đỏ"
                          ? "bg-red-500"
                          : item === "Xanh"
                          ? "bg-blue-500"
                          : item === "Xám"
                          ? "bg-gray-500"
                          : item === "Vàng"
                          ? "bg-yellow-500"
                          : item === "Đen"
                          ? "bg-black"
                          : item === "Trắng"
                          ? "bg-white"
                          : item === "Nâu"
                          ? "bg-brown-500"
                          : item === "Tím"
                          ? "bg-purple-500"
                          : item === "Hồng"
                          ? "bg-pink-500"
                          : item === "Xanh Đen"
                          ? "bg-blue-900"
                          : item === "Xám bạc"
                          ? "bg-gray-400"
                          : item === "Xanh lam"
                          ? "bg-blue-300"
                          : null
                      } w-[30px] h-[30px] rounded-full border border-black`}
                    ></div>
                    <div>
                      <p>{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="py-1">Đặt hàng:</h3>
              <div className="border border-blue-500   h-12 rounded-sm w-[200px] ">
                <div className="flex justify-between items-center h-full mx-5">
                  <BiMinus
                    onClick={() => onMinus()}
                    className="cursor-pointer"
                  />
                  <input
                    type="text"
                    value={`Số lượng: ${isCombo}`}
                    className=" focus-visible:outline-none w-full text-center border-0 px-0 py-[9px] h-auto text-13 "
                  />
                  <BiPlus
                    onClick={() => setIsCombo(isCombo + 1)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
            {ProductFetch?.parentUrl === "motor-cong-tu-dong" ? (
              <div className="flex">
                {" "}
                <div
                  className="py-3 px-6 bg-mainblue text-white hover:bg-red-700 rounded-sm cursor-pointer duration-300"
                  onClick={() => {
                    setOpenContact(true);
                  }}
                >
                  Liên hệ
                </div>
              </div>
            ) : (
              <>
                {" "}
                <div className="grid grid-cols-4 gap-5 ">
                  <div
                    className="rounded-sm col-span-3 w-full text-[18px] text-primary bg-[#f0edf8] hover:bg-[#e1dbf0] flex items-center  py-2 justify-center cursor-pointer gap-1"
                    onClick={() => HandleOrder(ProductFetch?.id, "add")}
                  >
                    <BsFillCartPlusFill className="text-[23px] " />
                    <p>Thêm vào giỏ</p>
                  </div>

                  <div
                    className="col-span-1 p-3 w-max bg-orange-500 text-white hover:bg-orange-600 rounded-sm cursor-pointer duration-300"
                    onClick={() => HandleOrder(ProductFetch?.id, "buy")}
                  >
                    Mua ngay
                  </div>
                </div>
              </>
            )}

            <div className="py-4 border-t border-b w-full font-light">
              <h3>Mô tả</h3>
              <div
                dangerouslySetInnerHTML={{ __html: ProductFetch?.describe }}
              ></div>
            </div>
            <div className="flex gap-3 items-center font-light">
              <span className="">Lượt xem {ProductFetch?.access}</span>
            </div>
          </div>
        </div>

        <div className="grid p:grid-cols-1 d:grid-cols-4 gap-5">
          <div className="d:px-16 py-5 p:px-2 border col-span-3">
            <Tabs
              defaultActiveKey="1"
              items={items}
              className="bg-white px-10 rounded-md font-LexendDeca py-5"
            />
          </div>

          <div className="col-span-1">
            <h3 className="text-mainred py-2 border-b-2 border-mainred uppercase font-bold">
              Sản phẩm liên quan
            </h3>
            <div>
              {similarProduct?.map((item: any, idx: number) => (
                <Link href={`/chi-tiet-san-pham/${item.url}`}>
                  <div className="flex gap-3 py-3 border-b" key={idx}>
                    <div className="flex-[30%]">
                      <img src={item.image} alt="similarProduct" />
                    </div>
                    <div className="flex-[60%]">
                      <h3 className="truncate1">{item.title}</h3>
                      <h3 className="text-mainred text-[18px] font-bold">
                        {item.price}
                      </h3>
                      <div className="flex">
                        <div className="py-1 px-4 bg-mainred text-white flex gap-2 items-center text-[15px]">
                          <FiPhoneCall />
                          <span>Liên hệ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <>
        <Modal
          closable={false}
          open={isCheckPaymentOpen}
          onCancel={() => setIsCheckPaymentOpen(false)}
          footer={null}
        >
          <div>
            <h2 className="text-[24px] font-semibold">Đến trang đăng nhập</h2>
            <p>Đăng nhập để giao dịch</p>
            <div className="flex w-full justify-center gap-5 mt-5">
              <div
                className="py-2 px-6 rounded-full border border-mainyellow cursor-pointer text-mainyellow duration-300 hover:border-orange-500 hover:text-orange-500"
                onClick={() => setIsCheckPaymentOpen(false)}
              >
                Hủy
              </div>
              <Link
                href={"/dang-nhap"}
                className="py-2 px-6 rounded-full border border-mainyellow bg-mainyellow text-white duration-300 hover:bg-orange-500 hover:border-orange-500 cursor-pointer"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </Modal>
      </>
      <div
        className={`fixed bottom-36 right-[-300px] ${
          OpenCart ? " z-50" : "z-0"
        }`}
      >
        <ShopCart />
      </div>
      <>
        {openContact && (
          <Contact setOpenContact={setOpenContact} OpenContact={openContact} />
        )}
      </>
    </div>
  );
};

export default ProductDetail;
