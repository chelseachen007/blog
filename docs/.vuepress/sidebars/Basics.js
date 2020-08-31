/*
 * @Author: your name
 * @Date: 2020-05-18 13:49:13
 * @LastEditTime: 2020-05-20 14:44:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Blog\docs\.vuepress\sidebars\Basics.js
 */

module.exports = [
  "/Basics/",
  {
    title: "HTTP",
    children: [
      "/Basics/HTTP_history.md",
      "/Basics/HTTP_message.md",
      "/Basics/HTTP_cache.md",
      "/Basics/HTTP_https.md",
      "/Basics/HTTP_question.md",
    ],
  },
  {
    title: "Chorme",
    children: [
      "/Basics/Chorme_question.md",
      "/Basics/Chorme_EventLoop.md",
      "/Basics/Chorme_Render.md",
      "/Basics/Chrome_security.md",
      "/Basics/Chrome_V8.md",
      "/Basics/Chrome_session.md",
    ],
  },
  {
    title: "JavaScript",
    children: [
      "/Basics/JS_typeof.md",
      "/Basics/JS_module.md",
      "/Basics/write_throttle.md",
      "/Basics/TypeScript.md",
      "/Basics/JS_HighFunc.md",
      "/Basics/Reg.md",
    ],
  },
  {
    title: "React",
    children: [
      "/Basics/React_Redux.md",
      "/Basics/React_fiber.md",
      "/Basics/React_hooks.md",
    ],
  },
  {
    title: "Vue",
    children: [
      "/Basics/Vue_vue3.md",
      // "/Basics/JS_module.md",
      // "/Basics/JS_module.md",
    ],
  },

];
