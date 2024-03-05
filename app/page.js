"use client";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import RewardPopup from "../components/reward-popup";
import { getTurnsRemain, getTurnsResult } from "./api/api";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false },
);

export default function Home() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [openPopup, setOpenPopup] = useState(false);

  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [customer, setCustomer] = useState();
  const [result, setResult] = useState();

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

  const dataWheel = [
    {
      image: { uri: "/minigame/images/prize-0.png", offsetX: 0, offsetY: 120 },
      style: { backgroundColor: "#CC2589", textColor: "white" },
    },
    {
      image: {
        uri: "/minigame/images/prize-1.png",
        offsetX: 0,
        offsetY: 120,
        sizeMultiplier: 0.6,
      },
      style: { backgroundColor: "#00ADDF", textColor: "white" },
    },
    {
      image: {
        uri: "/minigame/images/prize-2.png",
        offsetX: 0,
        offsetY: 120,
        sizeMultiplier: 0.6,
      },
      style: { backgroundColor: "#A3CF00", textColor: "white" },
    },
    {
      image: {
        uri: "/minigame/images/prize-3.png",
        offsetX: 0,
        offsetY: 120,
        sizeMultiplier: 0.6,
      },
      style: { backgroundColor: "#FF9000", textColor: "white" },
    },
    {
      image: {
        uri: "/minigame/images/prize-4.png",
        offsetX: 0,
        offsetY: 120,
        sizeMultiplier: 0.6,
      },
      style: { backgroundColor: "#962189", textColor: "white" },
    },
    {
      image: {
        uri: "/minigame/images/prize-5.png",
        offsetX: 0,
        offsetY: 120,
        sizeMultiplier: 0.8,
      },
      style: { backgroundColor: "#7EB8FF", textColor: "white" },
    },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      setLoading(true);
      getTurnsResult({
        phone: searchParams?.get("phone"),
        customerId: customer?.customerId,
      }).then((data) => {
        if (data?.code === "SUCCESS" || data?.code === "EXIST_AWARD") {
          setMustSpin(true);
          setResult(data?.data);
          setPrizeNumber(data?.data?.orders ?? 0);
        } else {
          console.log(data?.message);
        }
      });
    }
  };

  const onFinished = () => {
    setMustSpin(false);
    setAmount((prevAmount) => --prevAmount);
    setOpenPopup(true);
    setLoading(false);
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div
        className={
          "flex min-h-screen w-full flex-col place-content-between bg-[url('/minigame/images/bg-app.png')] bg-cover bg-no-repeat px-[27px] pb-[58px] pt-5 " +
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
            <div className="relative overflow-hidden text-[9px] text-xs">
              <div className="mx-auto w-fit rotate-[315deg]">
                <img
                  src="/minigame/images/arrow.png"
                  className="absolute inset-x-0 inset-y-0 z-10 mx-auto my-auto rotate-[45deg]"
                />
                <img
                  src="/minigame/images/outer.png"
                  className="absolute inset-x-0 inset-y-0 z-10 mx-auto my-auto w-full max-w-[445px]"
                />
                <Wheel
                  // disableInitialAnimation
                  pointerProps={{ style: { width: 0 } }}
                  outerBorderColor="#00000000"
                  innerBorderColor="#00000000"
                  radiusLineColor="#00000000"
                  perpendicularText={true}
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={dataWheel}
                  onStopSpinning={() => onFinished()}
                />
              </div>
            </div>
            <div className="mt-[30px] text-center font-sf text-sm text-white">
              Bạn có {amount} lượt chơi
            </div>
          </div>
        </div>

        {amount > 0 && (
          <button
            disabled={loading}
            className={
              "mx-auto mt-4 w-full max-w-[279px] rounded-full py-4 font-sf font-medium leading-4 text-white " +
              (loading ? "bg-[#cdcdcd]" : "bg-pink")
            }
            onClick={handleSpinClick}
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
              className="mx-auto mt-4 w-full max-w-[279px] rounded-full bg-pink py-4 font-sf font-medium leading-4 text-white"
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
