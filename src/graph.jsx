// 关系网络可视化
export function RelationGraph({ schema }) {
  const { elements, relations } = schema;
  
  return (
    <div style={{ background: 'white', borderRadius: 8, padding: 16, marginTop: 16 }}>
      <h3 style={{ fontSize: 14, marginBottom: 12, color: '#666' }}>关系网络</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {elements.map(el => (
          <div key={el.id} style={{ 
            padding: '6px 12px', 
            background: '#f0f9ff', 
            border: '1px solid #3b82f6',
            borderRadius: 6,
            fontSize: 12
          }}>
            {el.id}: {el.type}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
        {relations.map((rel, i) => (
          <div key={i} style={{ marginBottom: 4 }}>
            <span style={{ color: '#3b82f6' }}>{rel.from}</span>
            {' → '}
            <span style={{ color: '#666' }}>{rel.type}</span>
            {rel.spacing && ` (${rel.spacing}px)`}
            {' → '}
            <span style={{ color: '#3b82f6' }}>{rel.to}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
