import { DocScreen } from '@/components/DocScreen';
import { Markdown } from '@/components/Markdown';
import * as content from '@/content/docs/testing';

export default function Screen() {
  return (
    <DocScreen title={content.title}>
      <Markdown content={content.body} />
    </DocScreen>
  );
}
