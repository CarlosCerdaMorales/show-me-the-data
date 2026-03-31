import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import manualContent from '../assets/manual.md?raw';
import './css/UserManual.css';

const UserManual = () => {
  return (
      <div className="manual-container">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="manual-h1" {...props} />,
            h2: ({node, ...props}) => <h2 className="manual-h2" {...props} />,
            p: ({node, ...props}) => <p className="manual-p" {...props} />,
            ul: ({node, ...props}) => <ul className="manual-list" {...props} />,
            ol: ({node, ...props}) => <ol className="manual-list" {...props} />,
            li: ({node, ...props}) => <li {...props} />,
            strong: ({node, ...props}) => <strong className="manual-strong" {...props} />,
            img: ({node, ...props}) => <img className="manual-img" {...props} />,
            pre: ({node, ...props}) => <pre className="manual-pre" {...props} />,
            code: ({node, inline, ...props}) => (
              inline ? 
              <code className="manual-code-inline" {...props} /> :
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