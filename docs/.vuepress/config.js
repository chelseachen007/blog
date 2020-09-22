const BasicsSidebar = require("./sidebars/Basics");
const AnimationSidebar = require("./sidebars/Animation");
const leetcodeSidebar = require("./sidebars/leetcode");
const FontEndArtSidebar = require("./sidebars/FontEndArt");
const nodeSidebar = require("./sidebars/node");

module.exports = {
  base: "/blog/",
  title: "Blog",
  description: "Vuepress blog demo",
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: "https://github.com/chelseachen007/Blog.git",
    // 自定义仓库链接文字。
    repoLabel: "My GitHub",
    nav: [
      { text: "Home", link: "/" },
      {
        text: "基础知识",
        items: [
          { text: "前端基础", link: "/Basics/" },
          // { text: "node", link: "/node/" },
        ],
      },
      {
        text: "算法",
        link: "/leetcode/",
      },
      {
        text: "做题咯",
        link: "/FontEndArt/",
      },
      // {
      //   text: "可视化相关",
      //   link: "/Animation/",
      // },
    ],
    sidebarDepth: 3,
    lastUpdated: "Last Updated", // string | boolean
    sidebar: {
      "/Basics/": BasicsSidebar,
      "/Animation/": AnimationSidebar,
      "/leetcode/": leetcodeSidebar,
      "/node/": nodeSidebar,
      "/FontEndArt/": FontEndArtSidebar,
    },
  },
};
