"use client";
import { Suspense, useEffect, useState } from "react";
import Voucher from "../../../components/voucher";
import { useRouter, useSearchParams } from "next/navigation";
import { getListAward } from "../../api/api";

export default function Home() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [listVoucher, setListVoucher] = useState();

  useEffect(() => {
    getListAward({
      phone: searchParams.get("phone"),
      customerId: searchParams.get("customerId"),
    }).then((data) => {
      if (data?.code === "SUCCESS") {
        setListVoucher(data?.data);
      } else {
        console.log(data?.message);
      }
    });
  }, [searchParams]);

  const navigate = (page) => {
    const phone = searchParams.get("phone");
    const id = searchParams.get("customerId");
    router.push(`/minigame/${page}?phone=${phone}&customerId=${id}`);
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="mb-8 min-h-screen bg-[#F1F3F4]">
        <div className="rounded-b-[30px] bg-[url('/images/bg-thele.png')] bg-cover bg-no-repeat px-[27px] pb-[21px] pt-10">
          {/* Header---- */}
          <div className="flex place-content-between items-center">
            <img src="/images/logo.png" onClick={() => navigate("")} />
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
        {listVoucher && listVoucher?.length != 0 && (
          <div className="mt-[22px] px-[22px] font-sf">
            <div className="mb-5 rounded-[20px] bg-white px-4 py-5">
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
                <Voucher
                  code={voucher?.code}
                  expireDate={voucher?.expireDate}
                  supplier={voucher?.supplier}
                  value={voucher?.value}
                  voucherInfo={voucher?.voucherInfo}
                />
              ))}
            </div>
          </div>
        )}

        {(!listVoucher || listVoucher?.length == 0) && (
          <>
            <img src="/images/miss.png" className="mx-auto mt-16" />
            <div className="mt-5 text-center font-sf">
              Bạn chưa có phần thưởng nào
            </div>
          </>
        )}

        <img
          src="/images/back-home.png"
          className="fixed bottom-[25px] right-[18px]"
          onClick={() => navigate("")}
        />
      </div>
    </Suspense>
  );
}
