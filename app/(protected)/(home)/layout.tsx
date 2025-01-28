import Header from "@/components/protected/Header";
import Navbar from "@/components/protected/Navbar";
import { LayoutPropsType } from "@/lib/types";
import styles from "@/styles/protected/home/layout/layout.module.css";

export default async function Layout({ children }: LayoutPropsType) {
  return (
    <div id={styles.page}>
      <Header />
      <Navbar />
      {children}
    </div>
  );
}
