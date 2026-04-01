import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { NeuralRenderer } from './renderer'
import { VisualRenderer } from './visual-renderer'
import { generateSchema } from './generator'
import { RelationGraph } from './graph'
import { SchemaLibrary } from './library'
import { demoSchemas } from './demos'
import { visualSchema } from './visual-schema'
import { parseNaturalLanguage } from './nl-parser'

// Demo schema - 股票筛选界面
const demoSchema = demoSchemas.stocks.schema;

function App() {
  const [schema, setSchema] = useState(demoSchema);
  const [intent, setIntent] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('anthropic_key') || '');
  const [baseURL, setBaseURL] = useState(localStorage.getItem('base_url') || '');
  const [model, setModel] = useState(localStorage.getItem('model') || 'claude-sonnet-4-6');
  const [library] = useState(() => new SchemaLibrary());
  const [savedSchemas, setSavedSchemas] = useState([]);
  const [mode, setMode] = useState('component'); // 'component' or 'visual'
  const [visualScene, setVisualScene] = useState('login');

  useEffect(() => {
    setSavedSchemas(library.list());
  }, [library]);

  const handleNaturalLanguage = () => {
    if (!intent.trim()) return;
    const parsed = parseNaturalLanguage(intent);
    setSchema(parsed);
    setMode('visual');
  };
  
  const handleGenerate = async () => {
    if (!intent.trim()) return;
    
    // 先查找固化的映射
    const cached = library.search(intent);
    if (cached) {
      setSchema(cached);
      library.save(intent, cached); // 增加使用计数
      setSavedSchemas(library.list());
      return;
    }
    
    // 没有缓存，调用 LLM
    if (!apiKey) {
      alert('请先设置 API Key');
      return;
    }
    
    setLoading(true);
    try {
      const newSchema = await generateSchema(intent, apiKey, baseURL, model);
      setSchema(newSchema);
      library.save(intent, newSchema);
      setSavedSchemas(library.list());
      localStorage.setItem('anthropic_key', apiKey);
      localStorage.setItem('base_url', baseURL);
      localStorage.setItem('model', model);
    } catch (err) {
      alert('生成失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 40 }}>
      <h1 style={{ marginBottom: 8 }}>Neural UI</h1>
      <p style={{ color: '#666', marginBottom: 16 }}>AI-Native 界面渲染 - 不用树，用关系网络</p>
      
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <button
          onClick={() => setMode('component')}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #ddd',
            background: mode === 'component' ? '#3b82f6' : 'white',
            color: mode === 'component' ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          组件模式
        </button>
        <button
          onClick={() => { setMode('visual'); setSchema(visualSchema.login); }}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #ddd',
            background: mode === 'visual' ? '#3b82f6' : 'white',
            color: mode === 'visual' ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          纯视觉模式
        </button>
      </div>
      
      {mode === 'component' && (
        <div style={{ marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(demoSchemas).map(([key, demo]) => (
            <button
              key={key}
              onClick={() => setSchema(demo.schema)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid #ddd',
                background: 'white',
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              {demo.name}
            </button>
          ))}
        </div>
      )}
      
      {mode === 'visual' && (
        <div style={{ marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(visualSchema).map(([key, scene]) => (
            <button
              key={key}
              onClick={() => { setVisualScene(key); setSchema(scene); }}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid #ddd',
                background: visualScene === key ? '#3b82f6' : 'white',
                color: visualScene === key ? 'white' : 'black',
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              {scene.name}
            </button>
          ))}
        </div>
      )}
      
      <div style={{ marginBottom: 32 }}>
        <input 
          type="password" 
          placeholder="API Key"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', marginBottom: 8 }}
        />
        <input 
          type="text" 
          placeholder="Base URL (可选，默认 Anthropic)"
          value={baseURL}
          onChange={e => setBaseURL(e.target.value)}
          style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', marginBottom: 8 }}
        />
        <input 
          type="text" 
          placeholder="Model (默认 claude-sonnet-4-6)"
          value={model}
          onChange={e => setModel(e.target.value)}
          style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', marginBottom: 8 }}
        />
        <input 
          type="text" 
          placeholder="描述你想要的界面..."
          value={intent}
          onChange={e => setIntent(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd' }}
        />
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <button 
            style={{ padding: '8px 16px', borderRadius: 6, background: '#10b981', color: 'white', border: 'none', cursor: 'pointer' }}
            onClick={handleNaturalLanguage}
            disabled={!intent.trim()}
          >
            自然语言生成
          </button>
          <button 
            style={{ padding: '8px 16px', borderRadius: 6, background: '#3b82f6', color: 'white', border: 'none', cursor: loading ? 'wait' : 'pointer' }}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? '生成中...' : 'LLM 生成'}
          </button>
        </div>
      </div>

      <div style={{ background: '#f9fafb', borderRadius: 12, padding: 20 }}>
        {mode === 'component' ? (
          <NeuralRenderer schema={schema} />
        ) : (
          <VisualRenderer schema={schema} />
        )}
      </div>
      
      <RelationGraph schema={schema} />
      
      {savedSchemas.length > 0 && (
        <div style={{ marginTop: 16, background: 'white', borderRadius: 8, padding: 16 }}>
          <h3 style={{ fontSize: 14, marginBottom: 12, color: '#666' }}>固化的映射 ({savedSchemas.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {savedSchemas.slice(0, 5).map(item => (
              <div key={item.intent} style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 8,
                background: '#f9fafb',
                borderRadius: 6,
                fontSize: 12
              }}>
                <span 
                  style={{ cursor: 'pointer', color: '#3b82f6' }}
                  onClick={() => {
                    setIntent(item.intent);
                    const cached = library.search(item.intent);
                    if (cached) setSchema(cached);
                  }}
                >
                  {item.intent}
                </span>
                <span style={{ color: '#999' }}>使用 {item.useCount} 次</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <details style={{ marginTop: 32, fontSize: 12, color: '#666' }}>
        <summary style={{ cursor: 'pointer' }}>查看 Schema</summary>
        <pre style={{ background: '#f9fafb', padding: 12, borderRadius: 6, overflow: 'auto', marginTop: 8 }}>
          {JSON.stringify(schema, null, 2)}
        </pre>
      </details>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
