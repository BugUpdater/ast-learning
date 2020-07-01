const babel = require('@babel/core');
const t = require('@babel/types');
const codeWithReturn = `const fn = (a, b) => { return a + b; };`;
const codeSimple = `const fn = (a, b) => a + b;`;
// expected result: const fn = function (a, b) { return a + b; };

const arrowFnPlugin = {
  visitor: {
    // match path
    ArrowFunctionExpression(path) {
      // (a, b) => { return a + b; }  or  (a, b) => a + b
      const node = path.node;
      const params = node.params; // (a, b)
      const body = node.body; // { return a + b; }  or  a + b
      
      let blockStatement;
      if (t.isBlockStatement(body)) {
        // { return a + b; }
        blockStatement = body;
      } else {
        // a + b
        const returnStatement = t.returnStatement(body);
        blockStatement = t.blockStatement([returnStatement]);
      }

      const functionExpression = t.functionExpression(null, params, blockStatement);

      // ArrowFunctionExpression ==> FunctionExpression
      path.replaceWith(functionExpression);
    }
  }
};

const transformCode = code => {
  const result = babel.transform(code, {
    plugins: [arrowFnPlugin],
  });
  return result.code;
};

console.log(`\n【 codeWithReturn result 】===>\n`, transformCode(codeWithReturn));
console.log(`\n【 codeSimple result 】===>\n`, transformCode(codeSimple));

// multiple statements
const codeMultiStats = `const fn = (a, b) => { const c = a + b; return c; };`;
console.log(`\n【 codeMultiStats result 】===>\n`, transformCode(codeMultiStats));
