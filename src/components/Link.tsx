import { Data, Element, ElementJsx, Border, Font } from 'espectro';
import { Theming } from '../themes/theme.ts';
import { space } from '../tokens/spacing.ts';
import { Tokens } from '../../mod.ts';

const { padding, focused, rem, moveDown, moveUp, mouseDown, mouseOver } =
    Element;

export interface DefaultAnchorArgs {
    theme: Theming;
    url: string;
}

function DefaultAnchorArgs(theme: Theming, url: string) {
    return { theme, url };
}

function attributes_(theme: Theming, attributes: Data.Attribute[]) {
    return [
        Font.underline,
        Font.color(theme.link.color),
        mouseDown(active([])),
        mouseOver(hover(theme, [])),
        focused(focus(theme, [])),
        ...attributes,
    ];
}

function hover(theme: Theming, attributes: Data.Attribute[]) {
    return [
        moveUp(1),
        Font.color({ ...theme.link.color, alpha: 0.7 }),
        ...attributes,
    ];
}

function focus(theme: Theming, attributes: Data.Attribute[]) {
    return [
        moveUp(1),
        Border.shadow(Data.Shadow(theme.color.focus, [0, 0], 0, 3)),
        ...attributes,
    ];
}

function active(attributes: Data.Attribute[]) {
    return [moveDown(1), Border.shadows(Tokens.shadows.down), ...attributes];
}

function Link({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: DefaultAnchorArgs;
    children: preact.ComponentChild;
}) {
    return (
        <ElementJsx.Link
            attributes={attributes_(options.theme, [
                padding(rem(space.xs)),
                ...attributes,
            ])}
            url={options.url}
        >
            {children}
        </ElementJsx.Link>
    );
}

function LinkText({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: DefaultAnchorArgs;
    children: preact.ComponentChild;
}) {
    return (
        <ElementJsx.Link
            attributes={attributes_(options.theme, attributes)}
            url={options.url}
        >
            {children}
        </ElementJsx.Link>
    );
}

export { Link, LinkText };
