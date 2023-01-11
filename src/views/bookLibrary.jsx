import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";

export default function Index(props) {
	const msg = `
		**本页面将提供一个搜书引擎，书库是各位书友制作的书源**
		`;
	return (
		<Layout>
			<ReactMarkdown className="prose lg:prose-xl">{msg}</ReactMarkdown>
		</Layout>
	);
}
