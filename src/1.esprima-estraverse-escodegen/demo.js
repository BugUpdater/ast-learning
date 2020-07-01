const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

const code = `function hello() {}`;
console.log(`\n【 code 】===>\n`, code);

// code -> ast
const ast = esprima.parseScript(code);
console.log(`\n━━━━━━━━━━ ast ━━━━━━━━━┓`);
console.log(JSON.stringify(ast, null, 2));
console.log(`━━━━━━━━━━ ast ━━━━━━━━━┛\n`);

// traverse ast
estraverse.traverse(ast, {
  enter(node, parent) {
    console.log(`enter ==> ${node.type} (parent: ${parent && parent.type})`);
    if (node.type === 'Identifier' && node.name === 'hello') {
      node.name = 'world';
    }
  },
  leave(node, parent) {
    console.log(`leave ==> ${node.type} (parent: ${parent && parent.type})`);
  }
});

const newCode = escodegen.generate(ast);
console.log(`\n【 newCode 】===>\n`, newCode);
