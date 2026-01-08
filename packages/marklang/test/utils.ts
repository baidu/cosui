/* eslint-disable max-len */
const link = '[010-8888888](tel:010-888888)[文本链接](xx){type="link"}';
const markText = '## ==短答案==\n==**核心答案**==\n== 答案1==\n==答案2 ==';
const html = '<script>alert(1)</script><br>';
const katexText = '**数学公式：**\n$450 / 500 \\times 100\\% = 90\\%$\n所以，450是500的90%，即90%。\nkatex: $c = \\pm\\sqrt{a^2 + b^2}$\n\n$$(ax^2 + bx + c) \div (dx + e) = (fx + g) \div h$$\n';
const codeText = '```javascript\nconst a = 1;\nconsole.log(a);\n```\n```\ntext\n```\n';
const img = '![](https://eb118-file.cdn.bcebos.com/upload/394DB6209D2B661F0CABD3D836C1BCC9?x-bce-process=style/wm_ai)\n';
const list = '1. 第一列测试\n2. 第二列测试\n';
const del = '~one~ or ~~two~~ tildes.';
const footnote = 'A note[^1]\n[^1]: Big note.';
const table = '|用水量|到户价|明细|\n|-|:---|---:|\n|第一级用水量（每户每月20立方米及以下用水量）^1^ ^2^||供水价格1.8元/立方米<br>污水处理费0.95元/立方米|\n|第二级用水量（每户每月21到30立方米的用水量）|3.65元/立方米|供水价格1.8元/立方米<br>污水处理费0.95元/立方米|\n|第三级用水量（每户每月31立方米及其以上的用水量）|4.55元/立方米|供水价格3.6元/立方米<br>污水处理费0.95元/立方米|\n\n如果你需要了解更多信息，可以访问绍兴水网上营业厅\n';
const collaspeTable = '|项目|>|年利率（%）|\n| :---: | :---: | :---: |\n|一、个人住房公积金存款|>|1|\n|当年缴存|>|1.5|\n|上年结转|>|1.5|\n|二、个人住房公积金贷款|>|1|\n|首套|五年以下（含五年）|2.6|\n|^|五年以上|3.1|\n|第二套|五年以下（含五年）|不低于3.025|\n|^|>|五年以上|\n\n';
const citationList = [{a: 1}, {a: 2}, {a: 3}];
const directive = ':ml-citation[1]{data="citationList" test="a"}\n :ml-tts';
const nodataDirective = ':ml-citation[1]{data="data1" test="a"}\n:ml-citation[1]{test="a"}\n :::ml-data{name="data2"}\n \n:::\n:::ml-data\n \n:::\n';

export default {
    link,
    markText,
    katexText,
    codeText,
    img,
    html,
    list,
    del,
    footnote,
    table,
    collaspeTable,
    citationList,
    nodataDirective,
    directive
};
