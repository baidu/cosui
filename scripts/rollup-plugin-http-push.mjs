/**
 * @file wrap fis-http-push for rollup
 */

import { push } from 'fis-http-push';

export default function httpPush({receiver, tasks}) {
    return {
        name: 'rollup-plugin-http-push',
        writeBundle() {
            // FIXME: 这里加入延迟是避免多个 package 同时 push 造成首次输入邮箱卡顿的问题
            // 后续需要优化加入增量编译
            setTimeout(() => {
                if (!receiver) {
                    return;
                }
                push(tasks(), {receiver});
            }, 1000);
        }
    };
}
