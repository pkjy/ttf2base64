针对一些字体加密的网站，传入字体的ttf包，输出各个glyph对应的内容(base64格式)。

结合 https://github.com/pkjy/tiny-captcha-solver 项目将base64识别为数字，即可完成字体加密破解。

安装依赖的时需要在本地编译canvas，windows 如果碰到异常可以按下面的方式尝试：
1 下载GTK 
下载GTK，比如放到C盘
2 挂载代理来Build
这里假设本地7890端口开了代理

``` bash
node-gyp rebuild --GTK_Root=C:\GTK --proxy=http://127.0.0.1:7890
```

