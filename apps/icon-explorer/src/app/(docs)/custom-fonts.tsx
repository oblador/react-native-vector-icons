import { DocScreen } from '@/components/DocScreen';
import { Markdown } from '@/components/markdown';
import * as content from '@/content/docs/generated/custom-fonts';

const Screen = () => {
  return (
    <DocScreen title={content.title}>
      <Markdown source={content.body} />
    </DocScreen>
  );
};

export default Screen;
