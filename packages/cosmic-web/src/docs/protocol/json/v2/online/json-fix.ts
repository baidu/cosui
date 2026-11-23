/*
 * @file 在线示例：v2 Message 的 JSON 字符串修复
 */

/** Nesting limit, so deeply nested malformed input fails as SyntaxError instead of overflowing the stack. */
const MAX_CONTAINER_DEPTH = 100;

/** Repair missing separators, trailing commas and EOF closing brackets; never invent values. */
export function repairJson(text: string): string {
    if (typeof text !== 'string') {
        throw new TypeError('JSON text must be a string');
    }
    try {
        JSON.parse(text);
        return text;
    }
    catch {
        // Parse complete tokens before repairing punctuation outside strings.
    }
    let cursor = 0;
    const output: string[] = [];
    const fail = (): never => {
        throw new SyntaxError(`Cannot repair JSON at position ${cursor}`);
    };
    const whitespace = (): void => {
        const start = cursor;
        while (/[ \t\r\n]/.test(text[cursor] || '\0')) {
            cursor++;
        }
        output.push(text.slice(start, cursor));
    };
    const take = (): void => {
        output.push(text[cursor++]);
    };
    const string = (): void => {
        const start = cursor;
        cursor++;
        let closed = false;
        while (cursor < text.length) {
            const char = text[cursor];
            if (char === '\\') {
                // Skip the escaped character as a whole.
                cursor += 2;
                continue;
            }
            cursor++;
            if (char === '"') {
                closed = true;
                break;
            }
        }
        if (!closed) {
            fail();
        }
        const token = text.slice(start, cursor);
        JSON.parse(token);
        output.push(token);
    };
    let container: (object: boolean) => void = fail;
    let depth = 0;
    const value = (): void => {
        whitespace();
        const char = text[cursor];
        if (char === '{' || char === '[') {
            container(char === '{');
        }
        else if (char === '"') {
            string();
        }
        else {
            const start = cursor;
            while (cursor < text.length && !/[\s{}\[\],:"]/.test(text[cursor])) {
                cursor++;
            }
            const token = text.slice(start, cursor);
            if (!token) {
                fail();
            }
            // Reject broken numbers, constants and missing values instead of splitting/inventing them.
            JSON.parse(token);
            output.push(token);
        }
    };
    container = (object: boolean): void => {
        if (depth >= MAX_CONTAINER_DEPTH) {
            fail();
        }
        depth++;
        try {
            const close = object ? '}' : ']';
            take();
            whitespace();
            if (text[cursor] === close) {
                take();
                return;
            }
            while (cursor < text.length) {
                if (object) {
                    if (text[cursor] !== '"') {
                        fail();
                    }
                    string();
                    whitespace();
                    if (text[cursor] !== ':') {
                        fail();
                    }
                    take();
                }
                value();
                whitespace();
                const commaCursor = cursor;
                const comma = text[cursor] === ',' ? output.length : -1;
                if (comma !== -1) {
                    take();
                    whitespace();
                }
                // An object member cannot occur inside an array: close it before the member separator.
                if (!object && comma !== -1 && /^"(?:\\.|[^"\\])*"[ \t\r\n]*:/.test(text.slice(cursor))) {
                    cursor = commaCursor;
                    output.splice(comma);
                    output.push(close);
                    return;
                }
                // A completed array item followed by } ] has its two closing brackets reversed.
                if (!object && /^}[ \t\r\n]*\]/.test(text.slice(cursor))) {
                    const end = text.indexOf(']', cursor);
                    text = text.slice(0, cursor) + ']' + text.slice(cursor + 1, end) + '}' + text.slice(end + 1);
                }
                if (cursor === text.length || text[cursor] === close) {
                    if (comma !== -1) {
                        output.splice(comma, 1);
                    }
                    if (cursor === text.length) {
                        output.push(close);
                        return;
                    }
                    take();
                    return;
                }
                if (text[cursor] === '}' || text[cursor] === ']') {
                    fail();
                }
                if (comma === -1) {
                    output.push(',');
                }
            }
            fail();
        }
        finally {
            depth--;
        }
    };
    value();
    whitespace();
    if (cursor !== text.length) {
        // Only discard closing punctuation after one complete object/array, never another value.
        if (!/^[ \t\r\n]*[\[{]/.test(text) || !/^[}\] \t\r\n]+$/.test(text.slice(cursor))) {
            fail();
        }
    }
    const repaired = output.join('');
    JSON.parse(repaired);
    return repaired;
}
