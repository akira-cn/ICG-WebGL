# ICG-WebGL

## [webgl.group](https://webgl.group/)

这是[《交互式计算机图形学——基于WebGL的自顶向下方法（第七版）》](https://book.douban.com/subject/26916420/)这本书的每章示例和部分练习题参考实现。

<img src="https://p5.ssl.qhimg.com/t01c52e0b46066ec4f8.jpg" width="300px">

作者官方的示例代码在[这里](https://github.com/esangel/WebGL)。

重构后的代码[在线运行](https://webgl.group/)

我们将重写官方实例的例子：

- 重构示例代码，增加必要的注释
- 使用Babel7
- 增加练习题参考答案
- 替换MV.js和MV2.js为[gl-matrix](https://github.com/toji/gl-matrix)
- 使用[transform-gl-matrix](https://github.com/akira-cn/babel-plugin-transform-gl-matrix)插件简化gl-matrix的API
- 重写部分Utils功能，组织到一个简单的工具库GLHelper中
- 使用Webpack打包，使用[glsl-shader-loader](https://github.com/migalooo/glsl-shader-loader)加载shader文件
- 使用[eslint-config-sprite](https://github.com/spritejs/eslint-config-sprite)
- 部分练习提供其他参考实现版本，比如[THREE.js](https://github.com/mrdoob/three.js)实现版本。
- 增加其他扩展例子实现

欢迎共同学习本教程的同学参与项目，为项目贡献PR。

## 代码本地运行

```bash
npm start
```

访问 http://localhost:3000

或者也可以独立运行某一章节的例子：

```bash
npm run chapter02
```

上面的命令运行第二章的例子。

## License

[MIT](LICENSE)
