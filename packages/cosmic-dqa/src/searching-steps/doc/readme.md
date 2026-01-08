# SearchingSteps

- 思考步骤：用于定义思考过程中的步骤数量，状态，内容等信息
- 覆盖平台：Mobile

## 特别说明
currentIndex 表示当前 'process' 步骤的索引
- 初始状态为0，表示初始状态下第一个步骤进入 process 状态
- currentIndex 需要连续切换，即：0 -> 1 -> 2 -> ...
- 最后一个步骤为 'process' 状态，则 currentIndex = steps.length - 1
- 若需要最后一个步骤为 'finish' 状态，则 currentIndex = steps.length

## 代码演示
