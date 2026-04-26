import { Feather } from '@react-native-vector-icons/feather';
import { Link, usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { GradientText } from '@/components/GradientText';
import { Text } from '@/components/StyledText';
import { useTheme } from '@/theme/ThemeContext';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/getting-started', label: 'Getting Started' },
  { href: '/usage', label: 'Usage' },
  { href: '/icon-sets', label: 'Icon Sets' },
  { href: '/directory', label: 'Directory' },
  { href: '/advanced', label: 'Advanced' },
  { href: '/testing', label: 'Testing' },
  { href: '/migration', label: 'Migration' },
] as const;

function NavLink({
  href,
  label,
  isActive,
  onPress,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onPress?: () => void;
}) {
  const router = useRouter();
  return (
    <Link href={href as '/'} asChild>
      <Pressable
        onPress={() => {
          onPress?.();
          router.push(href as '/');
        }}
        className={isActive ? 'rounded-md px-3 py-1.5 bg-accent-cyan/10' : 'rounded-md px-3 py-1.5'}
      >
        <Text className={isActive ? 'text-sm font-medium text-accent-cyan' : 'text-sm font-medium text-text-muted'}>
          {label}
        </Text>
      </Pressable>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const { toggleTheme, resolvedTheme, colours } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <View className="border-b border-border bg-bg z-50">
      {/* Main nav bar */}
      <View className="mx-auto flex-row items-center gap-6 px-4 sm:px-6 py-3 w-full max-w-7xl">
        {/* Logo */}
        <Link href="/" asChild>
          <Pressable>
            <GradientText className="font-heading text-lg font-bold" standalone>
              RNVI
            </GradientText>
          </Pressable>
        </Link>

        {/* Desktop nav links — hidden on small screens */}
        <View className="hidden md:flex flex-row items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} isActive={isActive(link.href)} />
          ))}
        </View>

        {/* Right side icons */}
        <View className="ml-auto flex-row items-center gap-2">
          <Pressable
            className="p-2 rounded-md"
            onPress={() => Linking.openURL('https://github.com/oblador/react-native-vector-icons')}
            accessibilityLabel="GitHub"
          >
            <Feather name="github" size={20} color={colours.textMuted} />
          </Pressable>

          <Pressable
            className="p-2 rounded-md"
            onPress={() => Linking.openURL('https://www.npmjs.com/search?q=%40react-native-vector-icons')}
            accessibilityLabel="npm"
          >
            <Feather name="package" size={20} color={colours.textMuted} />
          </Pressable>

          <Pressable className="p-2 rounded-md" onPress={toggleTheme} accessibilityLabel="Toggle theme">
            <Feather name={resolvedTheme === 'dark' ? 'sun' : 'moon'} size={20} color={colours.textMuted} />
          </Pressable>

          {/* Hamburger — visible only on small screens */}
          <Pressable
            className="p-2 rounded-md flex md:hidden"
            onPress={() => setMenuOpen(!menuOpen)}
            accessibilityLabel="Toggle menu"
          >
            <Feather name="menu" size={20} color={colours.textMuted} />
          </Pressable>
        </View>
      </View>

      {/* Mobile menu */}
      {menuOpen && (
        <View className="border-t border-border px-4 pb-3 flex md:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={isActive(link.href)}
              onPress={() => setMenuOpen(false)}
            />
          ))}
        </View>
      )}
    </View>
  );
}
