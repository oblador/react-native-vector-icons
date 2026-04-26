import { createContext, useContext } from 'react';
import { Text as RNText, type TextProps } from 'react-native';

const TextAncestorContext = createContext(false);

/**
 * Text component that defaults to the Inter (font-body) font family.
 * Only injects font-body on top-level Text — nested Text (e.g. inside
 * a font-heading parent) is left alone so font inheritance works.
 */
export const Text = ({ className, ...props }: TextProps & { className?: string }) => {
  const isNested = useContext(TextAncestorContext);
  const hasFontFamily = className?.includes('font-heading') || className?.includes('font-mono');
  const classes = !isNested && !hasFontFamily ? `font-body ${className ?? ''}`.trim() : className;

  return (
    <TextAncestorContext.Provider value={true}>
      <RNText className={classes} {...props} />
    </TextAncestorContext.Provider>
  );
};
