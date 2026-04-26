import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import container from 'markdown-it-container';
import githubAlerts from 'markdown-it-github-alerts';

/**
 * markdown-it-container closes at the first matching colon-count regardless of
 * nesting, so authors writing `:::` everywhere break nested `:::tabs` blocks.
 * This pass walks the source, pairs opens with closes via a stack, then rewrites
 * each pair's colon count by nesting depth so outer fences are always longer
 * than any inner ones — letting authors keep using plain `:::`.
 */
function normaliseTabContainerFences(src: string): string {
  const lines = src.split('\n');
  type Pair = { openLine: number; closeLine: number; depth: number };
  const pairs: Pair[] = [];
  const stack: { openLine: number }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed.startsWith(':::')) continue;
    const body = trimmed.replace(/^:+\s*/, '');
    if (body === 'tabs' || body.startsWith('tabs ') || body.startsWith('tab ') || body === 'tab') {
      stack.push({ openLine: i });
    } else if (body === '' && stack.length > 0) {
      const opened = stack.pop();
      if (opened) pairs.push({ openLine: opened.openLine, closeLine: i, depth: stack.length });
    }
  }

  if (pairs.length === 0) return src;

  let maxDepth = 0;
  for (const p of pairs) maxDepth = Math.max(maxDepth, p.depth);

  const out = [...lines];
  for (const p of pairs) {
    const colons = ':'.repeat(maxDepth - p.depth + 3);
    out[p.openLine] = lines[p.openLine].replace(/^(\s*):+/, `$1${colons}`);
    out[p.closeLine] = lines[p.closeLine].replace(/^(\s*):+\s*$/, `$1${colons}`);
  }
  return out.join('\n');
}

const md: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
});

md.use(anchor, { tabIndex: false });

md.use(githubAlerts);

md.use(container, 'tabs', {
  validate(params: string) {
    return params.trim() === 'tabs';
  },
});

md.use(container, 'tab', {
  validate(params: string) {
    const t = params.trim();
    return t === 'tab' || t.startsWith('tab ');
  },
});

/** Extract a tab label from a `container_tab_open` token's info string ("tab Expo" → "Expo"). */
export function tabLabelFromInfo(info: string): string {
  return info
    .trim()
    .replace(/^tab\s*/, '')
    .replace(/^"|"$/g, '');
}

/** Parse markdown, applying our tab-fence normalisation pass first. */
export function parseMarkdown(src: string) {
  return md.parse(normaliseTabContainerFences(src), {});
}
