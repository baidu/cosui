/**
 * @file Promise allSettled
 * @description 并行执行多个 Promise，返回所有 Promise 的执行结果
 */

interface PromiseSettledResult<T> {
    status: 'fulfilled' | 'rejected';
    value?: T;
    reason?: unknown;
}

export function allSettled<T>(promises: Array<Promise<T>>): Promise<
    Array<PromiseSettledResult<T>>
> {
    if (Promise.allSettled) {
        return Promise.allSettled(promises);
    }

    return new Promise(resolve => {
        const results: Array<PromiseSettledResult<T>> = [];
        let remaining = promises.length;

        if (remaining === 0) {
            resolve(results);
            return;
        }

        promises?.forEach((promise, index) => {
            promise.then(
                value => {
                    results[index] = {status: 'fulfilled', value};
                    if (--remaining === 0) {
                        resolve(results);
                    }
                },
                reason => {
                    results[index] = {status: 'rejected', reason};
                    if (--remaining === 0) {
                        resolve(results);
                    }
                }
            );
        });
    });
}