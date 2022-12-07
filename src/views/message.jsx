import MessageBoard from "@/components/MessageBoard";
import MyHeader from "@/components/Header";
import { Container } from "react-bootstrap";
export default function Index() {
	return (
		<Container>
			<MyHeader></MyHeader>
			{/* <Nothing></Nothing> */}
			<MessageBoard></MessageBoard>
		</Container>
	);
}
