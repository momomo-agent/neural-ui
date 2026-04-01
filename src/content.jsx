// 内容展示组件
import { useState } from 'react';

export const contentComponents = {
  ImageCard: ({ title, subtitle, imageUrl, visual }) => (
    <div style={{
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      background: 'white',
      ...visual
    }}>
      <div style={{
        width: '100%',
        height: 160,
        background: imageUrl ? `url(${imageUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 14, color: '#6b7280' }}>{subtitle}</div>}
      </div>
    </div>
  ),
  
  UserAvatar: ({ name, role, online, visual }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, ...visual }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 600,
        position: 'relative'
      }}>
        {name?.[0] || 'U'}
        {online && <div style={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: '#10b981',
          border: '2px solid white'
        }} />}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>{role}</div>
      </div>
    </div>
  ),
  
  PostCard: ({ author, content, likes, comments, visual }) => {
    const [liked, setLiked] = useState(false);
    return (
      <div style={{
        background: 'white',
        borderRadius: 12,
        padding: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        ...visual
      }}>
        <div style={{ fontSize: 14, color: '#111', marginBottom: 12 }}>{content}</div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#6b7280' }}>
          <span 
            onClick={() => setLiked(!liked)}
            style={{ cursor: 'pointer', color: liked ? '#ef4444' : '#6b7280' }}
          >
            ❤️ {likes + (liked ? 1 : 0)}
          </span>
          <span>💬 {comments}</span>
        </div>
      </div>
    );
  },
  
  MediaGrid: ({ items, visual }) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 8,
      ...visual
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          aspectRatio: '1',
          borderRadius: 8,
          background: item.url ? `url(${item.url})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
      ))}
    </div>
  )
};
