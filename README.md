# ast-learning
some code about ast demos

[Online AST Explorer](https://astexplorer.net/)

## Demo1
```sh
yarn start
# or
yarn demo1
```
- **esprima**: code -> ast
- **estraverse**: ast -> new ast (traverse and modify)
- **escodegen**: new ast -> code

## Demo2
```sh
yarn demo2
```
A **preset** item is a set of **plugins**.
The **@babel/preset-env** includes **@babel/plugin-transform-arrow-functions**.
```json
// .babelrc
{
  "presets": ["@babel/preset-env"],
  "plugins": []
}
```
