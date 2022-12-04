import { useEffect, useRef, useState } from 'react'
import Style from './index.module.scss'
import { loadScript } from '@/utils/index'
export default function Index() {
	const [location, setLocation] = useState(null)
	const ref = useRef()
	useEffect(async () => {
		const url = 'https://react-reader.metabits.no/files/alice.epub'
		const url2 = 'https://s3.amazonaws.com/moby-dick/moby-dick.epub'
		let book = ePub(url)
		let rendition = book.renderTo('book-viewer', {
			width: '600',
			height: '400',
		})
		rendition.display()
		return () => {
			book.destroy()
		}
	}, [])
	return <div style={{ height: '100vh' }} ref={ref} id="book-viewer"></div>
}
