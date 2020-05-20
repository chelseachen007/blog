const BasicsSidebar = require("./sidebars/Basics");
const AnimationSidebar = require("./sidebars/Animation");

module.exports = {
  base: "/Blog/",
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
        text: "前端基础巩固",
        link: "/Basics/",
      },     {
        text: "可视化相关",
        link: "/Animation/",
      },
    ],
    sidebarDepth: 3,
    lastUpdated: "Last Updated", // string | boolean
    sidebar: {
      "/Basics/": BasicsSidebar,
      "/Animation/": AnimationSidebar,
    },
  },
};
