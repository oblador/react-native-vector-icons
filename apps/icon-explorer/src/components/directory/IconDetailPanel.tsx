import { Feather } from '@react-native-vector-icons/feather';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';
import { Text } from '@/components/StyledText';
import { iconRegistry } from '@/data/generated/icon-registry.generated';
import { useTheme } from '@/theme/ThemeContext';
import type { IconEntry } from './types';

const SIZES = [16, 24, 32, 48, 64] as const;

const COLOUR_SWATCHES = [
  { name: 'White', value: '#ffffff' },
  { name: 'Grey', value: '#a1a1aa' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Violet', value: '#8b5cf6' },
] as const;

function CopyBox({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View>
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-text-dim" style={{ fontSize: 11 }}>
          {label}
        </Text>
        <Pressable
          onPress={handleCopy}
          className={`rounded border px-2 py-0.5 ${
            copied ? 'border-accent-cyan bg-accent-cyan' : 'border-border bg-bg'
          }`}
        >
          <Text className={copied ? 'text-black' : 'text-text-muted'} style={{ fontSize: 10, fontWeight: '500' }}>
            {copied ? 'Copied!' : 'Copy'}
          </Text>
        </Pressable>
      </View>
      <View className="rounded-md border border-border bg-bg p-2.5">
        <Text
          className="text-text-muted"
          style={{
            fontSize: 11,
            lineHeight: 16,
            fontFamily: Platform.select({ web: 'monospace', default: undefined }),
          }}
          selectable
        >
          {code}
        </Text>
      </View>
    </View>
  );
}

type Props = {
  icon: IconEntry;
  onClose: () => void;
};

export function IconDetailPanel({ icon, onClose }: Props) {
  const { colours } = useTheme();
  const [size, setSize] = useState<number>(48);
  const [colour, setColour] = useState('#ffffff');
  const [bgLight, setBgLight] = useState(false);

  const IconComponent = iconRegistry[icon.family];
  const codepoint = `U+${icon.codepoint.toString(16).toUpperCase().padStart(4, '0')}`;
  const importCode = `import { ${icon.meta.componentName} } from '${icon.meta.packageName}/static';`;
  const usageCode = `<${icon.meta.componentName} name="${icon.name}" size={${size}} color="${colour}" />`;

  return (
    <View className="gap-5">
      {/* Header */}
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="font-heading text-sm font-semibold text-text">{icon.name}</Text>
          <Text className="text-xs text-text-dim">{icon.meta.displayName}</Text>
        </View>
        <Pressable onPress={onClose} className="rounded p-1">
          <Feather name="x" size={16} color={colours.textDim} />
        </Pressable>
      </View>

      {/* Preview */}
      <View
        className={`items-center justify-center rounded-lg border border-border p-6 ${bgLight ? 'bg-white' : 'bg-bg'}`}
      >
        {IconComponent && <IconComponent name={icon.name} size={size} color={colour} />}
      </View>

      {/* Size selector */}
      <View>
        <Text className="text-text-dim" style={{ fontSize: 11, fontWeight: '500' }}>
          Size
        </Text>
        <View className="mt-1 flex-row gap-1">
          {SIZES.map((s) => (
            <Pressable
              key={s}
              onPress={() => setSize(s)}
              className={`rounded border px-2 py-1 ${
                size === s ? 'border-accent-cyan bg-accent-cyan' : 'border-border bg-bg'
              }`}
            >
              <Text
                className={size === s ? 'text-black' : 'text-text-muted'}
                style={{ fontSize: 11, fontWeight: '500' }}
              >
                {s}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Colour selector */}
      <View>
        <Text className="text-text-dim" style={{ fontSize: 11, fontWeight: '500' }}>
          Colour
        </Text>
        <View className="mt-1 flex-row flex-wrap items-center gap-1.5">
          {COLOUR_SWATCHES.map((swatch) => (
            <Pressable
              key={swatch.value}
              onPress={() => setColour(swatch.value)}
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: swatch.value,
                borderWidth: colour === swatch.value ? 2 : 0,
                borderColor: colours.accentCyan,
              }}
              accessibilityLabel={swatch.name}
            />
          ))}
          {Platform.OS === 'web' && (
            <TextInput
              value={colour}
              onChangeText={setColour}
              className="rounded border border-border bg-bg px-2 py-0.5 text-xs text-text-muted"
              style={{ width: 80, outlineStyle: 'none' } as any}
              placeholder="#hex"
              placeholderTextColor={colours.textDim}
            />
          )}
        </View>
      </View>

      {/* Background toggle */}
      <View className="flex-row items-center gap-2">
        <Text className="text-text-dim" style={{ fontSize: 11, fontWeight: '500' }}>
          Background:
        </Text>
        <Pressable
          onPress={() => setBgLight(false)}
          className={`rounded border px-2 py-0.5 ${
            !bgLight ? 'border-accent-cyan bg-accent-cyan' : 'border-border bg-bg'
          }`}
        >
          <Text className={!bgLight ? 'text-black' : 'text-text-muted'} style={{ fontSize: 10, fontWeight: '500' }}>
            Dark
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setBgLight(true)}
          className={`rounded border px-2 py-0.5 ${
            bgLight ? 'border-accent-cyan bg-accent-cyan' : 'border-border bg-bg'
          }`}
        >
          <Text className={bgLight ? 'text-black' : 'text-text-muted'} style={{ fontSize: 10, fontWeight: '500' }}>
            Light
          </Text>
        </Pressable>
      </View>

      {/* Copy boxes */}
      <CopyBox label="Import" code={importCode} />
      <CopyBox label="Usage" code={usageCode} />

      {/* Metadata */}
      <View className="rounded-md border border-border bg-bg p-3 gap-1">
        <View className="flex-row">
          <Text className="w-20 text-text-dim" style={{ fontSize: 11 }}>
            Name
          </Text>
          <Text
            className="flex-1 text-text-muted"
            style={{ fontSize: 11, fontFamily: Platform.select({ web: 'monospace', default: undefined }) }}
          >
            {icon.name}
          </Text>
        </View>
        <View className="flex-row">
          <Text className="w-20 text-text-dim" style={{ fontSize: 11 }}>
            Codepoint
          </Text>
          <Text
            className="flex-1 text-text-muted"
            style={{ fontSize: 11, fontFamily: Platform.select({ web: 'monospace', default: undefined }) }}
          >
            {codepoint}
          </Text>
        </View>
        <View className="flex-row">
          <Text className="w-20 text-text-dim" style={{ fontSize: 11 }}>
            Family
          </Text>
          <Text className="flex-1 text-text-muted" style={{ fontSize: 11 }}>
            {icon.meta.displayName}
          </Text>
        </View>
        <View className="flex-row">
          <Text className="w-20 text-text-dim" style={{ fontSize: 11 }}>
            Package
          </Text>
          <Text
            className="flex-1 text-text-muted"
            style={{ fontSize: 11, fontFamily: Platform.select({ web: 'monospace', default: undefined }) }}
          >
            {icon.meta.packageName}
          </Text>
        </View>
      </View>
    </View>
  );
}
