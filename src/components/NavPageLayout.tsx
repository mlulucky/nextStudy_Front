import Nav from "@/components/Nav";
import { ReactNode } from "react";

type NavPageLayoutProps = {
	children: ReactNode;
}

function NavPageLayout({children}: NavPageLayoutProps) {
	return (
		<div>
			<Nav/>
			{children}
		</div>
	)
}

export default NavPageLayout;

