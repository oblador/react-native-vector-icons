import type { Collection, JSCodeshift, JSXAttribute } from 'jscodeshift';

const componentNames = ['FontAwesome5', 'FontAwesome6', 'FontAwesome5Pro', 'FontAwesome6Pro', 'Icon'];
const iconStyles = ['brand', 'solid', 'light', 'thin', 'duotone', 'sharp', 'sharpSolid', 'sharpLight'];

export default (j: JSCodeshift, root: Collection) =>
  root
    .find(j.JSXOpeningElement)
    .forEach((path) => {
      if (path.node.name.type !== 'JSXIdentifier') {
        return;
      }

      if (!componentNames.includes(path.node.name.name)) {
        return;
      }

      const { node } = path;
      iconStyles.forEach((style) => {
        const styleAttr = node.attributes?.find((attr) => attr.type === 'JSXAttribute' && attr.name.name === style) as
          | JSXAttribute
          | undefined;
        if (!styleAttr) {
          return;
        }

        styleAttr.name = j.jsxIdentifier('iconStyle');
        styleAttr.value = j.stringLiteral(style);
      });
    })
    .toSource();
