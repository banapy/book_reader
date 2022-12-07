import MessageBoard from "@/components/MessageBoard";
import MyHeader from "@/components/Header";
import Layout from "@/components/Layout";

import { Container } from "react-bootstrap";
export default function Index() {
	return (
		<Layout>
			<MessageBoard></MessageBoard>
		</Layout>
	);
}
