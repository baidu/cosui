```san export=preview caption=公式

import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';
import marklang from 'marklang';

export default class BaseDemo extends Component {

    static template = `
        <div style="position: relative;">
            <cosd-markdown s-ref="markdown" content="{{text}}" config="{{config}}" />
        </div>
    `;

    static components = {
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            text: '## 行内公式\n'
            + '在文本中嵌入数学公式，如：勾股定理 $a^2 + b^2 = c^2$，欧拉公式 $e^{i\\pi} + 1 = 0$。\n圆的面积公式是$$S = \\pi r^2$$其中 $r$ 是半径。\n二次方程 $(ax^2 + bx + c = 0)$ 的解为$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$\n'
            + '## 块级公式\n'
            + '### 基础数学运算\n$$\\begin{aligned}a + b &= c \\\\d - e &= f \\\\g \\times h &= i \\\\ \\frac{j}{k} &= l\\end{aligned}$$\n'
            + '### 平方根和指数\n$$\\sqrt{x} = x^{\\frac{1}{2}}$$\n$$\\sqrt[n]{x} = x^{\\frac{1}{n}}$$\n$$e^{i\\theta} = \\cos\\theta$$\n'
            + '### 分数和比例\n$$\\frac{\\partial f}{\\partial x} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$\n$$\\frac{a}{b} = \\frac{c}{d} \\Rightarrow ad = bc$$\n'
            + '### 求和与积分\n'
            + '#### 求和公式\n $$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$\n$$\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}$$\n'
            + '#### 积分公式\n$$\\int_a^b f(x) dx = F(b) - F(a)$$\n$$\\int_{-\\infty}^{+\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$\n$$\\int_0^{\\pi} \\sin x dx = 2$$\n'
            + '### 微分方程 \n$$\\frac{dy}{dx} = ky \\Rightarrow y = Ce^{kx}$$\n$$\\frac{d^2y}{dx^2} + \\omega^2 y = 0 \\Rightarrow y = A\\cos(\\omega x) + B\sin(\\omega x)$$\n'
            + '### 矩阵运算\n$$\\begin{pmatrix}a & b \\\\c & d\\end{pmatrix}\\begin{pmatrix}x \\\\y\\end{pmatrix}=\\begin{pmatrix}ax + by \\\\cx + dy \\end{pmatrix}$$\n行列式：\n$$\\det\\begin{pmatrix}a & b \\\\c & d\\end{pmatrix} = ad - bc$$\n'
            + '### 统计学公式\n'
            + '#### 正态分布\n $$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$\n'
            + '#### 贝叶斯定理\n $$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$$\n'
            + '#### 标准差\n $$\\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N}(x_i - \\mu)^2}$$\n'
            + '### 三角函数 \n $$\sin^2\\theta + \\cos^2\\theta = 1$$ \n $$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$$ \n $$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$ \n'
            + '### 级数展开 \n'
            + '#### 泰勒级数 \n $$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$$\n'
            + '#### 指数函数展开 \n $$e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$$\n'
            + '#### 正弦函数展开 \n $$\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$$\n'
            + '### 复数运算 \n 复数的一般形式：\n$z = a + bi$ \n复数的模：\n$|z| = \\sqrt{a^2 + b^2}$\n复数的乘法：\n$$(a + bi)(c + di) = (ac - bd) + (ad + bc)i$$\n德摩弗定理：\n$$(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)$$\n'
            + '### 极限 \n $$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$\n$$\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e$$\n$$\\lim_{n \\to \\infty} \\sqrt[n]{n} = 1$$\n'
            + '### 组合数学 \n排列数：$P(n,r) = \\frac{n!}{(n-r)!}$ \n组合数：$C(n,r) = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}$ \n二项式定理：\n$$(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^k$$\n'
            + '### 向量运算 \n向量的点积：$\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta$ \n向量的叉积：$\\vec{a} \\times \\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta \\vec{n}$ \n 三维向量的叉积：\n $$\\vec{a} \\times \\vec{b} = \\begin{vmatrix}\\vec{i} & \\vec{j} & \\vec{k} \\\\a_1 & a_2 & a_3 \\\\b_1 & b_2 & b_3\\end{vmatrix}$$'
        };
    }
    attached() {
        const markdown = this.ref('markdown');
        console.log(markdown.getDirectives());
    }
}
```
