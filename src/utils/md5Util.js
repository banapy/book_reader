import SparkMD5 from "spark-md5";
var pdfjsLib = window["pdfjs-dist/build/pdf"];
export const fetchMD5 = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      let md5 = await getFileMD5(file);
      if (file.name.indexOf(".pdf") > -1) {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (ev) => {
          pdfjsLib
            .getDocument({ data: (ev.target).result })
            .promise.then((pdfDoc) => {
              resolve(pdfDoc._pdfInfo.fingerprint + "-" + md5);
            })
            .catch((err) => {
              resolve(md5);
            });
        };
      } else {
        resolve(md5);
      }
    } catch (error) {
      reject("");
    }
  });
};
export const getFileMD5 = (file) => {
  return new Promise((resolve, reject) => {
    try {
      var blobSlice =
          File.prototype.slice ||
          File.prototype.mozSlice ||
          File.prototype.webkitSlice,
        chunkSize = 2097152, // 以每片2MB大小来逐次读取
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5(), //创建SparkMD5的实例
        fileReader = new FileReader();
      fileReader.onload = async (e) => {
        if (!e.target) {
          reject("");

          throw new Error();
        }
        spark.appendBinary(e.target.result); // append array buffer
        currentChunk += 1;
        if (currentChunk < chunks) {
          loadNext();
        } else {
          resolve(spark.end());
        }
      };

      const loadNext = () => {
        var start = currentChunk * chunkSize,
          end = start + chunkSize >= file.size ? file.size : start + chunkSize;

        fileReader.readAsBinaryString(blobSlice.call(file, start, end));
      };

      loadNext();
    } catch (error) {
      reject("");
    }
  });
};
