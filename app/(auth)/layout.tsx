import Navbar from "@/components/navbar/Navbar";
import { LayoutPropsType } from "@/lib/types";

export default async function Layout({ children }: LayoutPropsType) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
