/**
 * @file mock umd module
 */

export default function () {
    return {
        name: 'vite-plugin-umd-mock',
        transform(raw: string, id: string) {
            if (id.includes('versions-compare')) {
                return `
                    export default function() {
                        return true;
                    }
                `;
            }
            if (id.includes('ubc-report-sdk') || id.includes('getCurrent') || id.includes('isValid')) {
                return 'export default function () {};';
            }
            if (id.includes('webb')) {
                return `const Webb = function () {};
                    Webb.prototype.send = function () {};
                    export default Webb;
                `;
            }
            if (id.includes('video-decoder-player')) {
                return `export function Player() {};export function support() {return false;};`;
            }
            return raw;
        }
    }
}
