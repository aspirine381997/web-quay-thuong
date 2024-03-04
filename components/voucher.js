export default function Voucher(props) {
  const {
    code,
    expireDate,
    createDate,
    id,
    orders,
    supplier,
    value,
    voucherInfo,
  } = props;

  return (
    <div className="mt-2.5 text-white">
      <div
        className={
          "flex w-full place-content-between rounded-md bg-gradient-to-r " +
          (supplier == "MEDLATEC"
            ? "from-[#1982EA] to-[#005CB7]"
            : "from-[#DE5DAA] to-[#CC2589]")
        }
      >
        <div className="bg-[url('/minigame/images/bg-ticket-1.png')] bg-left bg-no-repeat pb-1 pl-[15px] pr-3 pt-1.5">
          <div className="text-[10px] font-medium">
            Hệ thống y tế {supplier}
          </div>
          <div className="mt-2 text-[8px] font-medium">Trị giá</div>
          <div className="text-xl font-bold">
            {value?.toLocaleString("vi-VN")}
          </div>
          <div className="mt-2.5 text-[10px]">{voucherInfo}</div>
        </div>
        <div className="flex-shrink-0 bg-[url('/minigame/images/bg-ticket-2.png')] bg-right bg-no-repeat">
          <div className="flex h-full min-w-[100px] flex-col place-content-between items-center bg-[url('/minigame/images/bg-ticket-border.png')] bg-repeat-y py-2 pl-2.5 pr-[5px]">
            <div className="w-full">
              <img
                src={
                  supplier == "MEDLATEC"
                    ? "/minigame/images/logo.png"
                    : "https://cdn1.concung.com/themes/desktop4.1/image/logo-concung.png"
                }
                className="mx-auto h-[39px] max-w-[39px] object-contain"
              />
              <div className="mx-auto mt-1 max-w-[60px] text-center text-[10px] font-bold">
                {supplier} voucher
              </div>
            </div>
            <div className="flex w-full place-content-between items-center text-[9px]">
              <div>HSD:</div>
              <div>{expireDate}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-center text-black">Mã voucher: {code}</div>
    </div>
  );
}
