// 高级组件 - 支持视觉样式
import { useState } from 'react';

const applyVisual = (baseStyle, visual = {}) => ({
  ...baseStyle,
  ...visual
});

export const styledComponents = {
  Card: ({ children, visual }) => (
    <div style={applyVisual({
      background: 'white',
      borderRadius: 12,
      padding: 20,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }, visual)}>
      {children}
    </div>
  ),
  
  GradientButton: ({ label, onClick, visual }) => (
    <button 
      onClick={onClick}
      style={applyVisual({
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
        transition: 'transform 0.2s'
      }, visual)}
      onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
    >
      {label}
    </button>
  ),
  
  GlassInput: ({ label, placeholder, value, onChange, visual }) => {
    const [val, setVal] = useState(value || '');
    return (
      <div style={{ marginBottom: 16 }}>
        {label && <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>{label}</label>}
        <input 
          type="text" 
          placeholder={placeholder} 
          value={val}
          onChange={e => {
            setVal(e.target.value);
            onChange?.(e.target.value);
          }}
          style={applyVisual({
            width: '100%',
            padding: 12,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 8,
            fontSize: 14,
            outline: 'none'
          }, visual)}
        />
      </div>
    );
  },
  
  ModernSlider: ({ label, min, max, value, onChange, visual }) => {
    const [val, setVal] = useState(value);
    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 500 }}>{label}</label>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#8b5cf6' }}>{val}</span>
        </div>
        <input 
          type="range" 
          min={min} 
          max={max} 
          value={val}
          onChange={e => {
            setVal(e.target.value);
            onChange?.(e.target.value);
          }}
          style={applyVisual({
            width: '100%',
            height: 6,
            borderRadius: 3,
            background: 'linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ' + (val/max*100) + '%, #e5e7eb ' + (val/max*100) + '%)',
            outline: 'none',
            appearance: 'none'
          }, visual)}
        />
      </div>
    );
  }
};
