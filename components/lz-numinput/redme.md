# lzui - 数字调节器

## 如有问题 请联系 qq:391869000

## 配置项：
- useId：(String) , 组件标识。 默认：lz-numinput。 用于同一个页面多次复用组件时，使用相同回调监听方法时分别处理回调；
- value: (Number), 组件数值。 默认：0 ;
- min: (Number) ,  限制最小值。 默认：-Number.MAX_SAFE_INTEGER;
- max: (Number) , 限制最大值。 默认：Number.MAX_SAFE_INTEGER;
- step: (Number) , 数字调节步长。 默认：0 ，可以是小数;
- toFixed: (Number) , 格式化数字小数点后位数。默认：0 ;
- inputEnabled: (Boolean) , 是否允许键盘输入。 默认：false ，设置为 true 长按输入域可允许用户通过键盘输入数字;
- inputName: (String) , 输入域字段名。 默认：numinput ，可在页面form 中获取字段值;
- inputStyle: (String) , 输入域样式。默认：无，如果设置该值，必须是css 的 inner 写法 ;
- btnStyle: (String) , 按钮样式。默认：无，如果设置该值，必须是css 的 inner 写法 ;
- btnTheme: (String) , 按钮风格。默认：无，可选值 1 - 实心；2 - 镂空;
- skin: (String) , 按钮皮肤。默认：无，1 - 方形圆角 ；2 - 圆形；
- hideBtnDisabled: (Boolean) , 当按钮不可操作时 ，是否隐藏按钮。默认：false;
- hideNumZero: (Boolean) , 是否 隐藏初始值 0 ，默认：false。一般用于 商品列表 快速向购物车添加商品;

## 回调方法
- @change：(Function)(res) , res:{value:<数字值>,useId:<组件id>}。

## 使用说明
- 您可以自由使用本组件；
- 您不可以通过任何途径再次分享发布本组件；
- 本组件是lzui组件库的一个组件，其中使用的lzui-css是为了展示demo而加进去的，组件并没有依赖lzui-css。其他组件会陆续发布；
- 如有问题 请联系 qq:391869000，共同完善、探讨、学习、进步。