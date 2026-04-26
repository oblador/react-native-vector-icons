import { useMemo } from 'react';
import { View } from 'react-native';
import { parseMarkdown } from './parser';
import { renderMarkdown } from './renderer';

export const Markdown = ({ source }: { source: string }) => {
  const nodes = useMemo(() => renderMarkdown(parseMarkdown(source)), [source]);
  return <View>{nodes}</View>;
};
