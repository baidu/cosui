import * as fs from 'fs';

// 覆盖率阈值
const COVERAGE_THRESHOLD = 98;
// 使用了端能力组件列表
const BOXX_COMPONENTS_LIST = [
  '.drawer.mobile.ts',
  '.card.mobile.ts',
  '.swiper.mobile.ts', 
  '.share.mobile.ts',
  '.dialog.mobile.ts'];
// 端能力组件覆盖率阈值
const BOXX_COVERAGE_THRESHOLD = 90;
const REPORT_FILE = "./e2e-coverage/index.txt";
let isFailed = 0;

// 检查文件是否存在
if (!fs.existsSync(REPORT_FILE)) {
  console.error(`覆盖率报告文件不存在: ${REPORT_FILE}`);
  process.exit(1);
}

// 读取覆盖率报告文件
const reportContent = fs.readFileSync(REPORT_FILE, 'utf-8');

console.log('===========检查覆盖率报告文件===========');
console.log(reportContent);
console.log('=====================================');

// 按行拆分报告内容
const lines = reportContent.trim().split('\n');

// 从第三行开始遍历，不包括最后一行
for (let i = 3; i < lines.length - 1; i++) {
  const line = lines[i];

  // 提取文件名和覆盖率信息
  const [file, , , , coverage,] = line.trim().split('|');

  // 将覆盖率百分比转换为数字
  const coveragePercentage = parseFloat(coverage.replace('%', ''));

  // const isUseBdbox = BOXX_COMPONENTS_LIST.includes(file.trim());
  const useCoverage = BOXX_COMPONENTS_LIST.includes(file.trim()) ? BOXX_COVERAGE_THRESHOLD : COVERAGE_THRESHOLD;

  // 检查覆盖率是否小于阈值
  if (coveragePercentage < useCoverage) {
    console.error(`err: 覆盖率不足${useCoverage}%: ${file} - ${coveragePercentage}%`);
    isFailed = 1;
  }
}

if (!isFailed) {
  console.log("所有文件的覆盖率均达到标准！！！");
}
process.exit(isFailed);
