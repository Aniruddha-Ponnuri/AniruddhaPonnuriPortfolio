'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface ReadmeRendererProps {
  markdown: string;
  repoFullName: string;
}

function isAbsoluteUrl(value: string): boolean {
  return /^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('mailto:') || value.startsWith('tel:') || value.startsWith('#') || value.startsWith('data:');
}

function resolveRepoLink(repoFullName: string, href = ''): string {
  if (!href || isAbsoluteUrl(href)) return href;

  const baseUrl = `https://github.com/${repoFullName}/blob/HEAD/`;
  const normalizedHref = href.startsWith('/') ? href.slice(1) : href;

  try {
    return new URL(normalizedHref, baseUrl).toString();
  } catch {
    return href;
  }
}

function resolveRepoImage(repoFullName: string, src = ''): string {
  if (!src || isAbsoluteUrl(src)) return src;

  const baseUrl = `https://raw.githubusercontent.com/${repoFullName}/HEAD/`;
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;

  try {
    return new URL(normalizedSrc, baseUrl).toString();
  } catch {
    return src;
  }
}

export function ReadmeRenderer({ markdown, repoFullName }: ReadmeRendererProps) {
  return (
    <div className="prose prose-xs sm:prose-sm max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-p:leading-relaxed prose-pre:max-w-full prose-pre:overflow-x-auto prose-img:rounded-lg prose-img:shadow-md prose-table:block prose-table:overflow-x-auto prose-table:whitespace-nowrap sm:prose-table:whitespace-normal">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          a: ({ href = '', ...props }) => {
            const resolvedHref = resolveRepoLink(repoFullName, href);
            const isExternal = /^https?:\/\//i.test(resolvedHref) || resolvedHref.startsWith('mailto:') || resolvedHref.startsWith('tel:');

            return (
              <a
                {...props}
                href={resolvedHref}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              />
            );
          },
          img: ({ src = '', alt = '', ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...props}
              src={typeof src === 'string' ? resolveRepoImage(repoFullName, src) : undefined}
              alt={typeof alt === 'string' ? alt : ''}
              loading="lazy"
              className="rounded-md border border-border/60"
            />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto">
              <table {...props} className="w-full border-collapse" />
            </div>
          ),
          script: () => null,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
