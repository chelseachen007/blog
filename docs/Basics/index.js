const fs = require("fs");
const path = require("path");
const rootPath = path.join(process.cwd());
// 遍历所有文件
const walk = (path) => {
	const fslist = fs.readdirSync(path);
	return fslist.reduce((files, file) => {
		const filePath = path + "/" + file;
		// console.log(files, file);
		const stat = fs.statSync(filePath);

		if (file === "images") return files;
		if (stat.isDirectory()) {
			const fileObj = {
				file,
				fileChild: walk(filePath),
			};
			files.push(fileObj);
			return files;
		} else if (stat.isFile()) {
			if (/(.*)\.(md)/.test(file)) {
				return files.concat(file);
			}
		}

		return files;
	}, []);
};

const exists = (filePath) => fs.existsSync(filePath);
function handleFetchQueue(func, urls, max, callback) {
	const urlCount = urls.length;
	const requestsQueue = [];
	const results = [];
	const errList = [];
	let i = 0;
	const isCallBack = () => {
		const allLen = results.length + errList.length;
		if (allLen === urlCount) {
			"function" === typeof callback && callback(results, errList);
		}
	};
	const handleRequest = (url) => {
		const req = func(url)
			.then((res) => {
				console.log("当前并发： " + requestsQueue);
				results.push(res);
				const allLen = results.length + errList.length;
				if (allLen < urlCount && i + 1 < urlCount) {
					requestsQueue.shift();
					handleRequest(urls[++i]);
				} else {
					isCallBack();
				}
			})
			.catch((e) => {
				errList.push(e);
				isCallBack();
			});
		if (requestsQueue.push(req) < max) {
			handleRequest(urls[++i]);
		}
	};
	handleRequest(urls[i]);
}
const func = (file) => {
	return new Promise((resolve, reject) => {
		const fileData = fs.readFileSync(file);
		eObj;

		try {
			eObj = {
				title: getTitle(fileData.toString()),
				file,
			};
		} catch (err) {
			console.log("读出出错", file);
			console.log(err);
			reject({
				path: file,
				err: err.toString(),
			});
		}
		resoeObj;
	});
};
// 提取Markdown标题
const getTitle = async (fileNode) => {
	const match = /^#\s?([^#\n\r]*)/.exec(fileNode);
	return match ? match[1].trim() : fileNode.path;
};
// const SortLikeWin = require("../../utils/utils.js");
const getReadme = () => {
	const files = walk(rootPath);
	// const filesList = files.filter(v => parseFloat(v)).sort(SortLikeWin)
	if (!files.length) process.exit(2);
	const fileList = files.filter(exists);
	console.log(files, "filse");
	return;
	const max = 3;
	const callback = async (result, errList) => {
		const mulu = await result.reduce(async (pre, v, i) => {
			const title = await v.title;
			const prev = await pre;
			return `${prev} \n - [x]  [${title}](./${v.file}) `;
		}, "");
		fs.writeFileSync("./mulu.md", mulu);
	};
	handleFetchQueue(func, fileList, max, callback);
};
getReadme();
