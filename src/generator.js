import { createClient } from 'agentic-core';

export async function generateSchema(intent, apiKey, baseURL, model) {
  const client = createClient({
    apiKey,
    baseURL: baseURL || 'https://api.anthropic.com',
    defaultModel: model || 'claude-sonnet-4-6'
  });

  const prompt = `根据用户描述生成 Neural UI schema。

用户描述：${intent}

返回 JSON 格式的 schema，包含 elements 和 relations。

elements 示例：
- type: "text-input", "button", "box"
- visual: { width, height, background, border, borderRadius, padding, fontSize, placeholder, text, content }

relations 示例：
- { from: "e1", to: "e2", type: "below", spacing: 12 }
- { from: "e1", to: "e2", type: "right_of", spacing: 16 }

只返回 JSON，不要其他文字。`;

  const response = await client.chat({
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  });

  const text = response.content[0].text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : { elements: [], relations: [] };
}
