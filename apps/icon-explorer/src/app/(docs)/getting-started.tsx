import { DocScreen } from '@/components/DocScreen';
import { Markdown } from '@/components/markdown';
import * as content from '@/content/docs/generated/getting-started';

const Screen = () => {
  return (
    <DocScreen title={content.title}>
      <Markdown source={content.body} />
    </DocScreen>
  );
};

export default Screen;
