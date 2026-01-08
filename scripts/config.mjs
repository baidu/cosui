/**
 * @file build config
 */
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import {resolve} from 'path';

dotenv.config({path: resolve(fileURLToPath(import.meta.url), '../../', '.env')});

export const production = {
    publicPath: {
        css: {
            pc: '//pss.bdstatic.com/r/www/cache/static',
            mobile: '//ms.bdstatic.com/se/static'
        },
        js: {
            pc: '//pss.bdstatic.com/r/www/cache/static',
            // www-wise esl 加载时会拼接 baseurl，所以这里只写相对路径
            mobile: './static'
        }
    }
};
export const development = {
    publicPath: {
        css: {
            pc: `${process.env.PC_STATIC_PREFIX || ''}/cache/static`,
            mobile: '/se/static'
        },
        js: {
            pc: `${process.env.PC_STATIC_PREFIX || ''}/cache/static`,
            mobile: './static'
        }
    },
    deploy: {
        pc: {
            serverDir: '/home/work/search/nodeserver/ssr/pc/node_modules',
            staticDir: `/home/work${process.env.PC_STATIC_PATH || '/search/pr-nginx/html'}/cache/static`
        },
        mobile: {
            serverDir: '/home/work/search/nodeserver/ssr/wise/node_modules',
            staticDir: '/home/work/sitedata/se/static',
            confDir: '/home/work/search/nodeserver/ssr/wise/conf'
        },
        hoth: {
            serverDir: '/home/work/search/hoth-node/nodeserver/node_modules',
            staticDir: '/home/work/search/hoth-node/nodeserver/static'
        }
    }
}
