
const babel = require('@babel/core');
const t = require('@babel/types');
const codePure = `import { Button, Icon } from 'vant'`;
// import Button from "vant/lib/Button";
// import Icon from "vant/lib/Icon";
const codeMixed = `import vant, { Button, Icon } from 'vant'`;
// import vant from "vant";
// import Button from "vant/lib/Button";
// import Icon from "vant/lib/Icon";

const importPlugin = libDir => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const node = path.node;
        const specifiers = node.specifiers; // { Button, Icon }  or  vant, { Button, Icon }
        const originSource = node.source.value; // 'vant'

        // import vant, { Button, Icon } from 'vant';
        const onlyImportDefault = specifiers.length === 1 && t.isImportDefaultSpecifier(specifiers[0]);
        if (!onlyImportDefault) {
          const multiImports = specifiers.map(sp => {
            let defaultSpecifier, source;
            if (t.isImportDefaultSpecifier(sp)) {
              defaultSpecifier = sp;
              source =  t.stringLiteral(originSource);
            } else {
              defaultSpecifier = t.importDefaultSpecifier(sp.local);
              source = t.stringLiteral(`${originSource}/${libDir}/${sp.local.name}`);
            }
            return t.importDeclaration([defaultSpecifier], source);
          })
          console.log(`\n━━━━━━━━━━ multiImports ━━━━━━━━━┓`);
          console.log(multiImports);
          console.log(`━━━━━━━━━━ multiImports ━━━━━━━━━┛\n`);

          // not replaceWith but replaceWithMultiple
          path.replaceWithMultiple(multiImports);
        }
      }
    }
  }
};

const transformCode = code => {
  const result = babel.transform(code, {
    plugins: [importPlugin('lib')],
  });
  return result.code;
};
console.log(`\n【 codePure result 】===>\n`, transformCode(codePure));
console.log(`\n【 codeMixed result 】===>\n`, transformCode(codeMixed));

