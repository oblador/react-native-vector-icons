import { DocScreen } from '@/components/DocScreen';
import { Markdown } from '@/components/markdown';
import * as content from '@/content/docs/generated/testing';

export default function Screen() {
  return (
    <DocScreen title={content.title}>
      <Markdown source={content.body} />
    </DocScreen>
  );
}
