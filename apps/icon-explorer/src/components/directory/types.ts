import type { IconFamily } from '@/data/icon-families';

export type GlyphmapIndex = Record<string, Record<string, number>>;

export type IconEntry = {
  name: string;
  codepoint: number;
  family: string;
  meta: IconFamily;
};

export type FilterState = {
  query: string;
  status: 'all' | 'active' | 'deprecated';
  licence: 'all' | 'free' | 'pro';
  styles: string[];
  families: string[];
};
