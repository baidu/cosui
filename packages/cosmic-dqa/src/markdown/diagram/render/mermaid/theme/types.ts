export interface MermaidThemeConfig {
  theme: string;
  themeVariables?: Record<string, string | number | boolean>;
  themeCSS?: string;
  // 顶层 htmlLabels：mermaid v11 流程图「节点」标签只认这个顶层开关
  // （labelHelper 内 node.useHtmlLabels = config.htmlLabels，再 || evaluate(config.htmlLabels)），
  // flowchart.htmlLabels 仅作用于 cluster/子图标题与边标签。两者需同时设为 false。
  htmlLabels?: boolean;
  flowchart?: {
    curve?: string;
    htmlLabels?: boolean;
  };
  mindmap?: Record<string, unknown>;
  sequence?: Record<string, unknown>;
  class?: Record<string, unknown>;
  state?: Record<string, unknown>;
  er?: Record<string, unknown>;
  gantt?: Record<string, unknown>;
  journey?: Record<string, unknown>;
  timeline?: Record<string, unknown>;
  pie?: Record<string, unknown>;
  quadrantChart?: Record<string, unknown>;
  xyChart?: Record<string, unknown>;
  requirement?: Record<string, unknown>;
  gitGraph?: Record<string, unknown>;
  c4?: Record<string, unknown>;
  sankey?: Record<string, unknown>;
  block?: Record<string, unknown>;
  packet?: Record<string, unknown>;
  architecture?: Record<string, unknown>;
  radar?: Record<string, unknown>;
  treemap?: Record<string, unknown>;
  kanban?: Record<string, unknown>;
};
