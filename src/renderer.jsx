// Neural UI 渲染器 - 简化版布局
import { useMemo } from 'react';
import { interactiveComponents } from './interactive';
import { styledComponents } from './styled';
import { advancedComponents } from './advanced';
import { contentComponents } from './content';

export function NeuralRenderer({ schema }) {
  const { elements, relations } = schema;
  
  // 合并所有组件库
  const allComponents = { 
    ...interactiveComponents, 
    ...styledComponents,
    ...advancedComponents,
    ...contentComponents
  };
  
  // 简单布局 - 根据 relations 计算位置
  const layout = useMemo(() => {
    return computeLayout(elements, relations);
  }, [elements, relations]);
  
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      minHeight: 400,
      overflow: 'hidden'
    }}>
      {elements.map(el => {
        const Component = allComponents[el.type];
        const pos = layout[el.id];
        
        if (!Component || !pos) return null;
        
        return (
          <div 
            key={el.id} 
            style={{ 
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              width: pos.w,
              maxWidth: '100%'
            }}
          >
            <Component {...el.props} />
          </div>
        );
      })}
    </div>
  );
}

function computeLayout(elements, relations) {
  const layout = {};
  const positioned = new Set();
  const containerWidth = 760;
  
  // 预估每个元素的高度
  const estimateHeight = (type) => {
    switch (type) {
      case 'StatCard': return 120;
      case 'ImageCard': return 240;
      case 'PostCard': return 120;
      case 'UserAvatar': return 72;
      case 'MediaGrid': return 200;
      case 'ProgressBar': return 60;
      case 'TagGroup': return 70;
      case 'ResultList': return 150;
      case 'GlassInput':
      case 'TextInput': return 70;
      case 'ModernSlider':
      case 'Slider': return 60;
      case 'MultiSelect': return 90;
      case 'Button':
      case 'GradientButton': return 40;
      case 'DatePicker': return 70;
      default: return 60;
    }
  };
  
  // 第一个元素从 (0, 0) 开始
  if (elements.length > 0) {
    const h = estimateHeight(elements[0].type);
    layout[elements[0].id] = { x: 0, y: 0, w: containerWidth, h };
    positioned.add(elements[0].id);
  }
  
  // 多轮处理 relations
  let maxIterations = 10;
  while (positioned.size < elements.length && maxIterations-- > 0) {
    relations.forEach(rel => {
      const fromPos = layout[rel.from];
      const toPos = layout[rel.to];
      const spacing = rel.spacing || 16;
      
      if (fromPos && !toPos) {
        const toEl = elements.find(e => e.id === rel.to);
        const h = estimateHeight(toEl?.type);
        
        switch (rel.type) {
          case 'below':
            layout[rel.to] = { 
              x: fromPos.x, 
              y: fromPos.y + fromPos.h + spacing, 
              w: fromPos.w,
              h
            };
            positioned.add(rel.to);
            break;
            
          case 'right_of':
            const remainingWidth = containerWidth - fromPos.x - fromPos.w - spacing;
            layout[rel.to] = { 
              x: fromPos.x + fromPos.w + spacing, 
              y: fromPos.y, 
              w: Math.min(remainingWidth, fromPos.w),
              h
            };
            positioned.add(rel.to);
            break;
        }
      }
      
      if (fromPos && toPos) {
        switch (rel.type) {
          case 'align_left':
            toPos.x = fromPos.x;
            break;
          case 'align_top':
            toPos.y = fromPos.y;
            break;
          case 'same_width':
            toPos.w = fromPos.w;
            break;
        }
      }
    });
  }
  
  // 未定位的元素垂直堆叠
  let y = 0;
  elements.forEach(el => {
    if (!layout[el.id]) {
      layout[el.id] = { x: 0, y, w: containerWidth };
      y += 76;
    }
  });
  
  return layout;
}

