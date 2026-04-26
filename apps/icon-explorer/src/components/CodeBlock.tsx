import { View } from 'react-native';
import CodeHighlighter from 'react-native-code-highlighter';
import { atomOneDark, githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from '@/theme/ThemeContext';

// hljs doesn't have jsx/tsx/sh as standalone languages — map to supported ones
const LANGUAGE_MAP: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  sh: 'bash',
  shell: 'bash',
};

type Props = {
  children: string;
  language?: string;
};

export const CodeBlock = ({ children, language = 'text' }: Props) => {
  const resolvedLanguage = LANGUAGE_MAP[language] ?? language;
  const { resolvedTheme } = useTheme();

  return (
    <View className="rounded-lg border border-border overflow-hidden mb-4">
      <CodeHighlighter
        hljsStyle={resolvedTheme === 'dark' ? atomOneDark : githubGist}
        language={resolvedLanguage}
        textStyle={
          { fontSize: 14, lineHeight: 24, minHeight: 24, fontFamily: 'JetBrainsMono', whiteSpace: 'pre-wrap' } as any
        }
        scrollViewProps={{
          style: { flexDirection: 'column' },
          contentContainerStyle: { padding: 16, flexDirection: 'column' },
        }}
        customStyle={{ background: 'none', backgroundColor: 'transparent' }}
      >
        {children}
      </CodeHighlighter>
    </View>
  );
};
