export const PLATFORM_SLUG_MAP: Record<string, string> = {
  'PlayStation 5': 'playstation5',
  'PlayStation 4': 'playstation4',
  'Xbox One': 'xbox-one',
  'Xbox Series S/X': 'xbox-series-x',
  'PC': 'pc',
  'Nintendo Switch': 'nintendo-switch',
  'iOS': 'ios',
  'Android': 'android',
  'macOS': 'macos',
  'Linux': 'linux',
}

export type PlatformInfo = {
  name: string;
  slug: string;
}

export function getPlatformIconSlug(platformName: string): string {
  return PLATFORM_SLUG_MAP[platformName] || 'unknown'
}