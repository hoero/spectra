import { Color, Data } from 'espectro';

const { hsla } = Color;

export interface Colors {
    primary: Data.Hsla;
    secondary: Data.Hsla;
    text: Data.Hsla;
    textSecondary: Data.Hsla;
    textTertiary: Data.Hsla;
    bodyBackground: Data.Hsla;
    gradient: { c1: Data.Hsla; c2: Data.Hsla };
}

export interface Button {
    color: Data.Hsla;
    background: Data.Hsla;
    focus: Data.Hsla;
}

export interface Dropdown {
    background: Data.Hsla;
    border: Data.Hsla;
    borderFocus: Data.Hsla;
    option: Data.Hsla;
    radius: number;
    shadow: Data.Shadow;
}

export interface Form {
    legendDescription: Data.Hsla;
    inputBackground: Data.Hsla;
    inputBackgroundDisabled: Data.Hsla;
    inputBorder: Data.Hsla;
    inputBorderFocus: Data.Hsla;
    inputRadius: number;
}

export interface Header {
    background: Data.Hsla;
    border: Data.Hsla;
}

export interface Nav {
    link: Data.Hsla;
    dropLinkHover: Data.Hsla;
    dropLinkActive: Data.Hsla;
    tertiaryLinkBg: Data.Hsla;
    tertiaryLinkColor: Data.Hsla;
}

export interface Table {
    headFootBg: Data.Hsla;
    background: Data.Hsla;
    border: Data.Hsla;
    fieldsetColor: Data.Hsla;
    fieldsetTableRowLine: Data.Hsla;
    title: Data.Hsla;
    rowLine: Data.Hsla;
    rowHover: Data.Hsla;
    rowStripe: Data.Hsla;
}

export interface Tag {
    color: Data.Hsla;
    background: Data.Hsla;
}

export interface Tooltip {
    color: Data.Hsla;
    background: Data.Hsla;
}

export interface Grey {
    grey5: Data.Hsla;
    grey10: Data.Hsla;
    grey20: Data.Hsla;
    grey30: Data.Hsla;
    grey40: Data.Hsla;
    grey50: Data.Hsla;
    grey60: Data.Hsla;
    grey70: Data.Hsla;
    grey80: Data.Hsla;
    grey90: Data.Hsla;
    grey95: Data.Hsla;
    grey96: Data.Hsla;
}

// Notifications

const vermilion = hsla(5, 76, 55, 1),
    bluishGreen = hsla(164, 100, 31, 1),
    skyBlue = hsla(202, 77, 63, 1),
    orange = hsla(41, 100, 45, 1);

const status = {
    success: bluishGreen,
    invalid: vermilion,
    warning: orange,
    info: skyBlue,
};

// Black, white and greys

const white = hsla(0, 0, 100, 1);

const neutral: Grey = {
    grey5: { ...white, lightness: 5 },
    grey10: { ...white, lightness: 10 },
    grey20: { ...white, lightness: 20 },
    grey30: { ...white, lightness: 30 },
    grey40: { ...white, lightness: 40 },
    grey50: { ...white, lightness: 50 },
    grey60: { ...white, lightness: 60 },
    grey70: { ...white, lightness: 70 },
    grey80: { ...white, lightness: 80 },
    grey90: { ...white, lightness: 90 },
    grey95: { ...white, lightness: 95 },
    grey96: { ...white, lightness: 96 },
};

/** Change these based on app colors
  - if you want a cool grey with a light tint of blue (or cold color)
  - or a warm grey with a light tint of orange (or a warm color)
*/

const coolGrey: Data.Hsla = { ...skyBlue, saturation: 30 },
    warmGrey: Data.Hsla = { ...orange, saturation: 30 };

const cool: Grey = {
        grey5: { ...coolGrey, lightness: 5 },
        grey10: { ...coolGrey, lightness: 10 },
        grey20: { ...coolGrey, lightness: 20 },
        grey30: { ...coolGrey, lightness: 30 },
        grey40: { ...coolGrey, lightness: 40 },
        grey50: { ...coolGrey, lightness: 50 },
        grey60: { ...coolGrey, lightness: 60 },
        grey70: { ...coolGrey, lightness: 70 },
        grey80: { ...coolGrey, lightness: 80 },
        grey90: { ...coolGrey, lightness: 90 },
        grey95: { ...coolGrey, lightness: 95 },
        grey96: { ...coolGrey, lightness: 96 },
    },
    warm: Grey = {
        grey5: { ...warmGrey, lightness: 5 },
        grey10: { ...warmGrey, lightness: 10 },
        grey20: { ...warmGrey, lightness: 20 },
        grey30: { ...warmGrey, lightness: 30 },
        grey40: { ...warmGrey, lightness: 40 },
        grey50: { ...warmGrey, lightness: 50 },
        grey60: { ...warmGrey, lightness: 60 },
        grey70: { ...warmGrey, lightness: 70 },
        grey80: { ...warmGrey, lightness: 80 },
        grey90: { ...warmGrey, lightness: 90 },
        grey95: { ...warmGrey, lightness: 95 },
        grey96: { ...warmGrey, lightness: 96 },
    };

// Used ones

const grey: Grey = neutral;

const light = {
    black: { ...white, lightness: 0 },
    white,
    grey,
};

export {
    vermilion,
    skyBlue,
    orange,
    bluishGreen,
    status,
    light,
    cool,
    warm,
    grey,
    neutral,
};
