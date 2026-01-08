# 表格
以下示例在 [GFM 语法规范](https://github.github.com/gfm/#tables-extension-) 基础上扩展，内置额外的表格能力与展示增强。

## 带合并单元格的表格

markdown 语法:

> 右箭头>代表向右合并单元格，上箭头代表向上合并单元格。

```
| header1          | header2          |
| ---------------- | ---------------- |
| cell (rowspan=2) | cell             |
| ^                | cell             |
| >                | cell (colspan=2) |
| escape >         | \>               |
| escape ^         | \^               |
```

html 输出结果
```html
<table>
<thead>
<tr>
<th>header1</th>
<th>header2</th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="2">cell (rowspan=2)</td>
<td>cell</td>
</tr>
<tr>
<td>cell</td>
</tr>
<tr>
<td colspan="2">cell (colspan=2)</td>
</tr>
<tr>
<td>escape &gt;</td>
<td>&gt;</td>
</tr>
<tr>
<td>escape ^</td>
<td>^</td>
</tr>
</tbody>
</table>
```
