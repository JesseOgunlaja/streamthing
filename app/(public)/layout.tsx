import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import { LayoutPropsType } from "@/lib/types";

export default function Layout({ children }: LayoutPropsType) {
	return (
		<div id="wrapper">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
