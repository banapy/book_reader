import { fetchMD5 } from '@/utils/md5Util'
import { readFileContent, getImgBase64FromSrc } from '@/utils'
export async function parseFile(file) {
    let extension = file.name
        .split(".")
        .reverse()[0]
        .toLocaleLowerCase();
    switch (extension) {
        case "epub":
            return parseEpub(file)
        default:
            throw "不解析文件类型"
    }
}
export function parseEpub(file) {
    const bookSchema = {
        author: "",
        charset: "",
        cover: "",
        description: "",
        format: "",
        key: "",
        md5: "",
        name: "",
        path: "",
        publisher: "",
        size: file.size,
        toc: []
    }
    let extension = file.name
        .split(".")
        .reverse()[0]
        .toLocaleLowerCase();
    bookSchema.format = extension
    return Promise.all([
        fetchMD5(file).then(res => {
            bookSchema.md5 = res
        }),
        readFileContent(file).then(async fileContent => {
            let book = ePub(fileContent, { openAs: "binary" });
            await book.ready
            console.log(book)
            const url = await book.coverUrl()
            const base64 = await getImgBase64FromSrc(url)
            bookSchema.cover = base64
            const metaData = book.package.metadata
            bookSchema.name = metaData.title
            bookSchema.author = metaData.creator
            bookSchema.description = metaData.description
            bookSchema.publisher = metaData.publisher
            bookSchema.toc = book.navigation.toc
        })
    ]).then(() => {
        return bookSchema
    })
}
