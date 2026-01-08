/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 * @file cosmic 组件导出类型定义，用于给卡片开发做智能提示
 * - 导出的模块跟随使用本脚本的组件库发布，自动在组件库目录下创建 types 目录。
 */

/* eslint-disable max-len, comma-dangle,
    @typescript-eslint/no-var-requires,
    @typescript-eslint/no-require-imports,
    @typescript-eslint/no-use-before-define,
    @typescript-eslint/no-unnecessary-type-assertion
*/
import * as ts from 'typescript';
import {execSync} from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

const componentsBaseDir = path.resolve(__dirname, '../packages');
let dtsBaseDir = '';
let pkgName = '';

interface Location {
    start: {line: number, character: number};
    end: {line: number, character: number};
}

interface PropertyMeta {
  name: string;
  default?: string;
  description: string;
  required: boolean;
  type: string;
  loc?: Location;
  isAliased?: boolean;
  isStatic?: boolean;
}

interface EventMeta {
  name: string;
  description: string;
  type: string;
  loc?: Location;
}

const reservedMethods = new Set(['data', 'initData', 'attached', 'inited', 'detached', 'construct',
    'compiled', 'created', 'disposed', 'updated', 'slot']);

function getAttachFragment(className: string, propName?: string) {
    propName;
    const fragments = `
type __SLS_Constructor<T extends new (...args: any) => any> = T extends new (...args: infer A) => any ? (...args: A) => any: never;
type __SLS_ReservedKeys = 'data' | 'initData' | 'attached' | 'inited' | 'detached' | 'construct'
    | 'compiled' | 'created' | 'disposed' | 'updated' | 'slot';
type __SLS_InitDataType<T> = T extends {initData: () => infer P} ? P : {};

type __SLS_ComponentInstanceType = InstanceType<typeof ${className}>;
type __SLS_ComponentProps = __SLS_InitDataType<__SLS_ComponentInstanceType>;
type __SLS_Component_Constructor = __SLS_Constructor<typeof ${className}>;
  `;
    return fragments;
}

function isDefaultExport(node: ts.Node): boolean {
    return ts.getCombinedModifierFlags(node as ts.Declaration) === ts.ModifierFlags.ExportDefault;
}

function getComponentProps(sourceFile: ts.SourceFile): ts.TypeAliasDeclaration | undefined {
    let componentExportsNode: ts.TypeAliasDeclaration | undefined = undefined;
    ts.forEachChild(sourceFile, (node: ts.Node) => {
        if (ts.isTypeAliasDeclaration(node) && node.name.text === '__SLS_ComponentProps') {
            componentExportsNode = node;
        }
    });
    return componentExportsNode;
}

function getComponentConstructor(sourceFile: ts.SourceFile): ts.TypeAliasDeclaration | undefined {
    let componentExportsNode: ts.TypeAliasDeclaration | undefined = undefined;
    ts.forEachChild(sourceFile, (node: ts.Node) => {
        if (ts.isTypeAliasDeclaration(node) && node.name.text === '__SLS_Component_Constructor') {
            componentExportsNode = node;
        }
    });
    return componentExportsNode;
}

function findExportDefaultClass(sourceFile: ts.SourceFile) {
    let exportIdentify: string = '';
    let classDeclarations: Record<string, ts.ClassDeclaration> = {};
    let exportDefaultClass: ts.ClassDeclaration | undefined = undefined;
    // Walk the tree to search for classes
    ts.forEachChild(sourceFile, (node: ts.Node) => {
        if (isDefaultExport(node) && ts.isClassDeclaration(node) && node.name) {
            exportDefaultClass = node;
        }
        else if (ts.isClassDeclaration(node) && node.name) {
            classDeclarations[node.name.escapedText as string] = node;
        }
        else if (ts.isExportAssignment(node) && ts.isIdentifier(node.expression)) {
            exportIdentify = (node.expression as ts.Identifier).escapedText as string;
            if (classDeclarations[exportIdentify]) {
                exportDefaultClass = classDeclarations[exportIdentify];
            }
        }
    });

    return exportDefaultClass;
}

function preprocess(fileNames: string[]): void {
    // Build a program using the set of root file names in fileNames
    const compilerOptions = ts.getDefaultCompilerOptions();
    const compilerHost = ts.createCompilerHost(compilerOptions);
    let program = ts.createProgram(fileNames, compilerOptions, compilerHost);
    ts.createLanguageService;

    function processOne(rootNode: ts.ClassDeclaration, sourceFile: ts.SourceFile) {
        let className = rootNode.name!.text;
        let propsTypeIdentifier = ((((rootNode.heritageClauses?.[0] as ts.HeritageClause)
            ?.types?.[0] as ts.NodeWithTypeArguments)
            ?.typeArguments?.[0] as ts.TypeReferenceNode)
            ?.typeName as ts.Identifier)?.text;

        const oldText = sourceFile.text;
        const newText = oldText + getAttachFragment(className, propsTypeIdentifier);
        compilerHost.writeFile(sourceFile.fileName + '.preprocess.ts', newText, false);
    }

    // process all selected source files
    for (const sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile && fileNames.includes(sourceFile.fileName)) {
            try {
                const node = findExportDefaultClass(sourceFile);
                if (node) {
                    processOne(node, sourceFile);
                }
            }
            catch (e) {
                console.error('generate error:', sourceFile.fileName, (e as Error).message);
            }
        }
    }
}

interface ComponentMeta {
  __constructor?: PropertyMeta;
  category?: string;
  name: string;
  props: PropertyMeta[];
  methods: PropertyMeta[];
  events: EventMeta[];
  messages: EventMeta[];
  importedPropsName?: string[];
}

// 检查一个类型引用是否来源于 interface.ts 文件
function collectTypeFromInterfaceFile(typeNode: ts.TypeNode | undefined, checker: ts.TypeChecker, collected: Set<string>) {
    if (typeNode && ts.isTypeReferenceNode(typeNode)) {
        const symbol = checker.getTypeAtLocation(typeNode).getSymbol();
        const decl = symbol?.getDeclarations()?.[0];
        const fileName = decl?.getSourceFile()?.fileName || '';
        if (fileName.endsWith('/interface.ts') && symbol) {
            collected.add(symbol.getName());
        }
    }
}

/**
* 获取一个类实现的所有接口中的方法名集合
*
* @param classNode 类声明节点
* @param checker TypeScript 类型检查器
* @returns 实现的方法名集合
*/
function getAllImplementsMethodNames(classNode: ts.ClassDeclaration, checker: ts.TypeChecker): Map<string, { optional: boolean }> {
    const methodMap = new Map<string, { optional: boolean }>();

    if (!classNode.heritageClauses) {
        return methodMap;
    }

    // 找到 implements 子句
    const implClause = classNode.heritageClauses.find(c => c.token === ts.SyntaxKind.ImplementsKeyword);
    if (!implClause) {
        return methodMap;
    }

    for (const typeNode of implClause.types) {
        // typeNode.expression 是接口名的 Identifier 节点
        const interfaceType = checker.getTypeAtLocation(typeNode.expression);
        if (!interfaceType) {
            continue;
        }

        // 获取接口所有属性和方法的符号
        const props = interfaceType.getProperties();
        for (const prop of props) {
            const isOptional = (prop.flags & ts.SymbolFlags.Optional) !== 0;
            methodMap.set(prop.getName(), {optional: isOptional});
        }
    }
    return methodMap;
}


function generate(fileNames: string[]): Map<string, ComponentMeta> {
    const componentsMeta = new Map<string, ComponentMeta>();
    // Build a program using the set of root file names in fileNames
    const compilerOptions = ts.getDefaultCompilerOptions();
    const compilerHost = ts.createCompilerHost(compilerOptions);
    let program = ts.createProgram(fileNames, compilerOptions, compilerHost);
    ts.createLanguageService;
    // Get the checker, we will use it to find more about classes
    let checker = program.getTypeChecker();

    // 解析并返回被 Required 包裹的原始类型（如果存在的话
    function resolveOriginalPropsType(type: ts.Type): ts.Type {
        if (type.isUnion() || !type.symbol || !type.symbol.declarations) {
            return type;
        }

        const decl = type.symbol.declarations[0];
        if (!ts.isTypeAliasDeclaration(decl)) {
            return type;
        }

        const typeNode = decl.type;
        if (
            ts.isTypeReferenceNode(typeNode)
            && ts.isIdentifier(typeNode.typeName)
            && typeNode.typeName.text === 'Required'
            && typeNode.typeArguments?.length === 1
        ) {
            // 获取 Required<T> 的 T 类型
            const originalTypeNode = typeNode.typeArguments[0];
            const originalType = checker.getTypeFromTypeNode(originalTypeNode);
            return originalType;
        }

        return type;
    }

    // 检查给定的 ts.Symbol 是否表示一个可选的属性
    function isSymbolOptional(symbol: ts.Symbol): boolean {
        const decls = symbol.getDeclarations();
        if (!decls) {
            return false;
        }
        return decls.some(decl => {
            if (ts.isPropertySignature(decl) || ts.isPropertyDeclaration(decl)) {
                return !!decl.questionToken;
            }
            return false;
        });
    }

    function generateOne(rootNode: ts.ClassDeclaration, sourceFile: ts.SourceFile) {
        function generateEvents<T extends 'fire' | 'dispatch'>(
            rootNode: ts.Node,
            fireName: T
        ): T extends 'fire'
            ? { events: EventMeta[], importedEventName: string }
            : { messages: EventMeta[], importedMessageName: string } {
            const events: Record<string, EventMeta> = {};
            let importedTypeName: string = '';
            const travels = (node: ts.Node) => {
                if (ts.isPropertyAccessExpression(node)
                    && String(node.name.escapedText) === fireName
                    && node.expression.kind === ts.SyntaxKind.ThisKeyword
                    && ts.isCallExpression(node.parent)) {
                    if (ts.isStringLiteral(node.parent.arguments[0])) {
                        const eventName = node.parent.arguments[0].text;
                        const eventMeta: EventMeta = {
                            name: eventName,
                            type: 'undefined',
                            description: ''
                        };
                        const typeArg = node.parent.typeArguments?.[0];
                        if (typeArg) {
                            eventMeta.type = typeArg.getText();
                            if (ts.isIndexedAccessTypeNode(typeArg)) {
                                const objectType = typeArg.objectType;
                                if (ts.isTypeReferenceNode(objectType)) {
                                    // 暂时默认只有一种导入形式
                                    importedTypeName = objectType.typeName.getText();
                                }
                            }
                        } else {
                            const eventDataNode = node.parent.arguments[1];
                            if (eventDataNode) {
                                const symbol = checker.getSymbolAtLocation(eventDataNode);
                                if (symbol) {
                                    const dataType = checker.getTypeOfSymbolAtLocation(symbol, eventDataNode);
                                    eventMeta.type = checker.typeToString(dataType);
                                    eventMeta.description = ts.displayPartsToString(
                                        symbol.getDocumentationComment(checker)
                                    );
                                }
                            }
                        }

                        events[eventName] = eventMeta;
                    }
                }
                node.forEachChild(travels);
            };
            try {
                travels(rootNode);
            }
            catch (e) {
                console.error('generate event error:', fireName, (e as Error).message);
            }
            const result = {
                [fireName === 'fire' ? 'events' : 'messages']: Object.values(events),
                [fireName === 'fire' ? 'importedEventName' : 'importedMessageName']: importedTypeName
            };
            return result as any;
        }

        function generateProps(valueDesc: ts.Type, propsTypeName?: string) {
            // 拿到原始的未被 Required<> 修改的类型
            const originalPropsType = resolveOriginalPropsType(valueDesc);
            // 获取原始类型的可选标记 Map
            const originalOptionals = new Map<string, boolean>();
            for (const prop of originalPropsType.getProperties()) {
                const optional = isSymbolOptional(prop);
                originalOptionals.set(prop.getName(), optional);
            }

            const props: PropertyMeta[] = [];
            let propsAliasCount = 0;
            for (const prop of valueDesc.getProperties()) {
                const propName = prop.getEscapedName().toString();
                // 跳过私有字段
                if (propName.startsWith('_')) {
                    continue;
                }
                const subtype = checker.getTypeOfSymbolAtLocation(prop, rootNode);
                const documentation = ts.displayPartsToString(prop.getDocumentationComment(checker));
                // 是否使用类型别名引用
                const useAlias = !!propsTypeName;
                if (useAlias) {
                    propsAliasCount++;
                }

                const optional = originalOptionals.get(propName) ?? false;
                props.push({
                    name: propName,
                    description: documentation,
                    required: !optional,
                    type: useAlias
                        ? `${propsTypeName}['${propName}']`
                        : checker.typeToString(subtype),
                    isAliased: useAlias,
                });
            }
            return {props, propsAliasCount};
        }

        function generateConstructor(valueDesc: ts.Type) {
            const prop = valueDesc.symbol;
            return {
                name: 'constructor',
                description: ts.displayPartsToString(prop.getDocumentationComment(checker)),
                required: !(prop.flags & ts.SymbolFlags.Optional),
                type: checker.typeToString(valueDesc).slice(0, -7)
            };
        }
        function generateMethods(classNode: ts.ClassDeclaration) {
            const importedMethodsTypes = new Set<string>();
            const methods: PropertyMeta[] = [];
            let hasConstructor = false;

            // 接口声明里的方法名集合
            const interfaceMethodNames = getAllImplementsMethodNames(classNode, checker);

            for (const member of classNode.members) {
                if (ts.isMethodDeclaration(member) && !reservedMethods.has(member.name.getText())) {
                    const methodName = member.name.getText();

                    const prop = checker.getSymbolAtLocation(member.name)!;
                    const subtype = checker.getTypeOfSymbolAtLocation(prop, classNode);
                    // 检查参数类型
                    for (const param of member.parameters) {
                        collectTypeFromInterfaceFile(param.type, checker, importedMethodsTypes);
                    }

                    // 检查返回值类型
                    collectTypeFromInterfaceFile(member.type, checker, importedMethodsTypes);

                    // 检查是否 static
                    const isStatic = member.modifiers?.some(mod => mod.kind === ts.SyntaxKind.StaticKeyword) ?? false;
                    // 如果这个方法名不在接口声明里，且不是静态方法，直接跳过
                    if (!isStatic && !interfaceMethodNames.has(methodName)) {
                        continue;
                    }

                    methods.push({
                        name: prop.getEscapedName().toString(),
                        description: ts.displayPartsToString(prop.getDocumentationComment(checker)),
                        required: !(interfaceMethodNames.get(methodName)?.optional || false),
                        type: checker.typeToString(subtype),
                        isStatic
                    });
                }
                else if (ts.isConstructorDeclaration(member)) {
                    hasConstructor = true;
                }
            }
            return {
                methods,
                hasConstructor,
                importedMethodsNames: [...importedMethodsTypes]
            };
        }

        let props: PropertyMeta[] = [];
        let propsAliasCount = 0;
        let importedPropsName: string | undefined = undefined;
        {
            // 统一取出泛型参数节点
            let typeNode = ((((rootNode.heritageClauses?.[0])
                ?.types?.[0] as ts.NodeWithTypeArguments)
                ?.typeArguments?.[0]) as ts.TypeNode);

            if (!typeNode) {
                // 没有泛型参数的情况
                const propsDesc = getComponentProps(sourceFile)!;
                typeNode = propsDesc.type;
            }

            if (typeNode) {
                // 如果是 Required<T>，提取 T
                if (
                    ts.isTypeReferenceNode(typeNode)
                    && ts.isIdentifier(typeNode.typeName)
                    && typeNode.typeName.text === 'Required'
                    && typeNode.typeArguments?.length === 1
                ) {
                    typeNode = typeNode.typeArguments[0];
                }

                // 如果是类型引用，记录别名（如 ButtonProps）
                if (ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName)) {
                    importedPropsName = typeNode.typeName.text;
                }

                // 生成 props 元信息
                ({props, propsAliasCount} = generateProps(
                    checker.getTypeFromTypeNode(typeNode),
                    importedPropsName
                ));
            }
        }
        const {methods, hasConstructor, importedMethodsNames} = generateMethods(rootNode);
        const {events, importedEventName} = generateEvents(rootNode, 'fire');
        const {messages, importedMessageName} = generateEvents(rootNode, 'dispatch');
        let __constructor: PropertyMeta | undefined = undefined;
        if (hasConstructor) {
            const desc = getComponentConstructor(sourceFile);
            __constructor = generateConstructor(checker.getTypeFromTypeNode(desc!.type));
        }

        const allImportedTypes = new Set<string>();
        if (propsAliasCount && importedPropsName) {
            allImportedTypes.add(importedPropsName);
        }
        importedMethodsNames.forEach(t => allImportedTypes.add(t));
        if (importedEventName) {
            allImportedTypes.add(importedEventName);
        }
        if (importedMessageName) {
            allImportedTypes.add(importedMessageName);
        }

        componentsMeta.set(sourceFile.fileName, {
            name: rootNode.name?.text || '',
            props,
            methods,
            events,
            messages,
            __constructor,
            importedPropsName: allImportedTypes.size ? [...allImportedTypes] : undefined
        });
    }

    // process all selected source files
    for (const sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile && fileNames.includes(sourceFile.fileName)) {
            try {
                const node = findExportDefaultClass(sourceFile);
                if (node) {
                    generateOne(node, sourceFile);
                }
            }
            catch (e) {
                console.error('generate meta error:', sourceFile.fileName, (e as Error).message);
            }
        }
    }
    return componentsMeta;
}

function formatDescription(description: string, padding: number): string {
    const left = ' '.repeat(padding);
    const lines = description.split('\n');
    if (lines.length === 1) {
        return left + `/** ${lines[0]} */`;
    }
    return left + '/**\n'
        + lines.map(i => `${left} * ${i}\n`).join('')
        + left + ' */';
}

function getHomePageLink(name: string, category = 'cosmic'): string {
    return `baidu.github.io/cosui/components/${category}/${
        name.replace(/(?<=[a-z])([A-Z])/g, '-$1').toLowerCase()}`;
}

function buildExportClass(meta: ComponentMeta): string {

    const tplClassHeader = `/**
* @file generate for component: ${meta.name}
* @link file://./API.md
* @link file://./README.md
*/
import san from 'san';
${meta.importedPropsName && meta.importedPropsName.length ? `import {${meta.importedPropsName.join(', ')}} from './interface';` : ''}
/**
* ${meta.name} 组件
* @doc [官网](${getHomePageLink(meta.name, meta.category)})
*/
export default class ${meta.name} extends san.Component {
${meta.__constructor ? 'constructor' + meta.__constructor.type + ';' : ''}`;
    // 记录当前生成代码的 offset
    let currentLineIndex = tplClassHeader.split('\n').length;

    const props = ['{'];
    currentLineIndex += 1;
    for (const prop of meta.props) {
        if (prop.description) {
            const desc = `${formatDescription(prop.description, 4)}`;
            props.push(desc);
            currentLineIndex += desc.split('\n').length;
        }
        prop.loc = {
            start: {line: currentLineIndex, character: 4},
            end: {line: currentLineIndex, character: 4 + prop.name.length},
        };
        props.push(`    ${prop.name.includes('-')
            ? `"${prop.name}"` : prop.name}${!prop.required ? '?' : ''}: ${prop.type};`);
        currentLineIndex += 1;
    }
    props.push('  }');

    const events = ['{'];
    currentLineIndex += 2;
    for (const event of meta.events) {
        events.push(`    "${event.name}": ${event.type};`);
        event.loc = {
            start: {line: currentLineIndex, character: 4},
            end: {line: currentLineIndex, character: 4 + event.name.length},
        };
        currentLineIndex += 1;
    }
    events.push('  }');

    const messages = ['{'];
    currentLineIndex += 2;
    for (const msg of meta.messages) {
        messages.push(`    "${msg.name}": ${msg.type};`);
        msg.loc = {
            start: {line: currentLineIndex, character: 4},
            end: {line: currentLineIndex, character: 4 + msg.name.length},
        };
        currentLineIndex += 1;
    }
    messages.push('  }');

    const methods: string[] = [];
    currentLineIndex += 1;
    for (const method of meta.methods) {
        if (method.description) {
            const desc = `${formatDescription(method.description, 2)}`;
            methods.push(desc);
            currentLineIndex += desc.split('\n').length;
        }
        method.loc = {
            start: {line: currentLineIndex, character: 2},
            end: {line: currentLineIndex, character: 2 + method.name.length},
        };
        const staticPrefix = method.isStatic ? 'static ' : '';
        methods.push(`  ${staticPrefix}${method.name}${!method.required ? '?' : ''}: ${method.type};`);
        currentLineIndex += 1;
    }

    const result = `${tplClassHeader}
  static props: ${props.join('\n')};
  static events: ${events.join('\n')};
  static messages: ${messages.join('\n')};
${methods.join('\n')}
}
`;
    return result;
}

function copyDoc(dtsFileName: string, dtsFileSaveDir: string) {
    const dirname = path.dirname(dtsFileName);
    const interfaceFilePath = path.resolve(componentsBaseDir, dirname, 'interface.ts');
    if (fs.existsSync(interfaceFilePath)) {
        fs.createReadStream(interfaceFilePath).pipe(fs.createWriteStream(path.resolve(dtsFileSaveDir, 'interface.ts')));
    }
    const apiFilePath = path.resolve(componentsBaseDir, dirname, 'doc/api.md');
    if (fs.existsSync(apiFilePath)) {
        fs.createReadStream(apiFilePath).pipe(fs.createWriteStream(path.resolve(dtsFileSaveDir, 'API.md')));
    }
    const readmeFilePath = path.resolve(componentsBaseDir, dirname, 'doc/readme.md');
    if (fs.existsSync(readmeFilePath)) {
        fs.createReadStream(readmeFilePath)
            .pipe(fs.createWriteStream(path.resolve(dtsFileSaveDir, 'README.md')));
    }
}

function getComponentNameFromPath(filePath: string): string {
    const relativePath = path.relative(componentsBaseDir, filePath);
    const parts = relativePath.split(path.sep);
    return parts[2];
}

// 获取匹配指定模式的文件列表
function getMatchingFiles(pattern: string, baseDir: string): string[] {
    return glob.sync(pattern, {cwd: baseDir});
}

// 根据差异更新 baseComponents。未匹配或有差异的 incomingComponents 将被返回
function mergeComponentMaps(baseComponents: Map<string, ComponentMeta>, incomingComponents: Map<string, ComponentMeta>): Map<string, ComponentMeta> {
    const exclusiveComponents = new Map<string, ComponentMeta>();
    // 缓存：组件名 => { keyName, meta }
    const baseComponentCache: Record<string, { keyName: string, meta: ComponentMeta }> = {};
    for (const [baseFile, baseMeta] of baseComponents) {
        const componentName = getComponentNameFromPath(baseFile);
        baseComponentCache[componentName] = {keyName: baseFile, meta: baseMeta};
    }

    for (const [incomingFile, incomingMeta] of incomingComponents) {
        const componentName = getComponentNameFromPath(incomingFile);
        const baseEntry = baseComponentCache[componentName];
        if (!baseEntry) {
            exclusiveComponents.set(incomingFile, incomingMeta);
            continue;
        }
        else {
            const {keyName: baseFile, meta: baseMeta} = baseEntry;
            const mergedMeta: ComponentMeta = {...baseMeta};

            // 合并方法
            const newMethods = incomingMeta.methods.filter(
                m => !baseMeta.methods.some(bm => bm.name === m.name)
            );
            mergedMeta.methods = [...baseMeta.methods, ...newMethods];

            // 合并属性
            const newProps = incomingMeta.props.filter(
                p => !baseMeta.props.some(bp => bp.name === p.name)
            );
            mergedMeta.props = [...baseMeta.props, ...newProps];

            // 合并事件
            const newEvents = incomingMeta.events.filter(
                e => !baseMeta.events.some(be => be.name === e.name)
            );
            mergedMeta.events = [...baseMeta.events, ...newEvents];

            // 合并消息
            const newMessages = incomingMeta.messages.filter(
                m => !baseMeta.messages.some(bm => bm.name === m.name)
            );
            mergedMeta.messages = [...baseMeta.messages, ...newMessages];

            // 更新 baseComponents 和缓存
            baseComponents.set(baseFile, mergedMeta);
            baseComponentCache[componentName].meta = mergedMeta;
        }
    }

    return exclusiveComponents;
}

// 处理组件
function processComponentFiles(list: Map<string, ComponentMeta>, type: 'common' | 'mobile' | 'pc') {
    for (const [fileName, meta] of list) {
        let dtsFileName = path.relative(
            componentsBaseDir,
            fileName.replace('.ts.preprocess.ts', '.d.ts')
        );

        // 特定类型路径处理
        if (type === 'mobile') {
            dtsFileName = dtsFileName.replace('/mobile/', '/');
        }
        else if (type === 'pc') {
            dtsFileName = dtsFileName.replace('/pc/', '/');
        }
        else {
            // common 类型，无需修改路径
        }

        meta.category = dtsFileName.split('/')[0];
        let finalPath = path.resolve(dtsBaseDir, dtsFileName).replace(`/${pkgName}/src/`, '/');

        if (type === 'common') {
            finalPath = finalPath.replace('base', 'index');
        }
        else {
            finalPath = finalPath.replace(/\.mobile|\.pc/, '');
        }

        const dtsFileSaveDir = path.dirname(finalPath);
        fs.mkdirSync(dtsFileSaveDir, {recursive: true});
        fs.writeFileSync(finalPath, buildExportClass(meta));
        fs.writeFileSync(finalPath.replace(/\.d\.ts$/, '.meta.json'), JSON.stringify(meta));
        copyDoc(dtsFileName, dtsFileSaveDir);
    }
}


// 删除预处理产物
function unlinkSync(tmpfiles: string[]) {
    for (const fileName of tmpfiles.map(i => `${i}.preprocess.ts`)) {
        try {
            fs.unlinkSync(fileName);
        } catch (e) {
            // console.error(e);
        }
    }
}

async function main(pkgName: string) {
    // 白名单
    const componentLibs = ['cosmic', 'cosmic-card', 'cosmic-dqa'];
    if (!componentLibs.includes(pkgName)) {
        console.log(`${pkgName}不在白名单内，返回`);
        return;
    }

    // 组件路径模式
    const patternCommon = `${pkgName}/src/*/{index,base}.ts`;
    const patternMobile = `${pkgName}/src/*/{index.mobile,mobile/index}.ts`;
    const patternPC = `${pkgName}/src/*/{index.pc,pc/index}.ts`;

    const components = getMatchingFiles(patternCommon, componentsBaseDir);
    const componentsMobile = getMatchingFiles(patternMobile, componentsBaseDir);
    const componentsPC = getMatchingFiles(patternPC, componentsBaseDir);

    // 组件的绝对路径
    const files = components.map(file => path.resolve(componentsBaseDir, file));
    const filesMobile = componentsMobile.map(file => path.resolve(componentsBaseDir, file));
    const filesPC = componentsPC.map(file => path.resolve(componentsBaseDir, file));

    if (files.length || filesMobile.length || filesPC.length) {
        preprocess(files);
        preprocess(filesMobile);
        preprocess(filesPC);
        const result = generate(files.map(i => `${i}.preprocess.ts`));
        const resultMobile = generate(filesMobile.map(i => `${i}.preprocess.ts`));
        const resultPC = generate(filesPC.map(i => `${i}.preprocess.ts`));

        // 把 pc 的属性方法合入 mobile，返回只有 pc 有的组件
        const mobileExcluesPc =  mergeComponentMaps(resultMobile, resultPC);
        // 把 mobile 合入 通用，并返回 mobile
        const mobileExclusiveComponents = mergeComponentMaps(result, resultMobile);

        fs.mkdirSync(dtsBaseDir, {recursive: true});

        // 处理通用组件
        processComponentFiles(result, 'common');
        // 处理 mobile 组件（pc 有的这个组件的话，方法属性也已经合并了）
        processComponentFiles(mobileExclusiveComponents, 'mobile');
        // 处理 pc 独有的组件
        processComponentFiles(mobileExcluesPc, 'pc');

        // 删除预处理产生的临时文件
        unlinkSync(files);
        unlinkSync(filesMobile);
        unlinkSync(filesPC);

        const srcTokenDir = path.join(componentsBaseDir, `${pkgName}/src/token`);
        const srcUtilDir = path.join(componentsBaseDir, `${pkgName}/src/util`);
        if (fs.existsSync(srcTokenDir)) {
            execSync(`cp -rf ${srcTokenDir} ${dtsBaseDir}`);
        }
        if (fs.existsSync(srcUtilDir)) {
            execSync(`cp -rf ${srcUtilDir} ${dtsBaseDir}`);
        }
        console.log('write tokens success');
    }
}

const args = process.argv.slice(2);

// 获取 -p 参数
const packageIndex = args.indexOf('-p');
const pkg: string | null = packageIndex !== -1 ? args[packageIndex + 1] : null;

// 通过规则推导出组件库名 name 和组件库路径 entry
pkgName = pkg;
const entry = path.resolve(`packages/${pkg}`);
dtsBaseDir = entry + '/types';

main(pkgName);