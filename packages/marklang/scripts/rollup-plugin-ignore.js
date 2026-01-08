export default function ignore(type) {
    let startFlag = '// node-build-remove-start';
    let endFlag = '// node-build-remove-end';
    if (type === 'browser') {
        startFlag = '// browser-build-remove-start';
        endFlag = '// browser-build-remove-end';
    }
    return {
        name: 'ignore',

        transform(code, id) {
            if (id.endsWith('.ts')) {
                const lines = code.split('\n');
                let ignore = false;

                const transformedCode = lines
                    .map(line => {
                        if (line.includes(startFlag)) {
                            ignore = true;
                            return '';
                        }
                        else if (line.includes(endFlag)) {
                            ignore = false;
                            return '';
                        }
                        else if (ignore) {
                            return '';
                        }
                        else {
                            return line;
                        }
                    })
                    .join('\n');

                return {
                    code: transformedCode,
                    map: null
                };
            }
        }
    };
}
