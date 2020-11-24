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
            "/Basics/HTTP/HTTP_history.md",
            "/Basics/HTTP/HTTP_message.md",
            "/Basics/HTTP/HTTP_cache.md",
            "/Basics/HTTP/HTTP_https.md",
            "/Basics/HTTP/HTTP_question.md",
            "/Basics/HTTP/HTTP_JWT.md",
        ],
    },
    {
        title: "Chorme",
        children: [
            "/Basics/Chrome/Chorme_question.md",
            "/Basics/Chrome/Chorme_EventLoop.md",
            "/Basics/Chrome/Chorme_Render.md",
            "/Basics/Chrome/Chrome_security.md",
            "/Basics/Chrome/Chrome_V8.md",
            "/Basics/Chrome/Chrome_session.md",
        ],
    },
    {
        title: "JavaScript",
        children: [
            "/Basics/JavaScript/JS_base.md",
            "/Basics/JavaScript/JS_DesignPattern.md",
            "/Basics/JavaScript/JS_typeof.md",
            "/Basics/JavaScript/JS_module.md",
            "/Basics/JavaScript/JS_throttle.md",
            "/Basics/JavaScript/JS_TypeScript.md",
            "/Basics/JavaScript/JS_HighFunc.md",
            "/Basics/JavaScript/JS_Reg.md",
            "/Basics/JavaScript/JS_RedBook.md",
        ],
    },
    {
        title: "React",
        children: [
            "/Basics/React_Redux.md",
            "/Basics/React_fiber.md",
            "/Basics/React_hooks.md",
            "/Basics/React_development.md",
            // "/Basics/React_hooks.md",
        ],
    },
    {
        title: "Vue",
        children: [
            "/Basics/Vue_vue3.md",
            "/Basics/Vue_React.md",
            "/Basics/Vue_vite.md",
        ],
    },
    {
        title: "Webpack",
        children: [
            "/Basics/Webpack_base.md",
            "/Basics/Webpack_optimize.md",
            "/Basics/Webpack_principle.md",
            "/Basics/Webpack_question.md",
        ],
    },
    {
        title: "前端工程化",
        children: [
            "/Basics/Engineer_Lint.md",
            "/Basics/Engineer_Docker.md",
            "/Basics/Engineer_Jest.md",
            "/Basics/Enginneer_CICD.md",
            "/Basics/Enginneer_npm.md",
            "/Basics/Engineer_ALiCloud.md",
        ],
    },
    {
        title: "项目难点总结",
        children: [
            "/Basics/Project/Project_monitorr.md",
            "/Basics/Project/Project_simple.md",
            "/Basics/Project/Project.md",
            // "/Basics/Project/Enginneer_CICD.md",
            // "/Basics/Project/Enginneer_npm.md",
            // "/Basics/Project/Engineer_ALiCloud.md",
        ],
    },
];
