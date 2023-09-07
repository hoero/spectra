import Light from './light.ts';
import Dark from './dark.ts';
import {
    Colors,
    Dropdown,
    Button,
    Form,
    Header,
    Nav,
    Table,
    Tag,
    Tooltip,
    Grey,
    grey,
    neutral,
    Link,
} from '../tokens/color.ts';

export enum Theme {
    Light,
    Dark,
}

export interface Theming {
    color: Colors;
    button: Button;
    link: Link;
    dropdown: Dropdown;
    form: Form;
    grey: Grey;
    header: Header;
    nav: Nav;
    table: Table;
    tag: Tag;
    tooltip: Tooltip;
}

function theming(theme: Theme): Theming {
    switch (theme) {
        case Theme.Dark:
            return {
                color: Dark.color,
                button: Dark.button,
                link: Dark.link,
                dropdown: Dark.dropdown,
                form: Dark.form,
                grey,
                header: Dark.header,
                nav: Dark.nav,
                table: Dark.table,
                tag: Dark.tag,
                tooltip: Dark.tooltip,
            };

        case Theme.Light:
        default:
            return {
                color: Light.color,
                button: Light.button,
                link: Light.link,
                dropdown: Light.dropdown,
                form: Light.form,
                grey: neutral,
                header: Light.header,
                nav: Light.nav,
                table: Light.table,
                tag: Light.tag,
                tooltip: Light.tooltip,
            };
    }
}

function convertToTheme(state: boolean) {
    if (state) return Theme.Dark;
    else return Theme.Light;
}

function toBool(theme: Theme) {
    switch (theme) {
        case Theme.Dark:
            return true;

        case Theme.Light:
        default:
            return false;
    }
}

function toString(theme: Theme) {
    switch (theme) {
        case Theme.Dark:
            return 'Dark';

        case Theme.Light:
        default:
            return 'Light';
    }
}

export { convertToTheme, theming, toBool, toString };
