// 纯视觉渲染器 - 直接从视觉描述渲染，不用组件
import { useState } from 'react';

export function VisualRenderer({ schema }) {
  const { elements, relations } = schema;
  
  // 计算布局（复用之前的算法）
  const layout = computeLayout(elements, relations);
  
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 400 }}>
      {elements.map(el => {
        const pos = layout[el.id];
        if (!pos) return null;
        
        return (
          <div 
            key={el.id}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              width: pos.w
            }}
          >
            <VisualElement element={el} />
          </div>
        );
      })}
    </div>
  );
}

// 纯视觉元素 - 根据 visual 属性直接渲染
function VisualElement({ element }) {
  const { visual, behavior } = element;
  const [value, setValue] = useState('');
  
  // 根据 visual.type 决定渲染什么
  switch (visual.type) {
    case 'text-input':
      return (
        <input
          type={visual.inputType || 'text'}
          placeholder={visual.placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          style={{
            width: visual.width,
            height: visual.height,
            background: visual.background,
            border: visual.border,
            borderRadius: visual.borderRadius,
            padding: visual.padding,
            fontSize: visual.fontSize,
            outline: 'none'
          }}
        />
      );
      
    case 'button':
      return (
        <button
          onClick={() => console.log('clicked')}
          style={{
            width: visual.width,
            height: visual.height,
            background: visual.background,
            color: visual.color,
            border: 'none',
            borderRadius: visual.borderRadius,
            fontSize: visual.fontSize,
            fontWeight: visual.fontWeight,
            cursor: 'pointer'
          }}
        >
          {visual.text}
        </button>
      );
      
    case 'box':
      return (
        <div style={{
          width: visual.width,
          height: visual.height,
          background: visual.background,
          borderRadius: visual.borderRadius,
          padding: visual.padding,
          boxShadow: visual.boxShadow
        }}>
          {visual.content}
        </div>
      );
      
    default:
      return <div>Unknown type: {visual.type}</div>;
  }
}

function computeLayout(elements, relations) {
  const layout = {};
  const containerWidth = 760;
  
  if (elements.length > 0) {
    layout[elements[0].id] = { x: 0, y: 0, w: containerWidth };
  }
  
  relations.forEach(rel => {
    const fromPos = layout[rel.from];
    if (fromPos) {
      const spacing = rel.spacing || 16;
      if (rel.type === 'below') {
        layout[rel.to] = { x: fromPos.x, y: fromPos.y + 60 + spacing, w: containerWidth };
      }
    }
  });
  
  return layout;
}
