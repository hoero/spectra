import {
    Colors,
    Dropdown,
    Form,
    Header,
    Nav,
    Table,
    Tag,
    Tooltip,
    light,
    Button,
} from '../tokens/color.ts';
import { Color, Data } from 'espectro';
import { radius } from '../tokens/tokens.ts';

const { rgba255 } = Color,
    { Shadow } = Data;

const border: Data.Hsla = { ...light.white, lightness: 0, alpha: 0.1 };

/**
 * Color
 */

const text = { ...light.white, lightness: 16 };

const color: Colors = {
    primary: light.grey.grey30,
    secondary: light.grey.grey60,
    text: text,
    textSecondary: { ...text, alpha: 0.7 },
    textTertiary: { ...text, alpha: 0.4 },
    bodyBackground: light.white,
    gradient: { c1: light.white, c2: light.grey.grey96 },
};

/**
 * Button
 */

const button: Button = {
    color: light.white,
    background: { ...light.white, lightness: 16 },
    focus: { ...light.white, lightness: 60 },
};

/**
 * Form
 */

const form: Form = {
    legendDescription: color.textSecondary,
    inputBackground: color.bodyBackground,
    inputBackgroundDisabled: color.bodyBackground,
    inputBorder: { ...light.grey.grey30, saturation: 0.13, lightness: 0.86 },
    inputBorderFocus: {
        ...light.grey.grey30,
        saturation: 0.13,
        lightness: 0.72,
    },
    inputRadius: radius.medium,
};

/**
 * Dropdown
 */

const dropdown: Dropdown = {
    background: form.inputBackground,
    border: form.inputBorder,
    borderFocus: form.inputBorderFocus,
    option: { ...light.black, alpha: 0.05 },
    radius: form.inputRadius,
    shadow: Shadow(rgba255(34, 36, 38, 0.15), [0, 2], 6, 0),
};

/**
 * Header
 */

const header: Header = { background: color.bodyBackground, border };

/**
 * Nav
 */

const nav: Nav = {
    link: color.text,
    dropLinkHover: { ...light.black, alpha: 0.1 },
    dropLinkActive: { ...light.black, alpha: 0.15 },
    tertiaryLinkBg: light.grey.grey10,
    tertiaryLinkColor: light.grey.grey70,
};

/**
 * Table
 */

const table: Table = {
    headFootBg: light.white,
    background: light.white,
    border,
    fieldsetColor: light.grey.grey90,
    fieldsetTableRowLine: light.grey.grey95,
    title: color.textSecondary,
    rowLine: light.grey.grey95,
    rowHover: { ...light.white, lightness: 0.98 },
    rowStripe: light.white,
};

/**
 * Tag
 */

const tag: Tag = { color: light.white, background: light.grey.grey30 };

/**
 * Tooltip
 */
const tooltip: Tooltip = { color: light.white, background: light.grey.grey30 };

export default {
    color,
    button,
    dropdown,
    form,
    header,
    nav,
    table,
    tag,
    tooltip,
};
