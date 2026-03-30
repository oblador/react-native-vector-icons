import { useMemo } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { CodeBlock } from '@/components/CodeBlock';
import { Text } from '@/components/StyledText';
import { useTheme } from '@/theme/ThemeContext';

type Props = {
  content: string;
};

/**
 * Markdown renderer matching the old site's DocsLayout styles.
 * Code blocks use react-native-code-highlighter for syntax highlighting.
 * Prose is rendered as HTML on web, native Text components on native.
 *
 * SECURITY NOTE: Only renders trusted content from our own bundled source files
 * (content/docs/*.ts), never user input. The markdown is authored by project
 * maintainers and bundled at build time — safe from XSS. No shell execution
 * or user-controlled strings are involved in the HTML generation.
 */
export function Markdown({ content }: Props) {
  const { colours } = useTheme();
  const segments = useMemo(() => splitCodeBlocks(content), [content]);

  return (
    <View>
      {segments.map((segment, i) => {
        if (segment.type === 'code') {
          return (
            <CodeBlock key={i} language={segment.language}>
              {segment.content}
            </CodeBlock>
          );
        }

        if (Platform.OS === 'web') {
          const WebDiv = 'div' as unknown as React.ComponentType<any>;
          return (
            <WebDiv
              key={i}
              dangerouslySetInnerHTML={{ __html: proseToHtml(segment.content, colours) }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 16,
                lineHeight: '1.625',
                color: colours.textMuted,
              }}
            />
          );
        }

        // Native prose rendering
        return <NativeProse key={i} content={segment.content} />;
      })}
    </View>
  );
}

/** Simple native prose renderer — handles headings, bold, admonitions, lists. */
function NativeProse({ content }: { content: string }) {
  const { colours } = useTheme();
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Headings
    if (line.startsWith('#### ')) {
      elements.push(
        <Text key={i} className="font-heading text-base font-semibold text-text-muted mt-6 mb-2">
          {line.slice(5)}
        </Text>,
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <Text key={i} className="font-heading text-lg font-semibold text-accent-cyan mt-8 mb-3">
          {line.slice(4)}
        </Text>,
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <Text key={i} className="font-heading text-2xl font-bold text-text mt-12 mb-4 pb-2 border-b border-border">
          {line.slice(3)}
        </Text>,
      );
    } else if (line.startsWith('# ')) {
      elements.push(
        <Text key={i} className="font-heading text-4xl font-bold text-accent-cyan mt-12 mb-4">
          {line.slice(2)}
        </Text>,
      );
    }
    // Admonitions
    else if (line.match(/^> \[!(TIP|WARNING|NOTE|IMPORTANT)\]/)) {
      const type = line.match(/\[!(.*?)\]/)?.[1] ?? 'NOTE';
      const admonitionLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].startsWith('> ')) {
        admonitionLines.push(lines[i].slice(2));
        i++;
      }
      const borderColour = type === 'WARNING' ? '#f59e0b' : colours.accentCyan;
      elements.push(
        <View
          key={`adm-${i}`}
          style={{
            backgroundColor: colours.surface,
            borderLeftWidth: 4,
            borderLeftColor: borderColour,
            borderRadius: 8,
            padding: 16,
            marginVertical: 16,
          }}
        >
          <Text className="font-bold text-text">{type}</Text>
          <Text className="text-sm text-text-muted mt-1">{renderInline(admonitionLines.join('\n'))}</Text>
        </View>,
      );
      continue; // already advanced i
    }
    // Tables
    else if (line.startsWith('|') && i + 1 < lines.length && lines[i + 1].match(/^\|[-| :]+\|$/)) {
      const headerCells = line
        .split('|')
        .map((c) => c.trim())
        .filter(Boolean);
      i++; // skip separator row
      i++;
      const dataRows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        dataRows.push(
          lines[i]
            .split('|')
            .map((c) => c.trim())
            .filter(Boolean),
        );
        i++;
      }
      elements.push(
        <ScrollView key={`table-${i}`} horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 16 }}>
          <View>
            {/* Header */}
            <View style={{ flexDirection: 'row' }}>
              {headerCells.map((cell, ci) => (
                <View
                  key={ci}
                  style={{
                    backgroundColor: colours.surface,
                    borderWidth: 1,
                    borderColor: colours.border,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    minWidth: 120,
                  }}
                >
                  <Text className="font-heading font-semibold text-text text-sm">{cell}</Text>
                </View>
              ))}
            </View>
            {/* Rows */}
            {dataRows.map((row, ri) => (
              <View key={ri} style={{ flexDirection: 'row' }}>
                {row.map((cell, ci) => (
                  <View
                    key={ci}
                    style={{
                      borderWidth: 1,
                      borderColor: colours.border,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      minWidth: 120,
                    }}
                  >
                    <Text className="text-text-muted text-sm">{renderInline(cell)}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>,
      );
      continue;
    }
    // Unordered list items
    else if (line.startsWith('- ')) {
      elements.push(
        <Text key={i} className="text-text-muted ml-6 mb-1">
          • {renderInline(line.slice(2))}
        </Text>,
      );
    }
    // Ordered list items
    else if (line.match(/^\d+\. /)) {
      const match = line.match(/^(\d+)\. (.*)/);
      if (!match) {
        i++;
        continue;
      }
      elements.push(
        <Text key={i} className="text-text-muted ml-6 mb-1">
          {match[1]}. {renderInline(match[2])}
        </Text>,
      );
    }
    // Empty lines
    else if (line.trim() === '') {
      // skip
    }
    // Regular paragraphs
    else {
      elements.push(
        <Text key={i} className="text-text-muted mb-4 leading-relaxed">
          {renderInline(line)}
        </Text>,
      );
    }

    i++;
  }

  return <View>{elements}</View>;
}

/** Render inline markdown (bold, inline code, links) as Text nodes. */
function renderInline(text: string): React.ReactNode {
  // Split on inline patterns: **bold**, `code`, [link](url)
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;

  for (let match = regex.exec(text); match !== null; match = regex.exec(text)) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold
      parts.push(
        <Text key={match.index} className="font-semibold text-text">
          {match[2]}
        </Text>,
      );
    } else if (match[3]) {
      // Inline code
      parts.push(
        <Text key={match.index} className="font-mono text-accent-cyan bg-surface rounded px-1" style={{ fontSize: 13 }}>
          {match[3]}
        </Text>,
      );
    } else if (match[4] && match[5]) {
      // Link — render as cyan text on native
      parts.push(
        <Text key={match.index} className="text-accent-cyan underline">
          {match[4]}
        </Text>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

type Segment = { type: 'prose'; content: string } | { type: 'code'; content: string; language: string };

function splitCodeBlocks(md: string): Segment[] {
  const segments: Segment[] = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;

  for (let match = codeBlockRegex.exec(md); match !== null; match = codeBlockRegex.exec(md)) {
    if (match.index > lastIndex) {
      const prose = md.slice(lastIndex, match.index).trim();
      if (prose) segments.push({ type: 'prose', content: prose });
    }
    segments.push({
      type: 'code',
      content: match[2].trim(),
      language: match[1] || 'text',
    });
    lastIndex = match.index + match[0].length;
  }

  const remaining = md.slice(lastIndex).trim();
  if (remaining) segments.push({ type: 'prose', content: remaining });

  return segments;
}

function proseToHtml(md: string, c: Record<string, string>): string {
  const fontHeading = "'JetBrainsMono', monospace";

  let html = md
    .replace(
      /^#### (.+)$/gm,
      `<h4 style="font-family:${fontHeading};font-size:1rem;font-weight:600;color:${c.textMuted};margin-top:24px;margin-bottom:8px">$1</h4>`,
    )
    .replace(
      /^### (.+)$/gm,
      `<h3 style="font-family:${fontHeading};font-size:1.125rem;font-weight:600;color:${c.accentCyan};margin-top:32px;margin-bottom:12px">$1</h3>`,
    )
    .replace(
      /^## (.+)$/gm,
      `<h2 style="font-family:${fontHeading};font-size:1.5rem;font-weight:700;color:${c.text};margin-top:48px;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid ${c.border}">$1</h2>`,
    )
    .replace(
      /^# (.+)$/gm,
      `<h1 style="font-family:${fontHeading};font-size:2.25rem;font-weight:700;margin-top:48px;margin-bottom:16px;background:linear-gradient(135deg,${c.accentCyan},${c.accentViolet});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">$1</h1>`,
    )
    .replace(/^> \[!(TIP|WARNING|NOTE|IMPORTANT)\]\n((?:> .*\n?)*)/gm, (_match, type, body) => {
      const content = body.replace(/^> ?/gm, '').trim();
      const borderColour = type === 'WARNING' ? '#f59e0b' : c.accentCyan;
      return `<blockquote style="background:${c.surface};border-left:4px solid ${borderColour};border-radius:8px;padding:16px;margin:16px 0"><strong style="color:${c.text}">${type}</strong><br/><span style="color:${c.textMuted}">${content}</span></blockquote>`;
    })
    .replace(/^\|(.+)\|\n\|[-| :]+\|\n((?:\|.*\|\n?)*)/gm, (_match, headerRow, bodyRows) => {
      const headers = headerRow
        .split('|')
        .map((h: string) => h.trim())
        .filter(Boolean);
      const thStyle = `style="background:${c.surface};color:${c.text};font-family:${fontHeading};font-weight:600;text-align:left;padding:12px 16px;border:1px solid ${c.border}"`;
      const tdStyle = `style="color:${c.textMuted};padding:12px 16px;border:1px solid ${c.border}"`;
      const thead = `<thead><tr>${headers.map((h: string) => `<th ${thStyle}>${h}</th>`).join('')}</tr></thead>`;
      const rows = bodyRows
        .trim()
        .split('\n')
        .map((row: string) => {
          const cells = row
            .split('|')
            .map((cell: string) => cell.trim())
            .filter(Boolean);
          return `<tr>${cells.map((cell: string) => `<td ${tdStyle}>${cell}</td>`).join('')}</tr>`;
        })
        .join('');
      return `<table style="width:100%;border-collapse:collapse;margin-top:16px;margin-bottom:24px;font-size:0.875rem">${thead}<tbody>${rows}</tbody></table>`;
    })
    .replace(/\*\*(.+?)\*\*/g, `<strong style="color:${c.text};font-weight:600">$1</strong>`)
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(
      /`([^`]+)`/g,
      `<code style="background:${c.surface};color:${c.accentCyan};font-family:${fontHeading};border-radius:4px;padding:2px 6px;font-size:0.875em">$1</code>`,
    )
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" style="color:${c.accentCyan};text-underline-offset:2px">$1</a>`)
    .replace(
      /^(\d+)\. (.+)$/gm,
      `<li style="margin-left:24px;margin-bottom:4px;list-style-type:decimal;color:${c.textMuted}">$2</li>`,
    )
    .replace(
      /^- (.+)$/gm,
      `<li style="margin-left:24px;margin-bottom:4px;list-style-type:disc;color:${c.textMuted}">$1</li>`,
    )
    // Double newline = new paragraph
    .replace(/\n\n(?!<)/g, `</p><p style="margin-bottom:16px;color:${c.textMuted}">`)
    // Single newline (not before/after block elements) = line break
    .replace(/(?<!>)\n(?!<)/g, '<br/>');

  if (!html.startsWith('<')) {
    html = `<p style="margin-bottom:16px;color:${c.textMuted}">${html}</p>`;
  }

  return html;
}
