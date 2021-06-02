## 学会提问

遇到问题，不要慌，常见的百分之八九十问题，网上都是有解决方案的。当搜索引擎都不能帮助你解决这个问题的时候，证明你遇到的问题“有点东西”了，这是好事情。需要去一些专业的技术提问社区去转转了，比如 [Stack Overflow](https://stackoverflow.com/)，或者 `GitHub Issues`（主要针对开源项目），还有就是此技术相关的社区，论坛，`Slack`，`Discord`等。

一个好的问题模板，例如 [vite ISSUE_TEMPLATE/bug_report](https://github.com/vitejs/vite/blob/main/.github/ISSUE_TEMPLATE/bug_report.md) 一般包含以下几个要素：

- **问题描述**：简短的表述清楚问题，切记啰嗦。
- **环境信息**：问题发生的环境（系统信息，软件版本，浏览器版本等）。
- **如何复现**：提供问题复现步骤1，2，3，可以配合适当的错误截图及说明。
- **预期结果**：希望达到什么样的结果。

解决问题，根据我多年来的实践总结，一般分为以下几步：

1. **抽象**: 用技术关键词去描述问题

2. 搜索

   ：根据关键词去搜索问题

   - 尽量避免使用百度，有条件的使用 [Google](https://www.google.com/)，没条件可以使用 [Bing](https://www.bing.com/)。
   - 如果中文搜索结果不理想，可以将关键词转为对应英语再去搜索。
   - 翻译软件：[DeepL 翻译](https://www.deepl.com/)，[Google 翻译](https://translate.google.cn/)等。
   - 学习一些搜索相关的高级技巧
     - [How to use search like a pro: 10 tips and tricks for Google and beyond](https://www.theguardian.com/technology/2016/jan/15/how-to-use-search-like-a-pro-10-tips-and-tricks-for-google-and-beyond)
     - [搜索引擎技巧](https://baike.baidu.com/item/搜索引擎技巧)
     - [百度搜索技巧](https://jingyan.baidu.com/article/0964eca24b71978285f536f4.html)
     - [Bing 高级搜索](http://help.bing.microsoft.com/apex/index/18/zh-CHS/10002)
     - [GitHub advanced search](https://github.com/search/advanced)

3. **延伸搜索**：围绕关键词，扩大搜索范围，查看一些相关链接

### **🎉 Google高级搜索的10个技巧**：

1）准确搜索（Exact phrase）
2）排除关键词（ Exclude terms）
3）用 OR (或)逻辑进行搜索（Either OR）
4）同义词搜索 ~（Synonym search）
5）站内搜索（Search within a site）
6）善用 * 星号（The power of the asterisk）
7）在两个数值之间进行搜索（Searching between two values）
8）在网页标题, 链接和主体中搜索关键词（Search for word in the body, title or URL of a page）
9）搜索相关网站（Search for related sites）
10）搜索技能的组合使用（Combine them）

### git 搜索



1. in:name xxx // 按照项目名搜索 
2. in:readme xxx // 按照 README 搜索 
3. in:description xxx // 按照 description 搜索 那么在这里面呢，我们又可以增加筛选条件 
4. stars:>xxx // stars 数大于 xxx 
5. forks:>3000 // forks 数大于 xxx 
6. language:xxx // 编程语言是 xxx 
7. pushed:>YYYY-MM-DD // 最后更新时间大于 YYYY-MM-DD

