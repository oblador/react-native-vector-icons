const path = require('node:path');
const matter = require('gray-matter');
const upstream = require('expo/expo-config/babel-transformer');

module.exports.transform = function transform({ filename, src, options, plugins }) {
  if (!filename.endsWith('.md')) {
    return upstream.transform({ filename, src, options, plugins });
  }

  const { data, content } = matter(src);
  const slug = path.basename(filename, '.md');
  const title = String(data.title ?? slug);
  const description = String(data.description ?? '');
  const body = content.trim();

  const synthesised =
    `export const title = ${JSON.stringify(title)};\n` +
    `export const description = ${JSON.stringify(description)};\n` +
    `export const body = ${JSON.stringify(body)};\n`;

  return upstream.transform({ filename, src: synthesised, options, plugins });
};
