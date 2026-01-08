/* eslint-disable max-len */
const docs = import.meta.glob('../docs/**/*.ts');

export const getDocs = (path: string) => {
    path = path.startsWith('/') ? path.slice(1) : path;
    let dirPath = `../docs/${path}.ts`;

    return docs[dirPath] ? docs[dirPath]() : Promise.reject('load component fail');
};