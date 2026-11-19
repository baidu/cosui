export interface AsyncImportOptions {
    retryTimes?: number;
}

export async function asyncImport<T>(loader: () => Promise<T>, options?: AsyncImportOptions): Promise<T> {
    const {retryTimes = 3} = options ?? {};
    const maxRetryTimes = Math.max(0, retryTimes);
    let lastError = new Error('module load failed');

    for (let retryIndex = 0; retryIndex <= maxRetryTimes; retryIndex++) {
        try {
            return await loader();
        }
        catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
        }
    }

    throw lastError;
}

/**
 * 检测当前环境是否支持 ES2018 正则的后行断言 / 具名捕获组。
 */
export function isAdvancedRegExpSupported(): boolean {
    try {
        // eslint-disable-next-line prefer-regex-literals
        return !!new RegExp('(?<=1)(?<!1)');
    }
    catch {
        return false;
    }
}
