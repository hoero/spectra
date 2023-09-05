// Components
import * as Buttons from './src/components/Button.tsx';

// Themes
import * as Dark from './src/themes/dark.ts';
import * as Light from './src/themes/light.ts';
import * as Theme from './src/themes/theme.ts';
import * as Font from './src/themes/font.ts';

// Tokens
import * as Color from './src/tokens/color.ts';
import * as Spacing from './src/tokens/spacing.ts';
import * as Tokens from './src/tokens/tokens.ts';

// Components
export * as Buttons from './src/components/Button.tsx';

// Themes
export * as Dark from './src/themes/dark.ts';
export * as Light from './src/themes/light.ts';
export * as Theme from './src/themes/theme.ts';
export * as Font from './src/themes/font.ts';

// Tokens
export * as Color from './src/tokens/color.ts';
export * as Spacing from './src/tokens/spacing.ts';
export * as Tokens from './src/tokens/tokens.ts';

export default {
    Buttons,
    Themes: { Dark, Light, Theme, Font },
    Tokens: { Color, Spacing, Tokens },
};
