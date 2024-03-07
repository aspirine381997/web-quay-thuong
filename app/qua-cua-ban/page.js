"use client";
import { Suspense, useEffect, useState } from "react";
import Voucher from "../../components/voucher";
import { useRouter, useSearchParams } from "next/navigation";
import { getListAward, getTurnsRemain } from "../api/api";

export default function Home() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState();
  const [listAward, setListAward] = useState();

  useEffect(() => {
    setLoading(true);
    getTurnsRemain({ phone: searchParams.get("phone") }).then((data) => {
      if (data?.code === "SUCCESS") {
        setCustomer(data?.data);
        setLoading(false);
      } else {
        console.log(data?.message);
      }
    });
  }, [searchParams]);

  useEffect(() => {
    if (!customer) return;
    getListAward({
      phone: searchParams.get("phone"),
      customerId: customer?.customerId,
    }).then((data) => {
      if (data?.code === "SUCCESS") {
        setListAward(data?.data);
      } else {
        console.log(data?.message);
      }
    });
  }, [searchParams, customer]);

  const navigate = (page) => {
    const phone = searchParams.get("phone");
    const id = customer?.customerId ?? searchParams.get("customerId");
    router.push(`/${page}?phone=${phone}&customerId=${id}`);
  };

  const [scale, setScale] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // Kiểm tra kích thước màn hình và quyết định áp dụng scale hay không
      if (screen.width < 285) setScale(3);
      else if (screen.width >= 285 && screen.width < 320) setScale(2);
      else if (screen.width >= 320 && screen.width < 356) setScale(1);
      else if (screen.width >= 356) setScale(-1);
      else setScale(0);
    };

    // Gắn sự kiện resize để kiểm tra kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Kiểm tra kích thước màn hình khi tải trang
    handleResize();

    // Loại bỏ sự kiện resize khi unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const checkScale = () => {
    switch (scale) {
      case 1:
        return { zoom: "zoom-90", screenPadding: "px-5" };
      case 2:
        return { zoom: "zoom-80", screenPadding: "px-4" };
      case 3:
        return { zoom: "zoom-70", screenPadding: "px-3" };

      default:
        return { zoom: "", screenPadding: "px-[27px]" };
    }
  };

  const checkAward = (award) => {
    switch (award) {
      case 1:
        return "Giải nhất";
      case 2:
        return "Giải nhì";
      case 3:
        return "Giải ba";
      case 4:
        return "Giải tư";
      case 5:
        return "Giải khuyến khích";
      default:
        return "";
    }
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="min-h-screen bg-[#F1F3F4] pb-8">
        <div
          className={
            "rounded-b-[30px] bg-[url('/minigame/images/bg-thele.png')] bg-cover bg-no-repeat pb-[21px] pt-5 " +
            checkScale().screenPadding
          }
        >
          {/* Header---- */}
          <div className="flex place-content-between items-center">
            <img src="/minigame/images/logo.png" onClick={() => navigate("")} />
            <div className="font-sf text-sm">
              <span
                className="mr-5 text-white"
                onClick={() => navigate("the-le")}
              >
                Thể lệ
              </span>
              <span
                className="text-[#FFD600]"
                onClick={() => navigate("qua-cua-ban")}
              >
                Quà của bạn
              </span>
            </div>
          </div>

          <div className="mt-[50px] font-sf">
            <div className="text-center font-bold uppercase leading-[19px] text-[#FFD600]">
              phần thưởng của bạn
            </div>
          </div>
        </div>

        {/* Vouchers---- */}
        {listAward && listAward?.length != 0 && (
          <div className="mt-[22px] px-[22px] font-sf">
            {/* <div className="mb-5 rounded-[20px] bg-white px-4 py-5">
              <span className="text-[13px] text-black">
                {listVoucher?.[0]?.orders == 1
                  ? "Giải Nhất"
                  : listVoucher?.[0]?.orders == 2
                    ? "Giải Nhì"
                    : listVoucher?.[0]?.orders == 3
                      ? "Giải Ba"
                      : listVoucher?.[0]?.orders == 4
                        ? "Giải Tư"
                        : listVoucher?.[0]?.orders == 5
                          ? "Giải Khuyến Khích"
                          : ""}
              </span>
              {listVoucher?.map((voucher) => (
                <div className={checkScale().zoom}>
                  <Voucher
                    code={voucher?.code}
                    expireDate={voucher?.expireDate}
                    supplier={voucher?.supplier}
                    value={voucher?.value}
                    voucherInfo={voucher?.voucherInfo}
                  />
                </div>
              ))}
            </div> */}

            {listAward?.map((item) => (
              <div
                key={item?.programId}
                className="mb-5 rounded-[20px] bg-white px-4 py-5"
              >
                <span className="text-[13px] text-black">
                  {checkAward(item?.list?.[0]?.orders)}
                </span>
                {item?.list?.map((voucher) => (
                  <div key={voucher?.code} className={checkScale().zoom}>
                    <Voucher
                      code={voucher?.code}
                      expireDate={voucher?.expireDate}
                      supplier={voucher?.supplier}
                      value={voucher?.value}
                      voucherInfo={voucher?.voucherInfo}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {listAward && listAward?.length == 0 && (
          <>
            <img src="/minigame/images/miss.png" className="mx-auto mt-16" />
            <div className="mt-5 text-center font-sf">
              Bạn chưa có phần thưởng nào
            </div>
          </>
        )}

        <img
          src="/minigame/images/back-home.png"
          className="fixed bottom-[25px] right-[18px] max-w-[85px]"
          onClick={() => navigate("")}
        />
      </div>
    </Suspense>
  );
}
