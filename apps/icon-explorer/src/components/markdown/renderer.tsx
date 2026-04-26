import type Token from 'markdown-it/lib/token.mjs';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/StyledText';
import { tabLabelFromInfo } from './parser';
import {
  BulletList,
  Em,
  Fence,
  Heading,
  type HeadingLevel,
  InlineCode,
  ListItem,
  MarkdownLink,
  MarkdownTable,
  Note,
  OrderedList,
  Paragraph,
  Strong,
} from './primitives';
import { type TabPanel, Tabs } from './Tabs';

type Frame = {
  type: string;
  meta?: Record<string, unknown>;
  children: ReactNode[];
};

const HEADING_LEVEL: Record<string, HeadingLevel> = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 4,
  h6: 4,
};

const renderInline = (tokens: Token[]): ReactNode[] => {
  const stack: Frame[] = [{ type: 'root', children: [] }];
  const top = () => stack[stack.length - 1];

  tokens.forEach((token, i) => {
    const k = `inl-${i}`;
    switch (token.type) {
      case 'text':
        top().children.push(token.content);
        break;
      case 'softbreak':
        top().children.push(' ');
        break;
      case 'hardbreak':
        top().children.push('\n');
        break;
      case 'code_inline':
        top().children.push(<InlineCode key={k}>{token.content}</InlineCode>);
        break;
      case 'strong_open':
      case 'em_open':
      case 'link_open':
        stack.push({
          type: token.type,
          meta: token.type === 'link_open' ? { href: token.attrGet('href') ?? '#' } : undefined,
          children: [],
        });
        break;
      case 'strong_close': {
        const frame = stack.pop()!;
        top().children.push(<Strong key={k}>{frame.children}</Strong>);
        break;
      }
      case 'em_close': {
        const frame = stack.pop()!;
        top().children.push(<Em key={k}>{frame.children}</Em>);
        break;
      }
      case 'link_close': {
        const frame = stack.pop()!;
        top().children.push(
          <MarkdownLink key={k} href={String(frame.meta?.href ?? '#')}>
            {frame.children}
          </MarkdownLink>,
        );
        break;
      }
      case 's_open':
        stack.push({ type: 's', children: [] });
        break;
      case 's_close': {
        const frame = stack.pop()!;
        top().children.push(
          <Text key={k} style={{ textDecorationLine: 'line-through' }}>
            {frame.children}
          </Text>,
        );
        break;
      }
      default:
        break;
    }
  });

  return stack[0].children;
};

export const renderMarkdown = (tokens: Token[]): ReactNode[] => {
  const stack: Frame[] = [{ type: 'root', children: [] }];
  const top = () => stack[stack.length - 1];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const k = `${token.type}-${i}`;

    switch (token.type) {
      case 'heading_open': {
        // markdown-it-anchor sets `id` as an attribute on the open token
        const id = token.attrGet('id') ?? '';
        stack.push({ type: 'heading', meta: { tag: token.tag, id }, children: [] });
        break;
      }
      case 'heading_close': {
        const frame = stack.pop()!;
        const level = HEADING_LEVEL[String(frame.meta?.tag)] ?? 4;
        const id = String(frame.meta?.id ?? '');
        top().children.push(
          <Heading key={k} level={level} id={id || undefined}>
            {frame.children}
          </Heading>,
        );
        break;
      }

      case 'paragraph_open':
        stack.push({ type: 'paragraph', children: [] });
        break;
      case 'paragraph_close': {
        const frame = stack.pop()!;
        const parent = top();
        if (parent.type === 'list_item' || parent.type === 'cell') {
          // Tight paragraph inside lists/tables — render inline without wrapper
          top().children.push(
            <Text key={k} className="text-text-muted">
              {frame.children}
            </Text>,
          );
        } else {
          top().children.push(<Paragraph key={k}>{frame.children}</Paragraph>);
        }
        break;
      }

      case 'inline':
        if (token.children) {
          for (const node of renderInline(token.children)) {
            top().children.push(node);
          }
        }
        break;

      case 'fence':
        top().children.push(
          <Fence key={k} language={token.info || 'text'} content={token.content.replace(/\n$/, '')} />,
        );
        break;

      case 'code_block':
        top().children.push(<Fence key={k} language="text" content={token.content.replace(/\n$/, '')} />);
        break;

      case 'bullet_list_open':
        stack.push({ type: 'bullet_list', children: [] });
        break;
      case 'bullet_list_close': {
        const frame = stack.pop()!;
        top().children.push(<BulletList key={k}>{frame.children}</BulletList>);
        break;
      }

      case 'ordered_list_open': {
        const start = parseInt(token.attrGet('start') ?? '1', 10);
        stack.push({ type: 'ordered_list', meta: { start, counter: 0 }, children: [] });
        break;
      }
      case 'ordered_list_close': {
        const frame = stack.pop()!;
        top().children.push(<OrderedList key={k}>{frame.children}</OrderedList>);
        break;
      }

      case 'list_item_open': {
        const parent = top();
        let marker = '•';
        if (parent.type === 'ordered_list') {
          const start = (parent.meta?.start as number | undefined) ?? 1;
          const counter = (parent.meta?.counter as number | undefined) ?? 0;
          if (parent.meta) parent.meta.counter = counter + 1;
          marker = `${start + counter}.`;
        }
        stack.push({ type: 'list_item', meta: { marker }, children: [] });
        break;
      }
      case 'list_item_close': {
        const frame = stack.pop()!;
        const marker = String(frame.meta?.marker ?? '•');
        top().children.push(
          <ListItem key={k} marker={marker}>
            {frame.children}
          </ListItem>,
        );
        break;
      }

      case 'alert_open':
        stack.push({ type: 'alert', meta: token.meta as Record<string, unknown>, children: [] });
        break;
      case 'alert_close': {
        const frame = stack.pop()!;
        const alertType = String(frame.meta?.type ?? 'note') as 'note' | 'tip' | 'important' | 'warning' | 'caution';
        top().children.push(
          <Note key={k} variant={alertType}>
            {frame.children}
          </Note>,
        );
        break;
      }

      case 'container_tabs_open':
        stack.push({ type: 'tabs', meta: { panels: [] as TabPanel[] }, children: [] });
        break;
      case 'container_tabs_close': {
        const frame = stack.pop()!;
        const panels = (frame.meta?.panels as TabPanel[]) ?? [];
        top().children.push(<Tabs key={k} panels={panels} />);
        break;
      }

      case 'container_tab_open':
        stack.push({
          type: 'tab',
          meta: { label: tabLabelFromInfo(token.info) },
          children: [],
        });
        break;
      case 'container_tab_close': {
        const frame = stack.pop()!;
        const parent = top();
        if (parent.type === 'tabs' && parent.meta) {
          const panels = (parent.meta.panels as TabPanel[]) ?? [];
          panels.push({
            label: String(frame.meta?.label ?? ''),
            content: <View>{frame.children}</View>,
          });
          parent.meta.panels = panels;
        }
        break;
      }

      case 'table_open':
        stack.push({
          type: 'table',
          meta: { headers: [] as ReactNode[], rows: [] as ReactNode[][], inHead: false },
          children: [],
        });
        break;
      case 'thead_open': {
        const t = top();
        if (t.meta) t.meta.inHead = true;
        break;
      }
      case 'tbody_open': {
        const t = top();
        if (t.meta) t.meta.inHead = false;
        break;
      }
      case 'thead_close':
      case 'tbody_close':
        break;
      case 'tr_open':
        stack.push({ type: 'tr', children: [] });
        break;
      case 'tr_close': {
        const frame = stack.pop()!;
        const tableFrame = top();
        if (tableFrame.type === 'table' && tableFrame.meta) {
          if (tableFrame.meta.inHead) {
            tableFrame.meta.headers = frame.children;
          } else {
            const rows = (tableFrame.meta.rows as ReactNode[][]) ?? [];
            rows.push(frame.children);
            tableFrame.meta.rows = rows;
          }
        }
        break;
      }
      case 'th_open':
      case 'td_open':
        stack.push({ type: 'cell', children: [] });
        break;
      case 'th_close':
      case 'td_close': {
        const frame = stack.pop()!;
        // Combine cell children into a single Text node for table layout
        top().children.push(
          <Text key={k} className="text-text-muted text-sm">
            {frame.children}
          </Text>,
        );
        break;
      }
      case 'table_close': {
        const frame = stack.pop()!;
        const headers = (frame.meta?.headers as ReactNode[]) ?? [];
        const rows = (frame.meta?.rows as ReactNode[][]) ?? [];
        top().children.push(<MarkdownTable key={k} headers={headers} rows={rows} />);
        break;
      }

      case 'blockquote_open':
        stack.push({ type: 'blockquote', children: [] });
        break;
      case 'blockquote_close': {
        const frame = stack.pop()!;
        top().children.push(
          <View key={k} className="border-l-4 border-border pl-4 my-4" style={{ borderLeftWidth: 4 }}>
            {frame.children}
          </View>,
        );
        break;
      }

      case 'hr':
        top().children.push(<View key={k} className="border-t border-border my-6" />);
        break;

      default:
        break;
    }
  }

  return stack[0].children;
};
