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
} from '../tokens/color.ts';
import { Data } from 'espectro';
import Light from './light.ts';

const border: Data.Hsla = { ...light.white, alpha: 0.1 };

/**
 * Color
 */

const color_ = Light.color;

const color: Colors = {
    ...color_,
    text: light.white,
    textSecondary: { ...light.white, alpha: 0.7 },
    textTertiary: { ...light.white, alpha: 0.4 },
    bodyBackground: light.grey.grey5,
    gradient: { c1: light.grey.grey10, c2: light.grey.grey10 },
};

/**
 * Form
 */
const form_ = Light.form;

const form: Form = {
    ...form_,
    legendDescription: color.textSecondary,
    inputBackground: light.grey.grey10,
    inputBackgroundDisabled: light.grey.grey10,
    inputBorder: border,
    inputBorderFocus: light.white,
};

/**
 * Dropdown
 */

const dropdown_ = Light.dropdown;

const dropdown: Dropdown = {
    ...dropdown_,
    background: form.inputBackground,
    border: form.inputBorder,
    borderFocus: form.inputBorderFocus,
    option: { ...light.white, alpha: 0.05 },
    shadow: Data.Shadow(light.black, [0, 2], 6, 0),
};

/**
 * Header
 */

const header: Header = { background: light.grey.grey10, border };

/**
 * Nav
 */

const nav: Nav = {
    link: { ...light.white, alpha: 0.8 },
    dropLinkHover: { ...light.white, alpha: 0.1 },
    dropLinkActive: { ...light.white, alpha: 0.15 },
    tertiaryLinkBg: light.grey.grey96,
    tertiaryLinkColor: light.grey.grey50,
};

/**
 * Table
 */

const table: Table = {
    headFootBg: light.grey.grey10,
    background: light.grey.grey10,
    border,
    fieldsetColor: light.grey.grey30,
    fieldsetTableRowLine: light.grey.grey30,
    title: color.textSecondary,
    rowLine: border,
    rowHover: { ...light.white, lightness: 0.015 },
    rowStripe: { ...light.white, lightness: 0.005 },
};

/**
 * Tag
 */

const tag: Tag = { color: light.grey.grey10, background: light.white };

/**
 * Tooltip
 */
const tooltip: Tooltip = { color: light.grey.grey10, background: light.white };

export default { color, dropdown, form, header, nav, table, tag, tooltip };
