import Voucher from "./voucher";

export default function RewardPopup(props) {
  const { close, listVoucher } = props;
  return (
    <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-[#2E2E2Ecc]">
      <div className="w-full max-w-[340px] rounded-[20px] bg-white px-[13px] pb-8 pt-3">
        <div className="flex justify-end">
          <img
            src="/minigame/images/close.png"
            className="cursor-pointer"
            onClick={close}
          />
        </div>

        {listVoucher?.[0]?.orders != 0 && (
          <>
            <div className="mx-auto mt-[14px] w-fit rounded-full bg-[#E5F1FE] px-[15px] py-[7px] text-center font-sf text-xl font-medium text-pink">
              Chúc mừng bạn đã trúng
            </div>
            <div className="mt-[7px] text-center font-sf text-xl font-semibold text-blue">
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
            </div>
            <div className="mt-[42px]">
              <span className="font-sf text-[13px] text-black">
                Phần thưởng của bạn là:
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
          </>
        )}

        {listVoucher?.[0]?.orders == 0 && (
          <>
            <img src="/minigame/images/miss.png" className="mx-auto mt-[30px]" />
            <div className="mb-[36px] mt-[18px] text-center font-sf text-xl font-semibold text-pink">
              Chúc bạn may mắn lần sau
            </div>
          </>
        )}
      </div>
    </div>
  );
}
