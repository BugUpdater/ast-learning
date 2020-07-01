const babel = require('@babel/core');

const code = `const fn = (a, b) => a + b`;

let result;
// 1. use presets
result = babel.transform(code, {
  // preset-env includes plugin-transform-arrow-functions
  presets: ['@babel/preset-env'],
});
console.log(`\n【 presets result 】===>\n`, result.code);

// 2. use plugins
result = babel.transform(code, {
  plugins: ['@babel/plugin-transform-arrow-functions'],
});
console.log(`\n【 plugins result 】===>\n`, result.code);
