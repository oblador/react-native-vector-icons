import { Feather } from '@react-native-vector-icons/feather';
import { useCallback, useEffect, useRef } from 'react';
import { TextInput, View } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

type Props = {
  query: string;
  onChange: (query: string) => void;
};

export const SearchBar = ({ query, onChange }: Props) => {
  const { colours } = useTheme();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleChange = useCallback(
    (value: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onChange(value), 300);
    },
    [onChange],
  );

  return (
    <View className="flex-row items-center rounded-lg border border-border bg-surface px-3 py-2.5">
      <Feather name="search" size={16} color={colours.textDim} />
      <TextInput
        defaultValue={query}
        onChangeText={handleChange}
        placeholder="Search icons..."
        placeholderTextColor={colours.textDim}
        className="ml-2 flex-1 text-sm text-text"
        style={{ outlineStyle: 'none' } as any}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};
