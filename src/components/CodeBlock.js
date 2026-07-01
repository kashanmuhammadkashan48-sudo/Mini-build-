import React, { useEffect, useRef, useState } from 'react';
import { FiCopy, FiDownload } from 'react-icons/fi';
import '../styles/CodeBlock.css';

function CodeBlock({ code, language = 'javascript' }) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      window.hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `code.${language}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="language-badge">{language}</span>
        <div className="code-actions">
          <button
            className="code-btn"
            onClick={handleCopy}
            title="Copy code"
          >
            <FiCopy /> {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            className="code-btn"
            onClick={handleDownload}
            title="Download code"
          >
            <FiDownload /> Download
          </button>
        </div>
      </div>
      <pre className="code-block">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock;
