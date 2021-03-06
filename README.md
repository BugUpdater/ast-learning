# ast-learning (2020.07)

> 学习AST的代码笔记整理

[Online AST Explorer](https://astexplorer.net/)

## Demo1 esprima-estraverse-escodegen
```sh
yarn start
# or
yarn demo1
```
- **esprima**: code -> ast
- **estraverse**: ast -> new ast (traverse and modify)
- **escodegen**: new ast -> code

## Demo2 babel-buildin-plugins
```sh
yarn demo2
```
Ref:　[Babel Documentation](https://babeljs.io)

- A **preset** item is a set of **plugins**.
- The `@babel/preset-env` includes `@babel/plugin-transform-arrow-functions`.

```json
// .babelrc
{
  "presets": ["@babel/preset-env"],
  "plugins": []
}
```

## Demo3 babel-custom-plugins
```sh
# arrow function
yarn demo3-1
# import partly
yarn demo3-2
```
Ref：[@babel/types Documentation](https://babeljs.io/docs/en/babel-types)

### Demo3-1 arrow function
```js
// input
const fn = (a, b) => { return a + b; };
const fn = (a, b) => a + b;
// output
const fn = function (a, b) { return a + b; };
```

### Demo3-2 import partly
```js
// input
import { Button, Icon } from 'vant';
// output
import Button from "vant/lib/Button";
import Icon from "vant/lib/Icon";
```

## Demo4 babylon
```sh
yarn demo4
```
[Babylon is a JavaScript parser used in Babel.](https://babeljs.io/docs/en/babylon)

- Use `babylon` to parse code rather than `@babel/core`.
- Use `@babel/traverse` and `@babel/generator` in `@babel/core`.
