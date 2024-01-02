import DisplayProduct from "@components/client/Product/DisplayProduct";
import { getDataByTypeProps } from "@lib/get-data";
import React from "react";

const page = async () => {
  const Data = await getDataByTypeProps("products", "parentUrl", "xe-dap-dien");

  return (
    <div>
      <div className="d:w-[1100px] d:mx-auto p:w-auto p:mx-2 py-5">
        <DisplayProduct Data={Data} />
      </div>
    </div>
  );
};

export default page;
