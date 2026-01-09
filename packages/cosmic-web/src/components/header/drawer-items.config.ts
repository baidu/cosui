import DefaultImg from './assets/default.png';
import DqaImg from './assets/dqa.png';
import ShopImg from './assets/shop.png';
import MedicalImg from './assets/medical.png';
import EducationImg from './assets/education.png';

interface ImageConfig {
    key: string;
    src: string;
    alt: string;
    selected: boolean;
}

interface ThemeConfig {
    day: string;
    pcDay: string;
    dark: string;
    token: string;
    business: string; // 业务线
    prefix: string; // 主题前缀
}

const imageGroups: Array<{ title: string, images: ImageConfig[] }> = [
    {
        title: 'Cosmic（当前线上）',
        images: [
            {key: 'default', src: DefaultImg, alt: '通用', selected: true},
            {key: 'dqa', src: DqaImg, alt: '智能化', selected: false},
            {key: 'shop', src: ShopImg, alt: '电商', selected: false},
            {key: 'medical', src: MedicalImg, alt: '医疗', selected: false},
            {key: 'education', src: EducationImg, alt: '教育', selected: false}
        ]
    }
];

const themeMap: Record<string, ThemeConfig> = {
    // 默认主题
    default: {
        day: 'cos-wise',
        pcDay: 'cos-pc',
        dark: 'cos-dark',
        token: 'cosmic',
        business: 'cosmic',
        prefix: 'cos'
    },
    dqa: {
        day: 'cos-wise',
        pcDay: 'cos-pc',
        dark: 'cos-dark',
        token: 'cos-dqa',
        business: 'cosmic',
        prefix: 'cos-dqa'
    },
    shop: {
        day: 'cos-wise',
        pcDay: 'cos-pc',
        dark: 'cos-dark',
        token: 'cos-shop',
        business: 'cosmic',
        prefix: 'cos-shop'
    },
    medical: {
        day: 'cos-wise',
        pcDay: 'cos-pc',
        dark: 'cos-dark',
        token: 'cos-medical',
        business: 'cosmic',
        prefix: 'cos-medical'
    },
    education: {
        day: 'cos-wise',
        pcDay: 'cos-pc',
        dark: 'cos-dark',
        token: 'cos-education',
        business: 'cosmic',
        prefix: 'cos-education'
    }
};

export {imageGroups, themeMap};
