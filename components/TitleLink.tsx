import styles from "@/styles/utils/title-link.module.css";
import { Raleway } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const raleway = Raleway({ weight: ["400", "500", "600"], subsets: ["latin"] });

interface PropsType {
  link?: string;
}

const TitleLink = ({ link = "/" }: PropsType) => {
  return (
    <Link id={styles.link} className={raleway.className} href={link}>
      <Image
        id={styles["light-theme-logo"]}
        width={40}
        height={40}
        alt="Logo"
        src="/light-theme-logo.png"
        priority
      />{" "}
      <Image
        id={styles["dark-theme-logo"]}
        width={40}
        height={40}
        alt="Logo"
        src="/dark-theme-logo.png"
        priority
      />{" "}
      stream<span>thing</span>
    </Link>
  );
};

export default TitleLink;
