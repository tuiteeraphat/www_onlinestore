import { websiteName, footerMenu } from "../utils/constants";
import Link from "next/link";
import HeaderLink from "./HeaderLink";

export default function Footer() {
  const currenYear = () => new Date().getFullYear().toString();

  return (
    <footer className="flex justify-between items-center p-5 bg-footerBg text-footerFontColor flex-col md:flex-row mt-5">
      <span className="text-center">
        &copy; {currenYear()}{" "}
        <Link href={footerMenu.homeUrl}>{websiteName}</Link> สงวนลิขสิทธิ์
      </span>
      <div className="flex items-center justify-center flex-wrap">
        <HeaderLink href={footerMenu.aboutUrl}>เกี่ยวกับเรา</HeaderLink>
        <HeaderLink href={footerMenu.termsOfUseUrl}>
          ข้อกำหนดการใช้งาน
        </HeaderLink>
        <HeaderLink href={footerMenu.privacyUrl}>
          นโยบายความเป็นส่วนตัว
        </HeaderLink>
        <HeaderLink href={footerMenu.contactUrl}>ติดต่อเรา</HeaderLink>
      </div>
    </footer>
  );
}
