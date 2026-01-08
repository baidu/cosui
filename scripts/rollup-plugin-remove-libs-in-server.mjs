/**
 * @file remove libs which are not used in ssr file
 */

// for debug: https://astexplorer.net/

import { parse } from '@babel/parser';
import { default as _traverse} from '@babel/traverse';
const traverse = _traverse.default;
import * as t from '@babel/types';
import { default as _generate } from '@babel/generator';
const generate = _generate.default;

export default function removeLibsInServer(libs = []) {
    return {
        name: 'rollup-plugin-remove-libs-in-server',
        renderChunk(code, chunk, options) {
            if (options.format === 'cjs') {
                const ast = parse(code);
                updateCjsAst(ast, libs);
                let {
                    code: newCode,
                    map
                } = generate(ast);
                return {
                    code: newCode,
                    map
                };
            }

            return {
                code,
                map: null
            };
        }
    };
};

function updateCjsAst(ast, libs) {

    traverse(ast, {
        exit(path) {

            // remove libs only required in browser runtime
            // 两种情况：
            // 1. var versionCompare = require('versions-compare');
            // 2. require('versions-compare');
            if (libs && libs.length && t.isProgram(path.node)) {
                const case2 = [];
                path.node.body.forEach((item, index) => {
                    // 情况1
                    if (t.isVariableDeclaration(item)
                        && item.declarations.length
                        && t.isVariableDeclarator(item.declarations[0])
                        && t.isCallExpression(item.declarations[0].init)
                        && t.isIdentifier(item.declarations[0].init.callee)
                        && item.declarations[0].init.callee.name === 'require'
                    ) {
                        const requireId = item.declarations[0].init.arguments[0].value;
                        if (libs.includes(requireId)) {
                            item.declarations[0].init = t.nullLiteral();
                        }
                    }

                    // 情况2
                    if (t.isExpressionStatement(item)
                        && t.isCallExpression(item.expression)
                        && t.isIdentifier(item.expression.callee)
                        && item.expression.callee.name === 'require'
                    ) {
                        const requireId = item.expression.arguments[0].value;
                        if (libs.includes(requireId)) {
                            case2.push(index);
                        }
                    }
                });

                case2.forEach(indexLine => path.node.body.splice(indexLine, 1, 0));
            }
        }
    });
}
