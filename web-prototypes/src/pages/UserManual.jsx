import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import manualContent from '../assets/manual.md?raw';

const UserManual = () => {
  return (
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '48px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        maxWidth: '900px',
        margin: '0 auto',
        color: '#374151',
        lineHeight: '1.6',
        textAlign: 'left'
      }}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 style={{ color: '#111827', fontSize: '32px', fontWeight: '700', borderBottom: '2px solid #f3f4f6', paddingBottom: '16px', marginTop: '0', marginBottom: '24px' }} {...props} />,
            h2: ({node, ...props}) => <h2 style={{ color: '#111827', fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '16px' }} {...props} />,
            p: ({node, ...props}) => <p style={{ marginBottom: '16px', fontSize: '16px' }} {...props} />,
            ul: ({node, ...props}) => <ul style={{ paddingLeft: '24px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '16px' }} {...props} />,
            ol: ({node, ...props}) => <ol style={{ paddingLeft: '24px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '16px' }} {...props} />,
            li: ({node, ...props}) => <li {...props} />,
            strong: ({node, ...props}) => <strong style={{ fontWeight: '600', color: '#111827' }} {...props} />,
            img: ({node, ...props}) => <img style={{ borderRadius: '4px', marginRight: '12px', display: 'inline-block' }} {...props} />,
            pre: ({node, ...props}) => (
              <pre style={{ 
                backgroundColor: '#1f2937', 
                color: '#f3f4f6', 
                padding: '24px', 
                borderRadius: '8px', 
                overflowX: 'auto', 
                fontSize: '14px', 
                fontFamily: '"Fira Code", "Courier New", Courier, monospace',
                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                marginBottom: '24px'
              }} {...props} />
            ),
            code: ({node, inline, ...props}) => (
              inline ? 
              <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', color: '#ef4444', fontSize: '14px' }} {...props} /> :
              <code {...props} />
            )
          }}
        >
          {manualContent}
        </ReactMarkdown>
      </div>
    );
};

export default UserManual;