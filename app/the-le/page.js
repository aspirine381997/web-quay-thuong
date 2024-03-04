"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const navigate = (page) => {
    const phone = searchParams.get("phone");
    const id = searchParams.get("customerId");
    router.push(`/minigame/${page}?phone=${phone}&customerId=${id}`);
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="mb-8 bg-[#F9F9F9]">
        <div className="rounded-b-[30px] bg-[url('/minigame/images/bg-thele.png')] bg-cover bg-no-repeat px-[27px] pb-3 pt-10">
          {/* Header---- */}
          <div className="flex place-content-between items-center">
            <img src="/minigame/images/logo.png" onClick={() => navigate("")} />
            <div className="font-sf text-sm">
              <span
                className="mr-5 text-[#FFD600]"
                onClick={() => navigate("the-le")}
              >
                Thể lệ
              </span>
              <span
                className="text-white"
                onClick={() => navigate("qua-cua-ban")}
              >
                Quà của bạn
              </span>
            </div>
          </div>

          <div className="mt-8 font-sf">
            <div className="text-center font-bold leading-[19px] text-[#FFD600]">
              THỂ LỆ CHƯƠNG TRÌNH
            </div>
            <div className="mt-2 text-center font-bold leading-[19px] text-white">
              SĂN RỒNG VÀNG TRÚNG NGÀN ƯU ĐÃI
            </div>
          </div>
        </div>

        <div className="mt-2.5 px-5">
          <img
            src="/minigame/images/banner.png"
            className="w-full rounded-[17px] px-[2.5px]"
          />
          <div className="mt-[26px] text-justify font-sf text-sm leading-[22px]">
            <p>
              <span className="font-bold">1. Đối tượng tham gia:</span> Khách
              hàng lẻ sử dụng dịch vụ NIPT của MEDLATEC trên toàn quốc (không áp
              dụng cho khách hàng của CTV) đều được quyền tham gia chương trình
              trên Ứng dụng My Medlatec phiên bản mới nhất.
            </p>
            <p className="mt-[15px] font-bold">
              2. My Medlatec khuyến khích người chơi dùng hết lượt chơi, để
              tránh sự cố thay đổi hệ thống làm mất lượt chơi của người dùng.
              Trong bất kỳ trường hợp nào, My Medlatec sẽ không hỗ trợ cộng lượt
              chơi cho người dùng.
            </p>
            <p className="mt-[15px] font-bold">
              3. Trong suốt thời gian diễn ra chương trình, số lượt chơi người
              chơi nhận được sẽ tương ứng với gói xét nghiệm NIPT người chơi sử
              dụng (Lưu ý: Số điện thoại đăng ký My medlatec trùng với số điện
              thoại sử dụng dịch vụ NIPT).
            </p>
            <p className="mt-[15px]">
              <span className="font-bold">4. Cách nhận thêm lượt quay:</span>{" "}
              Giới thiệu người khác sử dụng dịch vụ NIPT của MEDLATEC để nhận
              thêm lượt quay tương ứng với gói NIPT giới thiệu (Lưu ý: Cần dùng
              số điện thoại của bản thân để đăng ký dịch vụ NIPT cho người khác)
            </p>
            <p className="mt-[15px] font-bold">
              5. Thời gian diễn ra chương trình: Chương trình kéo dài từ Từ 00H
              10/03/2024 - 24h 01/06/2024
            </p>
            <div className="mt-[15px]">
              <span className="font-bold">6. Cơ cấu giải thưởng mỗi số:</span>
              <ul className="list-disc pl-6">
                <li>
                  Giải 1: 01 voucher sử dụng dịch vụ tại Hệ thống Y tế MEDLATEC
                  trên toàn quốc (trị giá 2.000.000vnđ) + 01 voucher mua sắm tại
                  hệ thống Con Cưng (trị giá 2.000.000vnđ)
                </li>
                <li>
                  Giải 2 (02 giải): 01 voucher sử dụng dịch vụ tại Hệ thống Y tế
                  MEDLATEC trên toàn quốc (trị giá 1.000.000vnđ) + 01 voucher
                  mua sắm tại hệ thống Con Cưng (trị giá 1.000.000vnđ)
                </li>
                <li>
                  Giải 3 (03 giải): 01 voucher sử dụng dịch vụ tại Hệ thống Y tế
                  MEDLATEC trên toàn quốc (trị giá 1.000.000vnđ)
                </li>
                <li>
                  Giải 4: 45 voucher sử dụng dịch vụ tại Hệ thống Y tế MEDLATEC
                  trên toàn quốc trị giá 100.000vnđ
                </li>
                <li>
                  Giải 5: 150 voucher sử dụng dịch vụ tại Hệ thống Y tế MEDLATEC
                  trên toàn quốc trị giá 50.000vnđ
                </li>
              </ul>
            </div>
            <p className="mt-[15px]">
              <span className="font-bold">7. Phương thức nhận thưởng:</span>{" "}
              Giải thưởng sẽ được lưu trong mục “Quà của bạn” trên website quay
              thưởng
            </p>
            <p className="mt-[15px] font-bold">
              8. Trong trường hợp phần thưởng gửi thất bại do lỗi hệ thống, My
              Medlatec sẽ gửi bù phần thưởng tương ứng.
            </p>
            <div className="mt-[15px]">
              <span className="font-bold">9. Quy định sử dụng voucher</span>
              <ul className="list-disc pl-6">
                <li>Địa điểm áp dụng: Toàn quốc</li>
                <li>
                  Mỗi mã voucher được phát trong chương trình mà người dùng
                  trúng thưởng chỉ có thể sử dụng 01 lần cho 01 người trên 01
                  hóa đơn
                </li>
                <li>
                  Các giải thưởng không quy đổi thành tiền mặt. Không trả lại
                  tiền thừa. Không áp dụng chung với các chương trình ưu đãi
                  khác
                </li>
              </ul>
            </div>
            <p className="mt-[15px] font-bold">
              10. Mỗi người chơi sẽ chỉ nhận được 01 giải thưởng có giá trị cao
              tại tất cả các chương trình của My Medlatec trong vòng 14 ngày
              liên tục tính từ ngày người chơi nhận được thông báo nhận thưởng
              có giá trị cao lần đầu tiên.
            </p>
            <p className="mt-[15px] font-bold">
              11. Nếu My Medlatec phát hiện người dùng vi phạm các tiêu chuẩn
              cộng đồng hoặc có hành vi gian lận trong chương trình, giải thưởng
              sẽ bị hủy và người dùng có thể bị khóa tài khoản, tước quyền tham
              gia trò chơi.
            </p>
            <p className="mt-[15px] font-bold">
              12. My Medlatec có quyền thay đổi các điều khoản và điều kiện,
              hoặc ngừng chương trình SĂN RỒNG VÀNG - TRÚNG NGÀN ƯU ĐÃI bất cứ
              lúc nào mà không cần bất cứ thông báo hoặc trách nhiệm với bất kỳ
              bên nào.
            </p>
            <p className="mt-[15px] font-bold">
              13. Mọi tranh chấp phát sinh trong thời gian chương trình, quyền
              quyết định cuối cùng thuộc về My Medlatec.
            </p>
            <p className="mt-[15px] font-bold">
              14. Thông tin liên hệ: Trong thời gian tham gia Chương trình nếu
              Khách hàng cần hỗ trợ, vui lòng liên hệ qua Tổng đài 1900 56 56
              56.
            </p>
          </div>
        </div>

        <img
          src="/minigame/images/back-home.png"
          className="fixed bottom-[25px] right-[18px]"
          onClick={() => navigate("")}
        />
      </div>
    </Suspense>
  );
}
