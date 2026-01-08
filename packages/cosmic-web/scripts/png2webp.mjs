import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 获取命令行参数
const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('请在命令行中传入要处理的目录，例如：node png2webp.mjs ./images');
    process.exit(1);
}

const sourceDir = path.resolve(args[0]); // 转换为绝对路径

// 检查目录是否存在
if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
    console.error('传入的路径不存在或不是目录:', sourceDir);
    process.exit(1);
}

// 递归函数：遍历文件夹及其子文件夹
const traverseDir = dir => {
    // 读取目录内容
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error('读取文件夹失败:', err);
            return;
        }

        // 遍历目录中的所有文件
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            // 如果是文件夹，则递归调用 traverseDir
            if (stat.isDirectory()) {
                traverseDir(fullPath); // 深度遍历子文件夹
                return;
            }
            if (stat.isFile() && path.extname(file).toLowerCase() === '.png') {
                // 处理 PNG 文件，覆盖原文件
                const outputFilePath = fullPath.replace(/\.png$/, '.webp');

                // 使用 sharp 转换 PNG 为 WebP 并覆盖原文件
                sharp(fullPath)
                    .webp()
                    .toFile(outputFilePath, (err, info) => {
                        if (err) {
                            console.error('转换失败:', fullPath, err);
                        } else {
                            console.log('已转换并覆盖:', fullPath, info);
                            // 删除原 PNG 文件
                            fs.unlinkSync(fullPath);
                        }
                    });
            }
        });
    });
};

// 开始遍历源文件夹
traverseDir(sourceDir);
