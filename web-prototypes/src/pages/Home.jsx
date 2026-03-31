import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import readmeContent from '../../../README.md?raw';
import './css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="home-h1" {...props} />,
          h2: ({node, ...props}) => <h2 className="home-h2" {...props} />,
          p: ({node, ...props}) => <p className="home-p" {...props} />,
          ul: ({node, ...props}) => <ul className="home-list" {...props} />,
          ol: ({node, ...props}) => <ol className="home-list" {...props} />,
          li: ({node, ...props}) => <li {...props} />,
          strong: ({node, ...props}) => <strong className="home-strong" {...props} />,
          img: ({node, ...props}) => <img className="home-img" {...props} />,
          pre: ({node, ...props}) => <pre className="home-pre" {...props} />,
          code: ({node, inline, ...props}) => (
            inline ? 
            <code className="home-code-inline" {...props} /> :
            <code {...props} />
          )
        }}
      >
        {readmeContent}
      </ReactMarkdown>
    </div>
  );
};

export default Home;