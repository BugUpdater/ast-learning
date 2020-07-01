const babylon = require('babylon');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');

const code = `const arr = [ ...arr1, ...arr2 ];`;
// expected result: var arr = [].concat(arr1, arr2);

const ast = babylon.parse(code, {
  sourceType: 'module',
});

traverse(ast, {
  VariableDeclaration(path) {
    const node = path.node;
    const declarations = node.declarations;
    // After path.replaceWith, it will traverse the new node, so there will be two declarations logs.
    console.log(`\n【 declarations 】===>\n`, declarations);
    
    const kind = 'var';
    const beforeReplace = node.kind !== kind && declarations.length === 1 && t.isArrayExpression(declarations[0].init);
    if (beforeReplace) {
      const { init: originInit, id: varName } = declarations[0];
      const args = originInit.elements.map(item => item.argument);
      const callee = t.memberExpression(t.arrayExpression(), t.identifier('concat'), false);
      const init = t.callExpression(callee, args);
      const declarator = t.variableDeclarator(varName, init);
      const variableDeclaration = t.variableDeclaration(kind, [declarator]);
      path.replaceWith(variableDeclaration);
    }
  }
});

const result = generator(ast);
console.log(`\n【 result 】===>\n`, result.code);
