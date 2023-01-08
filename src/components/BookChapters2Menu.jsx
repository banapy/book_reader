import { ReactTree } from "@naisutech/react-tree";
import { useEffect, useRef, useState } from "react";
// const treeData = [];
function recurse(toc, parentId, treeData) {
	if (Array.isArray(toc) && toc.length) {
		for (let tocItem of toc) {
			const node = {
				id: tocItem.id,
				label: tocItem.label,
				parentId: parentId,
			};
			if (tocItem.subitems.length) {
				node.items = [];
			}
			treeData.push(node);
			recurse(tocItem.subitems, tocItem.id, treeData);
		}
		return treeData;
	} else {
		return;
	}
}
export default function Index(props) {
	const [realTreeData, set_realTreeData] = useState([]);
	const [defaultOpenNodes, set_defaultOpenNodes] = useState([]);
	const [loading, set_loading] = useState(false);
	useEffect(() => {
		set_loading(true);
		be.on("renderBook", (book) => {
			const treeData = recurse(book.metaData.toc, null, []);
			set_loading(false);
			set_realTreeData(treeData);
			// let openNodeIdList = [];
			let openNodeIdList = new Set();
			for (let i of treeData) {
				if (i.parentId !== null) {
					openNodeIdList.add(i.parentId);
				}
			}
			openNodeIdList = Array.from(openNodeIdList)
			set_defaultOpenNodes(openNodeIdList);
		});
	}, []);
	console.log(defaultOpenNodes, realTreeData);
	return (
		<div className="fixed left-0">
			<ReactTree
				defaultOpenNodes={defaultOpenNodes}
				nodes={realTreeData}
				loading={loading}
				showEmptyItems={false}
			></ReactTree>
		</div>
	);
}
