// 基础组件库
export const components = {
  DatePicker: ({ label, value }) => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>{label}</label>
      <input type="date" value={value} style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd', width: '100%' }} />
    </div>
  ),
  
  Slider: ({ label, min, max, value }) => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>{label}: {value}%</label>
      <input type="range" min={min} max={max} value={value} style={{ width: '100%' }} />
    </div>
  ),
  
  MultiSelect: ({ label, options, selected = [] }) => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>{label}</label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {options.map(opt => (
          <button key={opt} style={{ 
            padding: '6px 12px', 
            borderRadius: 6, 
            border: '1px solid #ddd',
            background: selected.includes(opt) ? '#3b82f6' : 'white',
            color: selected.includes(opt) ? 'white' : 'black'
          }}>
            {opt}
          </button>
        ))}
      </div>
    </div>
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
  ),
  
  TextInput: ({ label, placeholder, value }) => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>{label}</label>
      <input type="text" placeholder={placeholder} value={value} style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd', width: '100%' }} />
    </div>
  ),
  
  Button: ({ label, variant = 'primary' }) => (
    <button style={{ 
      padding: '8px 16px', 
      borderRadius: 6, 
      border: 'none',
      background: variant === 'primary' ? '#3b82f6' : '#e5e7eb',
      color: variant === 'primary' ? 'white' : 'black',
      cursor: 'pointer'
    }}>
      {label}
    </button>
  )
};
