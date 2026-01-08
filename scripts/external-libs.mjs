export const externalLibsExcludeInServer = [
    'versions-compare',
    'lottie-web',
];

export const externalLibs = [
    ...externalLibsExcludeInServer
];


export const COSMIC_PACKAGE_EXTERNAL_CONFIG = {
    'cosmic': {
        external: [],
        depComponentReg: [/(@cosui\/cosmic)\/(\S+)/]
    },
    'cosmic-dqa': {
        external: [/@cosui\/cosmic\//, /@cosui\/cosmic-card\//],
        depComponentReg: [/(@cosui\/cosmic)\/(\S+)/, /(@cosui\/cosmic-card)\/(\S+)/]
    },
    'default': {
        external: [/@cosui\/cosmic\//],
        depComponentReg: [/(@cosui\/cosmic)\/(\S+)/]
    }
}

export const COSMIC_EXTERNAL_PC_PATH_REG = /(cosmic|cosmic-card)\/pc/


/**
 *  解析为 external 的 cosmic 包依赖的 包名和组件名
 *
 * @param {*} packageName 包名
 * @param {*} path 组件路径
 *
 * @returns {Object} {
 *      matchCosmicExternal: 是否为 external 的 cosmic 包，
 *      depPkgName: 依赖的包名,
 *      depComponentPath: 依赖的组件路径
 * }
 */
export function parseExternalPath(packageName, path) {
    const finalPackageName = packageName.replace('@cosui/', '');
    const externalCosmicPackage = COSMIC_PACKAGE_EXTERNAL_CONFIG[finalPackageName] ||  COSMIC_PACKAGE_EXTERNAL_CONFIG.default;

    for (const cosmicReg of externalCosmicPackage.depComponentReg) {
        const temp = path.match(cosmicReg);
        if (temp) {
            return {
                matchCosmicExternal: true,
                depPkgName: temp[1],
                depComponentPath: temp[2]
            };
        }
    }

    return {
        matchCosmicExternal: false,
        depPkgName: '',
        depComponentPath: ''
    };
}