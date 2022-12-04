import Login from "@/components/Login";
import MyHeader from "@/components/Header";

import {useNavigate} from 'react-router-dom'
export const getServerSideProps = async (ctx) => {
	return {
		props: {},
	};
};

export default function Index() {
	const navigator = useNavigate();
	return (
		<div className="container-sm">
			<MyHeader></MyHeader>
			<Login onLogin={e=>navigator("/home")}></Login>
		</div>
	);
}
