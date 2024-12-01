import { useEffect } from 'react';
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
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((el) => {
      if (el.dataset.highlighted) {
        delete el.dataset.highlighted;
      }
      
      hljs.highlightElement(el);
      
      const pre = el.parentElement;
      if (!pre.querySelector('.copy-button')) {
        const button = document.createElement('button');
        button.className = 'copy-button absolute hidden group-hover:flex items-center gap-1 right-2 top-2 px-1.5 py-1 text-xs rounded bg-white/10 hover:bg-white/20 text-white transition-colors';
        
        const copyIconSvg = `
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        `;

        const checkIconSvg = `
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;

        button.innerHTML = `
          ${copyIconSvg}
          <span>Copy</span>
        `;
        
        button.onclick = () => {
          navigator.clipboard.writeText(el.textContent);
          button.innerHTML = `
            ${checkIconSvg}
            <span>Copied!</span>
          `;
          setTimeout(() => {
            button.innerHTML = `
              ${copyIconSvg}
              <span>Copy</span>
            `;
          }, 2000);
        };
        
        pre.classList.add('relative', 'group');
        pre.appendChild(button);
      }
    });
  }, [content]);

  return (
    <div 
      className="blog-content prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
}; 