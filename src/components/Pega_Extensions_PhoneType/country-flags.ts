export const COUNTRY_FLAGS = {
  '+1': { emoji: '🇺🇸', name: 'United States' },
  '+7': { emoji: '🇷🇺', name: 'Russia (Pоссия)' },
  '+91': { emoji: '🇮🇳', name: 'India' },
  '+44': { emoji: '🇬🇧', name: 'United Kingdom' },
  '+33': { emoji: '🇫🇷', name: 'France' }
  // Add all countries needed
} as const;

export const getCountryDisplay = (code: string, originalName?: string) => {
  const country = COUNTRY_FLAGS[code as keyof typeof COUNTRY_FLAGS] || {
    emoji: '🌐',
    name: originalName || code
  };
  return `${country.emoji} ${country.name} ${code}`;
};
