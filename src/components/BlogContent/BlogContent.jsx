import React from 'react';

export const BlogContent = ({ content }) => {
  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:font-medium
        prose-h1:text-3xl
        prose-h2:text-2xl
        prose-h3:text-xl
        prose-h4:text-lg
        prose-p:text-gray-800 dark:prose-p:text-gray-200
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700
        prose-blockquote:pl-4 prose-blockquote:italic
        prose-code:bg-gray-100 dark:prose-code:bg-gray-800
        prose-code:p-1 prose-code:rounded
        prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
        prose-pre:p-4 prose-pre:rounded-lg
        prose-ol:list-decimal prose-ul:list-disc
        prose-li:my-1
        prose-strong:font-semibold
        prose-strong:text-gray-900 dark:prose-strong:text-gray-100"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}; 