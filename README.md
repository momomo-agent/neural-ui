# Neural UI

AI-Native 界面渲染引擎 — 不用树，用关系网络。

## 核心理念

传统 UI 框架是**符号系统**（树结构、组件嵌套），Neural UI 是**连接主义**（flat elements + relation network）。

### 传统方式
```
用户意图 → 组件树 → 递归渲染 → 视觉结果
```

### Neural UI
```
用户意图 → 元素 + 关系 → 约束求解 → 视觉结果
```

## 架构

```
Intent (自然语言)
    ↓
LLM (意图理解)
    ↓
Neural Schema (元素 + 关系)
    ↓
Constraint Solver (布局计算)
    ↓
Renderer (视觉输出)
```

## Schema 格式

```json
{
  "elements": [
    {
      "id": "e1",
      "semantic": "time_selector",
      "type": "DatePicker",
      "props": { "label": "时间范围", "default": "last_week" }
    },
    {
      "id": "e2",
      "semantic": "threshold_control",
      "type": "Slider",
      "props": { "label": "涨幅", "min": 0, "max": 100, "value": 10 }
    }
  ],
  "relations": [
    { "from": "e1", "to": "e2", "type": "below", "spacing": 16 },
    { "from": "e1", "to": "e2", "type": "align_left" }
  ],
  "theme": {
    "spacing_unit": 8,
    "border_radius": 8,
    "primary_color": "#3b82f6"
  }
}
```

## 实现计划

1. **Schema 定义** — 元素 + 关系的 JSON 格式
2. **Constraint Solver** — 根据关系计算布局（Cassowary 算法）
3. **Renderer** — 渲染到 DOM（React/Vanilla JS）
4. **LLM Integration** — 意图 → Schema 生成
5. **固化机制** — 保存和复用映射

## 技术栈

- **前端**: React + CSS Grid/Flexbox
- **约束求解**: Kiwi.js (Cassowary 实现)
- **LLM**: Claude API
- **存储**: localStorage (demo) / IndexedDB (生产)
