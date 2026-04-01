// 更多高级组件
import { useState } from 'react';

export const advancedComponents = {
  StatCard: ({ title, value, trend, visual }) => (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: 16,
      padding: 24,
      color: 'white',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
      ...visual
    }}>
      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>{value}</div>
      {trend && <div style={{ fontSize: 14, opacity: 0.9 }}>{trend}</div>}
    </div>
  ),
  
  ProgressBar: ({ label, value, max = 100, visual }) => {
    const percent = (value / max) * 100;
    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
          <span style={{ fontSize: 14, color: '#8b5cf6' }}>{value}/{max}</span>
        </div>
        <div style={{ 
          height: 8, 
          background: '#e5e7eb', 
          borderRadius: 4, 
          overflow: 'hidden',
          ...visual 
        }}>
          <div style={{ 
            width: `${percent}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
            transition: 'width 0.3s'
          }} />
        </div>
      </div>
    );
  },
  
  TagGroup: ({ label, tags, selected = [], onChange, visual }) => {
    const [sel, setSel] = useState(selected);
    return (
      <div style={{ marginBottom: 16 }}>
        {label && <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>{label}</label>}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span
              key={tag}
              onClick={() => {
                const newSel = sel.includes(tag) ? sel.filter(t => t !== tag) : [...sel, tag];
                setSel(newSel);
                onChange?.(newSel);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                fontSize: 12,
                background: sel.includes(tag) ? '#8b5cf6' : '#f3f4f6',
                color: sel.includes(tag) ? 'white' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.2s',
                ...visual
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }
};
