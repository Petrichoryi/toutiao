module.exports = {
  plugins: {
    // 自动添加浏览器厂商声明前缀，用来兼容不同的浏览器
    // Vuecli已经在内部默认配置了autoprefixer
    // autoprefixer: {
    //   //browsers用来配置要兼容到的系统（浏览器）环境
    //   //这个配置没有问题，但是写到这里会有控制台编译警告
    //   //因为Vuecli是通过项目中的.browserlistrc文件来配置要兼容的环境信息的
    //   browsers:['Android>=4.0','iOS>=8']
    // },
    // 把px转为rem
    'postcss-pxtorem': {
      // rootValue表示根元素字体大小，它会根据根元素大小进行单位转换
      // 使用基于lib-flexable的rem适配方案，则应该设计为设计稿的十分之一
      // Vant组件库是基于逻辑像素375写的
      // 设计稿都是基于物理像素750宽设计的
      // 所以设置成37.5，设计稿的测量单位需要/2
      rootValue: 37.5,
      // 需要转换的CSS属性，*表示所有的属性都要进行转换
      propList: ['*']
    }
  }
}
