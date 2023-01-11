import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
	Bars3Icon,
	BellIcon,
	XMarkIcon,
	LinkIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom } from "@/atoms";
import { useNavigate } from "react-router-dom";

const navigation = [
	{ name: "书架", path: "/", current: false, href: "" },
	{ name: "书城", path: "/bookLibrary", current: false, href: "" },
	{ name: "导入", path: "/uploadBook", current: false, href: "" },
	{ name: "留言", path: "/message", current: false, href: "" },
	{ name: "关于", path: "/about", current: false, href: "" },
	{
		name: "github",
		href: "https://github.com/banapy/book_reader",
		path: "",
		current: false,
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Index() {
	const auth = useRecoilValue(authAtom);
	const navigate = useNavigate();
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div
									onClick={(e) => navigate("/")}
									className="cursor-pointer flex flex-shrink-0 items-center text-white font-bold text-xl"
								>
									{auth.userInfo ? auth.userInfo.bookRoomName : "书斋"}
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href ? item.href : undefined}
												onClick={(e) => item.path && navigate(item.path)}
												className={classNames(
													item.current
														? "bg-gray-900 text-white"
														: "text-gray-300 hover:bg-gray-700 hover:text-white",
													"px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pt-2 pb-3">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href ? item.href : undefined}
									onClick={(e) => item.path && navigate(item.path)}
									className={classNames(
										item.current
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block px-3 py-2 rounded-md text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
