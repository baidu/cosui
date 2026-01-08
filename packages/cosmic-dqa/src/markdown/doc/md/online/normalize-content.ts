/**
 * 部分策略数据是老数据，需要转成标准Markdown语法
 */

const MARKDOWN_PRE_PROCESSORS_REG = {
    // katex 公式： \\[xxx\\] => $$xxx$ 或 $$$xxx$$$
    mathReg: /\\\[([\s\S]+?)\\\]/gs,
    // 溯源替换： ^1^ => :ml-citation{ref="1" data="citationList}"
    citationOld: /\^(\d+)\^/g,
    citationAllOld: /\^(\^|\d|\s)+\^/g,
    // 溯源语法增加引用数据：:ml-citation{ref="1"} => :ml-citation{ref="1" data="citationList"}
    citation: /:ml-citation\{ref="([\d|,]+)"\}/g,

    // 短答案: ==**过期的化妆品通常不建议使用**=={.cos-headline .dqa-xx} => ##==过期的化妆品通常不建议使用==
    shortAnswer: /==\*\*(.*?)\*\*==\{(?:.*?)(?:\.cos-text-headline)(?:([^}]*))\}/g,

    // 核心答案： ==**过期的化妆品通常不建议使用**=={.dqa-xx} => ==**过期的化妆品通常不建议使用**==
    coreAnswer: /==\*\*(.*?)\*\*==\{(.*?)\.dqa-(.([^}]*))\}/g,

    // 回搜链接： [回搜文本](){"sa": "xxx"} => :ml-search[回搜文本]
    searchLink: /\[([^\]]*?)\]\(\)(\{["|']+sa["|']+:(?:([^}]*))})?/g
};

export function processMath(value: string) {
    return value.replace(/\\\[([\s\S]+?)\\\]/gs, (match: string, text: string) => {
        if (/^\s*\n/.test(text)) {
            return `$$${text}$$`;
        }
        return `$${text}$`;
    });
}

export function processCitationOld(value: string) {
    return value.replace(MARKDOWN_PRE_PROCESSORS_REG.citationAllOld, (text: string) => {
        // eslint-disable-next-line max-len
        const citationList: string[] = text.match(MARKDOWN_PRE_PROCESSORS_REG.citationOld)?.filter((item, index) => index < 2) || [];
        const refs = citationList.map((item: string) => {
            return item.slice(1, item.length - 1);
        }).join(',');
        return '\u200C' + `:ml-citation{ref="${refs}" data="citationList"}`;
    });
}

export function processCitation(value: string) {
    return value.replace(MARKDOWN_PRE_PROCESSORS_REG.citation, (text: string, refs: string) => {
        if (refs.indexOf(',') === -1) {
            return '\u200C' + `:ml-citation{ref="${refs}" data="citationList"}`;
        }
    });
}

export function processCoreAnswer(value: string) {
    return value.replace(MARKDOWN_PRE_PROCESSORS_REG.coreAnswer, function (
        match: string,
        coreAnswer: string,
        pre: string,
        daqSuffix: string,
        suf: string
    ) {
        if (/\.cos-text=headline/.test(pre) || /\.cos-text-headline/.test(suf)) {
            return `==**${coreAnswer}**=={${pre}.dqa-${daqSuffix}${suf}}`;
        }
        return `==**${coreAnswer}**==`;
    });
}

export function processShortAnswer(value: string) {
    return value.replace(MARKDOWN_PRE_PROCESSORS_REG.shortAnswer, function (match: string, shortAnswer: string) {
        return `## ==${shortAnswer}==`;
    });
}

export function processSearchLink(value: string) {
    return value.replace(MARKDOWN_PRE_PROCESSORS_REG.searchLink, function (match: string, text: string) {
        return '\u200C' + `:ml-search[${text}]`;
    });
}

export function normalizeContent(content: string) {
    let source = processSearchLink(content);
    source = processMath(source);
    source = processCitationOld(source);
    source = processCitation(source);
    source = processCoreAnswer(source);
    source = processShortAnswer(source);
    return source;
}
