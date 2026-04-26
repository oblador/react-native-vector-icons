import { useLocalSearchParams } from 'expo-router';
import { DocScreen } from '@/components/DocScreen';
import { Markdown } from '@/components/markdown';

type Doc = {
  title: string;
  description: string;
  body: string;
};

const ctx = require.context('../../content/docs', false, /\.md$/);
const docs: Record<string, Doc> = Object.fromEntries(
  ctx.keys().map((key) => {
    const slug = key.replace(/^\.\//, '').replace(/\.md$/, '');

    return [slug, ctx<Doc>(key)];
  }),
);

export const generateStaticParams = () => Object.keys(docs).map((slug) => ({ slug }));

const Screen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const doc = docs[slug];
  if (!doc) {
    return null;
  }

  return (
    <DocScreen title={doc.title}>
      <Markdown source={doc.body} />
    </DocScreen>
  );
};

export default Screen;
