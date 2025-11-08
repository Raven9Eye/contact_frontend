# 代码标准

本代码标准基于 [Google JavaScript 风格指南](https://google.github.io/styleguide/jsguide.html) 和 [W3C HTML/CSS 标准](https://www.w3.org/standards/webdesign/htmlcss)。

## HTML 规范

1. **文件结构**
   - 使用 UTF-8 编码
   - 每个 HTML 文件开头必须包含 DOCTYPE 声明
   - 使用语义化标签（如 `<header>`, `<nav>`, `<main>`, `<footer>`）

2. **命名规范**
   - `id` 使用驼峰命名法（如 `userProfile`）
   - `class` 使用短横线命名法（如 `contact-item`）

3. **格式**
   - 缩进使用 2 个空格
   - 每行不超过 100 个字符
   - 标签属性使用双引号

## CSS 规范

1. **选择器**
   - 避免使用通用选择器 `*`
   - 优先使用类选择器
   - 避免过度嵌套（不超过 3 层）

2. **属性顺序**
   - 布局属性（display, position, float, etc.）
   - 盒模型属性（width, height, margin, padding, etc.）
   - 视觉属性（color, background, border, etc.）
   - 字体属性（font-family, font-size, etc.）
   - 其他属性

3. **格式**
   - 每条规则独占一行
   - 属性名冒号后添加一个空格
   - 选择器和 `{` 之间添加一个空格

## JavaScript 规范

1. **变量声明**
   - 使用 `const` 声明不可变变量
   - 使用 `let` 声明可变变量
   - 避免使用 `var`

2. **命名规范**
   - 变量和函数使用驼峰命名法（如 `getContacts()`）
   - 常量使用全大写加下划线（如 `API_BASE_URL`）
   - 类名使用帕斯卡命名法（如 `ContactManager`）

3. **函数**
   - 函数应该有明确的单一职责
   - 函数参数不宜过多（建议不超过 4 个）
   - 使用箭头函数作为回调函数

4. **注释**
   - 为复杂逻辑添加注释
   - 为函数添加 JSDoc 注释

5. **格式**
   - 缩进使用 2 个空格
   - 语句结束使用分号
   - 花括号使用 K&R 风格（左花括号在同一行）

## 最佳实践

1. **性能优化**
   - 减少 DOM 操作
   - 使用事件委托
   - 避免在循环中执行耗时操作

2. **错误处理**
   - 对 API 请求进行错误处理
   - 使用 try-catch 处理可能的异常

3. **代码可读性**
   - 使用有意义的变量和函数名
   - 保持函数短小精悍
   - 适当添加空行分隔代码块