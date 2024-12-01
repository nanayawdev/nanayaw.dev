import { useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import jsx from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import markdown from 'highlight.js/lib/languages/markdown';
import 'highlight.js/styles/github-dark.css';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('jsx', jsx);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('python', python);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('markdown', markdown);

export const BlogContent = ({ content }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const codeBlocks = contentRef.current.querySelectorAll('pre code');
    codeBlocks.forEach((el) => {
      if (el.dataset.highlighted) {
        delete el.dataset.highlighted;
      }
      
      hljs.highlightElement(el);
      
      const pre = el.parentElement;
      if (!pre.querySelector('.copy-button')) {
        const button = document.createElement('button');
        button.className = 'copy-button absolute hidden group-hover:flex items-center gap-1 right-2 top-2 px-1.5 py-1 text-xs rounded bg-white/10 hover:bg-white/20 text-white transition-colors';
        
        const buttonContent = document.createElement('div');
        buttonContent.className = 'flex items-center gap-1';
        
        const copyIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        copyIcon.setAttribute('class', 'w-3.5 h-3.5');
        copyIcon.setAttribute('viewBox', '0 0 24 24');
        copyIcon.setAttribute('fill', 'none');
        copyIcon.setAttribute('stroke', 'currentColor');
        copyIcon.setAttribute('stroke-width', '2');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3');
        
        copyIcon.appendChild(path);
        
        const text = document.createElement('span');
        text.textContent = 'Copy';
        
        buttonContent.appendChild(copyIcon);
        buttonContent.appendChild(text);
        button.appendChild(buttonContent);
        
        button.addEventListener('click', () => {
          navigator.clipboard.writeText(el.textContent);
          text.textContent = 'Copied!';
          path.setAttribute('d', 'M5 13l4 4L19 7');
          
          setTimeout(() => {
            text.textContent = 'Copy';
            path.setAttribute('d', 'M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3');
          }, 2000);
        });
        
        pre.classList.add('relative', 'group');
        pre.appendChild(button);
      }
    });
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className="blog-content prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
}; 