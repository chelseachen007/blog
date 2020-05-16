/*
 * @Descripttion: 
 * @version: 
 * @Author: Chen
 * @Date: 2020-05-16 17:37:57
 * @LastEditors: Chen
 * @LastEditTime: 2020-05-16 17:43:28
 */ 


module.exports = {
    base: '/Blog/',
    title: 'Blog',
    description: 'Vuepress blog demo',
    themeConfig: {
      // 你的GitHub仓库，请正确填写
      repo: 'https://github.com/chelseachen007/Blog.git',
      // 自定义仓库链接文字。
      repoLabel: 'My GitHub',
      nav: [
          { text: 'Home', link: '/' },
          { text: 'FirstBlog', link: '/blog/FirstBlog.md' }
      ]
  }
  }