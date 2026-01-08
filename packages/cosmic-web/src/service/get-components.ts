/* eslint-disable max-len */
const components = import.meta.glob('../../../(cosmic|cosmic-card|cosmic-dqa)/**/doc/*.ts');
const componentsDemo = import.meta.glob('../../../(cosmic|cosmic-card|cosmic-dqa)/**/doc/*.md');
const componentsDemoPc = import.meta.glob('../../../(cosmic|cosmic-card|cosmic-dqa)/**/doc/*.md', {
    query: {platform: 'pc'}
});
const componentsDemoMobile = import.meta.glob('../../../(cosmic|cosmic-card|cosmic-dqa)/**/doc/*.md', {
    query: {platform: 'mobile'}
});

const COMPONENTS_DEMO_MAP = {
    pc: componentsDemoPc,
    mobile: componentsDemoMobile,
    none: componentsDemo
};

export const getComponents = query => {
    const {
        packages,
        component,
        subId,
        docPath = 'index',
        platform = 'none'
    } = query;
    const prefix = `../../../${packages}/src/${component}/doc`;

    // 如果指定了单个 demo，则返回该 demo 组件
    if (subId) {
        const alias = `${prefix}/${subId}.md`;
        const componentsDemo = COMPONENTS_DEMO_MAP[platform];
        return componentsDemo[alias] ? componentsDemo[alias]() : Promise.reject('load component fail');
    }

    const alias = `${prefix}/${docPath}.ts`;

    return components[alias] ? components[alias]() : Promise.reject('load component fail');
};