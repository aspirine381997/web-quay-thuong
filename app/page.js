"use client";
import { Suspense, useEffect, useState } from "react";
import RewardPopup from "../components/reward-popup";
import WheelComponent from "../components/wheel";
import { useRouter, useSearchParams } from "next/navigation";
import { getTurnsRemain, getTurnsResult } from "./api/api";

export default function Home() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [openPopup, setOpenPopup] = useState(false);

  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [allowSpin, setAllowSpin] = useState(false);
  const [customer, setCustomer] = useState();
  const [result, setResult] = useState();

  const [keyForWheelComponent, setKeyForWheelComponent] = useState(0);

  const segments = [
    "Chúc May Mắn Lần Sau",
    "Giải Nhất",
    "Giải Nhì",
    "Giải Ba",
    "Giải Tư",
    "Giải Khuyến Khích",
    "Chúc May Mắn Lần Sau",
    "Giải Nhất",
    "Giải Nhì",
    "Giải Ba",
    "Giải Tư",
    "Giải Khuyến Khích",
  ];
  const segColors = [
    "#CC2589",
    "#00ADDF",
    "#A3CF00",
    "#FF9000",
    "#962189",
    "#7EB8FF",
    "#CC2589",
    "#00ADDF",
    "#A3CF00",
    "#FF9000",
    "#962189",
    "#7EB8FF",
  ];
  const onFinished = (winner) => {
    setTimeout(() => {
      console.log(winner);
      setLoading(false);
      setAmount((prevAmount) => --prevAmount);
      setOpenPopup(true);
    }, 1000);
  };

  const getTurnAmount = () => {
    setLoading(true);
    getTurnsRemain({ phone: searchParams.get("phone") }).then((data) => {
      if (data?.code === "SUCCESS") {
        setCustomer(data?.data);
        setLoading(false);
      } else {
        console.log(data?.message);
      }
    });
  };

  useEffect(() => {
    getTurnAmount();
  }, [searchParams]);

  useEffect(() => {
    setAmount(customer?.amount);
  }, [customer]);

  const onSpin = () => {
    setLoading(true);
    getTurnsResult({
      phone: searchParams?.get("phone"),
      customerId: customer?.customerId,
    })
      .then((data) => {
        if (data?.code === "SUCCESS" || data?.code === "EXIST_AWARD") {
          setLoading(true);
          setResult(data?.data);
        } else {
          console.log(data?.message);
        }
      })
      .then(() => {
        setKeyForWheelComponent((prevKey) => prevKey + 1);
      })
      .then(() => setAllowSpin(true));
  };

  // const handleSpin = useCallback(() => {
  //   getTurnsResult({
  //     phone: searchParams?.get("phone"),
  //     customerId: customer?.customerId,
  //   })
  //     .then((data) => {
  //       if (data?.code === "SUCCESS" || data?.code === "EXIST_AWARD") {
  //         setLoading(true);
  //         setResult(data?.data);
  //       } else {
  //         console.log(data?.message);
  //       }
  //     })
  //     .then(() => {
  //       setKeyForWheelComponent((prevKey) => prevKey + 1);
  //     })
  //     .then(() => setAllowSpin(true));
  // }, [customer]);

  const navigate = (page) => {
    const phone = searchParams.get("phone");
    const id = customer?.customerId;
    router.push(`/${page}?phone=${phone}&customerId=${id}`);
  };

  const [scale, setScale] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // Kiểm tra kích thước màn hình và quyết định áp dụng scale hay không
      if (window.innerWidth < 285) setScale(3);
      else if (window.innerWidth >= 285 && window.innerWidth < 320) setScale(2);
      else if (window.innerWidth >= 320 && window.innerWidth < 356) setScale(1);
      else if (window.innerWidth >= 356) setScale(-1);
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
        return "zoom-90";
      case 2:
        return "zoom-80";
      case 3:
        return "zoom-70";

      default:
        return "";
    }
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div
        className={
          "flex min-h-screen w-full flex-col place-content-between bg-[url('/minigame/images/bg-app.png')] bg-cover bg-no-repeat px-[27px] pb-[58px] pt-10 " +
          checkScale()
        }
      >
        <div>
          {/* Header---- */}
          <div className="flex place-content-between items-center">
            <img src="/minigame/images/logo.png" onClick={() => navigate("")} />
            <div className="font-sf text-sm text-blue">
              <span className="mr-5" onClick={() => navigate("the-le")}>
                Thể lệ
              </span>
              <span onClick={() => navigate("qua-cua-ban")}>Quà của bạn</span>
            </div>
          </div>

          {/* Title---- */}
          <div className="mt-7 text-center text-pink">
            <div className="font-baloo font-black">
              <div className="text-[50px] leading-[42px] tracking-tighter">
                Săn
              </div>
              <div className="-mt-2.5 text-[70px] leading-[59px] tracking-tighter">
                Rồng vàng
              </div>
              <div className="mt-[1px] text-[30px] leading-[25px] tracking-tighter">
                Trúng ngàn ưu đãi
              </div>
            </div>

            <div className="mt-[14px] font-sf">
              <div className="text-[13px]">01/03/2024 - 01/06/2024</div>
              <div className="mt-[9px] text-[15px] font-extrabold leading-[38px]">
                TỔNG GIẢI THƯỞNG TRỊ GIÁ LÊN TỚI
              </div>
              <div className="text-[32px] font-black leading-[17px]">
                200.000.000 đ
              </div>
            </div>
          </div>

          {/* Spin---- */}
          <div className="mt-6">
            <div className="relative text-[9px] text-xs">
              <img
                src="/minigame/images/arrow.png"
                className="absolute inset-x-0 inset-y-0 mx-auto my-auto"
              />
              <img
                src="/minigame/images/outer.png"
                className="absolute inset-x-0 inset-y-0 mx-auto my-auto w-[274px]"
              />
              {!allowSpin && scale != 0 && scale != -1 && (
                <WheelComponent
                  key={keyForWheelComponent}
                  primaryColor="#00000000"
                  segments={segments}
                  segColors={segColors}
                  onFinished={(winner) => onFinished(winner)}
                  winningSegment={segments[result?.[0]?.orders]}
                  isOnlyOnce={false}
                  upDuration={500}
                  downDuration={600}
                  fontFamily="SF Pro Rounded"
                  size={130}
                  spinButtonId={"spinButton"}
                  onSpin={onSpin}
                  allowSpin={false}
                  customer={customer}
                />
              )}
              {!allowSpin && scale == -1 && (
                <WheelComponent
                  key={keyForWheelComponent}
                  primaryColor="#00000000"
                  segments={segments}
                  segColors={segColors}
                  onFinished={(winner) => onFinished(winner)}
                  winningSegment={segments[result?.[0]?.orders]}
                  upDuration={500}
                  downDuration={600}
                  fontFamily="SF Pro Rounded"
                  size={130}
                  spinButtonId={"spinButton"}
                  onSpin={onSpin}
                  allowSpin={false}
                  customer={customer}
                />
              )}
              {allowSpin && (
                <WheelComponent
                  key={keyForWheelComponent}
                  primaryColor="#00000000"
                  segments={segments}
                  segColors={segColors}
                  onFinished={(winner) => onFinished(winner)}
                  winningSegment={segments[result?.[0]?.orders]}
                  upDuration={500}
                  downDuration={600}
                  fontFamily="SF Pro Rounded"
                  size={130}
                  spinButtonId={"spinButton"}
                  onSpin={onSpin}
                  allowSpin={true}
                  customer={customer}
                />
              )}
            </div>
            <div className="mt-[30px] text-center font-sf text-sm text-white">
              Bạn có {amount} lượt chơi
            </div>
          </div>
        </div>

        {amount != 0 && (
          <button
            disabled={loading}
            id="spinButton"
            className={
              "mx-auto mt-4 w-full max-w-[279px] rounded-full py-4 font-sf font-medium leading-4 text-white " +
              (loading ? "bg-[#cdcdcd]" : "bg-pink")
            }
          >
            Quay ngay
          </button>
        )}

        {amount == 0 && (
          <>
            <div className="mt-1.5 text-center font-sf text-[13px] text-black">
              Để nhận lượt chơi vui lòng sử dụng dịch vụ NIPT tại MEDLATEC
              <br />
              Xem thể lệ chương trình “
              <span
                className="font-bold text-blue"
                onClick={() => navigate("the-le")}
              >
                Tại đây
              </span>
              ”
            </div>

            <button
              type="button"
              disabled={loading}
              className={
                "mx-auto mt-4 w-full max-w-[279px] rounded-full py-4 font-sf font-medium leading-4 text-white " +
                (loading ? "bg-[#cdcdcd]" : "bg-pink")
              }
              onClick={() =>
                window.open(
                  "https://medlatec.vn/dich-vu/xet-nghiem-nipt-sang-loc-truoc-sinh-khong-xam-lan",
                  "_blank",
                )
              }
            >
              Đăng ký xét nghiệm NIPT
            </button>
          </>
        )}
      </div>

      {openPopup && (
        <RewardPopup listVoucher={result} close={() => setOpenPopup(false)} />
      )}
    </Suspense>
  );
}
