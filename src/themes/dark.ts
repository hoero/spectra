import { Data } from 'espectro';

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
    Link,
} from '../tokens/color.ts';
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
    hover: { ...light.white, lightness: 20 },
    focus: { ...light.white, lightness: 40 },
    gradient: { c1: light.grey.grey10, c2: light.grey.grey10 },
};

/**
 * Button
 */
const button_ = Light.button;

const button: Button = {
    ...button_,
    color: { ...light.white, lightness: 16 },
    background: light.white,
};

/**
 * Link
 */

const link: Link = {
    color: light.white,
};

/**
 * Form
 */
const form_ = Light.form;

const form: Form = {
    ...form_,
    legendDescription: color.textSecondary,
    background: light.grey.grey10,
    backgroundDisabled: light.grey.grey10,
    border: light.grey.grey60,
    borderHover: light.grey.grey70,
    borderFocus: light.white,
};

/**
 * Dropdown
 */

const dropdown_ = Light.dropdown;

const dropdown: Dropdown = {
    ...dropdown_,
    background: form.background,
    border: form.border,
    borderFocus: form.borderFocus,
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

const tag: Tag = {
    color: { ...light.white, lightness: 16 },
    background: light.white,
};

/**
 * Tooltip
 */
const tooltip: Tooltip = {
    color: { ...light.white, lightness: 16 },
    background: light.white,
};

export default {
    color,
    dropdown,
    form,
    header,
    nav,
    table,
    tag,
    tooltip,
    button,
    link,
};
