interface ThemeConfig {
    name: string;
    val: string;
}

interface BussinessConfig {
    name: string;
    themes: ThemeConfig[];
}

const BusinessMap: Map<string, BussinessConfig> = new Map([
    ['cosmic',
        {
            name: 'Cosmic',
            val: 'cosmic',
            themes: [
                {name: '通用', val: 'cos'},
                {name: '智能化 cos-dqa', val: 'cos-dqa'},
                {name: '电商 cos-shop', val: 'cos-shop'},
                {name: '医疗 cos-medical', val: 'cos-medical'},
                {name: '教育 cos-education', val: 'cos-education'}
            ]
        }
    ]
]);


export default BusinessMap;