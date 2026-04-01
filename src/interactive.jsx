// 交互式组件 - 支持实时调整
import { useState } from 'react';

export const interactiveComponents = {
  DatePicker: ({ label, value, onChange }) => {
    const [val, setVal] = useState(value);
    return (
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>{label}</label>
        <input 
          type="date" 
          value={val} 
          onChange={e => {
            setVal(e.target.value);
            onChange?.(e.target.value);
          }}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd', width: '100%' }} 
        />
      </div>
    );
  },
  
  Slider: ({ label, min, max, value, onChange }) => {
    const [val, setVal] = useState(value);
    return (
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>{label}: {val}%</label>
        <input 
          type="range" 
          min={min} 
          max={max} 
          value={val}
          onChange={e => {
            setVal(e.target.value);
            onChange?.(e.target.value);
          }}
          style={{ width: '100%' }} 
        />
      </div>
    );
  },
  
  MultiSelect: ({ label, options, selected = [], onChange }) => {
    const [sel, setSel] = useState(selected);
    return (
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>{label}</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {options.map(opt => (
            <button 
              key={opt} 
              onClick={() => {
                const newSel = sel.includes(opt) 
                  ? sel.filter(s => s !== opt)
                  : [...sel, opt];
                setSel(newSel);
                onChange?.(newSel);
              }}
              style={{ 
                padding: '6px 12px', 
                borderRadius: 6, 
                border: '1px solid #ddd',
                background: sel.includes(opt) ? '#3b82f6' : 'white',
                color: sel.includes(opt) ? 'white' : 'black',
                cursor: 'pointer'
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  },
  
  TextInput: ({ label, placeholder, value, onChange }) => {
    const [val, setVal] = useState(value || '');
    return (
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>{label}</label>
        <input 
          type="text" 
          placeholder={placeholder} 
          value={val}
          onChange={e => {
            setVal(e.target.value);
            onChange?.(e.target.value);
          }}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd', width: '100%' }} 
        />
      </div>
    );
  },
  
  Button: ({ label, variant = 'primary', onClick }) => (
    <button 
      onClick={onClick}
      style={{ 
        padding: '8px 16px', 
        borderRadius: 6, 
        border: 'none',
        background: variant === 'primary' ? '#3b82f6' : '#e5e7eb',
        color: variant === 'primary' ? 'white' : 'black',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  ),
  
  ResultList: ({ data = [] }) => (
    <div style={{ border: '1px solid #ddd', borderRadius: 6, padding: 12 }}>
      {data.length === 0 ? (
        <div style={{ color: '#999', textAlign: 'center' }}>暂无数据</div>
      ) : (
        data.map((item, i) => (
          <div key={i} style={{ padding: 8, borderBottom: i < data.length - 1 ? '1px solid #eee' : 'none' }}>
            {item}
          </div>
        ))
      )}
    </div>
  )
};
