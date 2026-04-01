// 自然语言 → 视觉属性解析器
export function parseNaturalLanguage(description) {
  const elements = [];
  const relations = [];
  
  // 简单的规则匹配（真实场景用 LLM）
  const lines = description.split('\n').filter(l => l.trim());
  
  lines.forEach((line, idx) => {
    const id = `e${idx + 1}`;
    
    // 匹配输入框
    if (line.match(/输入框|input|文本框/i)) {
      const placeholder = line.match(/[""](.+?)[""]|placeholder\s*[:：]\s*(.+?)(?:\s|$)/i);
      const height = line.match(/高度?\s*[:：]?\s*(\d+)/i);
      
      elements.push({
        id,
        visual: {
          type: "text-input",
          width: "100%",
          height: height ? parseInt(height[1]) : 48,
          background: line.includes('透明') ? 'transparent' : 
                     line.includes('灰') ? '#f9fafb' : 'white',
          border: line.includes('无边框') ? 'none' : '1px solid #e5e7eb',
          borderRadius: line.match(/圆角\s*(\d+)/i) ? parseInt(line.match(/圆角\s*(\d+)/i)[1]) : 8,
          padding: 12,
          fontSize: 14,
          placeholder: placeholder ? (placeholder[1] || placeholder[2]) : "输入..."
        }
      });
    }
    
    // 匹配按钮
    else if (line.match(/按钮|button/i)) {
      const text = line.match(/[""](.+?)[""]|文字\s*[:：]\s*(.+?)(?:\s|$)/i);
      const isGradient = line.includes('渐变') || line.includes('gradient');
      
      elements.push({
        id,
        visual: {
          type: "button",
          width: line.includes('全宽') ? '100%' : 120,
          height: 44,
          background: isGradient ? 
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
            (line.includes('蓝') ? '#3b82f6' : '#667eea'),
          color: "white",
          borderRadius: line.match(/圆角\s*(\d+)/i) ? parseInt(line.match(/圆角\s*(\d+)/i)[1]) : 8,
          fontSize: 15,
          fontWeight: 600,
          text: text ? (text[1] || text[2]) : "按钮"
        }
      });
    }
    
    // 匹配卡片
    else if (line.match(/卡片|card|盒子|box/i)) {
      const content = line.match(/[""](.+?)[""]|内容\s*[:：]\s*(.+?)(?:\s|$)/i);
      const isGradient = line.includes('渐变');
      
      elements.push({
        id,
        visual: {
          type: "box",
          width: line.includes('半宽') ? '48%' : '100%',
          height: line.match(/高度?\s*[:：]?\s*(\d+)/i) ? 
            parseInt(line.match(/高度?\s*[:：]?\s*(\d+)/i)[1]) : 120,
          background: isGradient ?
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" :
            (line.includes('白') ? 'white' : '#f9fafb'),
          border: line.includes('无边框') ? 'none' : '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 20,
          boxShadow: isGradient ? 
            "0 8px 24px rgba(102, 126, 234, 0.3)" : 
            "0 4px 12px rgba(0,0,0,0.1)",
          content: content ? (content[1] || content[2]) : ""
        }
      });
    }
    
    // 解析关系
    if (idx > 0) {
      const prevId = `e${idx}`;
      if (line.includes('右边') || line.includes('横向')) {
        relations.push({ from: prevId, to: id, type: "right_of", spacing: 16 });
      } else {
        relations.push({ from: prevId, to: id, type: "below", spacing: 12 });
      }
    }
  });
  
  return { elements, relations };
}
