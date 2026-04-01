// LLM Schema 生成器 - 意图 → Neural Schema
export async function generateSchema(intent, apiKey) {
  const prompt = `你是一个 UI schema 生成器。用户会描述他们想要的界面，你输出 JSON schema。

核心原则：
1. 不要输出组件树（VStack/HStack），输出 flat elements + relations
2. elements 是平级的，通过 relations 描述它们的关系
3. 组件类型：
   - 基础：DatePicker, Slider, MultiSelect, ResultList, TextInput, Button
   - 高级：GlassInput, ModernSlider, GradientButton
4. 关系类型：below, above, right_of, left_of, align_left, align_right, align_top, align_bottom, same_width, same_height
5. 根据场景选择合适的组件 — 高级场景用高级组件

Schema 格式：
{
  "elements": [
    { "id": "e1", "type": "组件类型", "props": {...} }
  ],
  "relations": [
    { "from": "e1", "to": "e2", "type": "关系类型", "spacing": 16 }
  ]
}

示例 1 - 登录表单（基础）：
{
  "elements": [
    { "id": "e1", "type": "TextInput", "props": { "label": "用户名" } },
    { "id": "e2", "type": "TextInput", "props": { "label": "密码" } },
    { "id": "e3", "type": "Button", "props": { "label": "登录" } },
    { "id": "e4", "type": "Button", "props": { "label": "注册", "variant": "secondary" } }
  ],
  "relations": [
    { "from": "e1", "to": "e2", "type": "below", spacing: 12 },
    { "from": "e2", "to": "e3", "type": "below", spacing: 20 },
    { "from": "e3", "to": "e4", "type": "right_of", spacing: 12 }
  ]
}

示例 2 - 高级搜索（视觉丰富）：
{
  "elements": [
    { "id": "e1", "type": "GlassInput", "props": { "label": "搜索", "placeholder": "输入关键词..." } },
    { "id": "e2", "type": "ModernSlider", "props": { "label": "价格", "min": 0, "max": 10000, "value": 5000 } },
    { "id": "e3", "type": "GradientButton", "props": { "label": "搜索" } }
  ],
  "relations": [
    { "from": "e1", "to": "e2", "type": "below", spacing: 20 },
    { "from": "e2", "to": "e3", "type": "below", spacing: 24 }
  ]
}

用户意图：${intent}

直接输出 JSON，不要解释：`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })
  });

  const data = await response.json();
  const text = data.content[0].text;
  
  // 提取 JSON
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('无法解析 schema');
  
  return JSON.parse(jsonMatch[0]);
}
