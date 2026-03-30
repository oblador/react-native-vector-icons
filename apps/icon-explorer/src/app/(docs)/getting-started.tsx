import { DocScreen } from '@/components/DocScreen';
import { Markdown } from '@/components/Markdown';
import { PlatformTabs } from '@/components/PlatformTabs';
import * as content from '@/content/docs/getting-started';

export default function GettingStartedScreen() {
  return (
    <DocScreen title={content.title}>
      <Markdown content={content.body} />
      {Object.entries(content.tabs).map(([groupName, sections]) => (
        <PlatformTabs key={groupName} title={groupName} sections={sections} />
      ))}
      <Markdown content={content.afterTabs} />
    </DocScreen>
  );
}
