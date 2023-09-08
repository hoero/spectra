import {
    Data,
    Element,
    ElementJsx,
    Background,
    Border,
    Font,
    InputJsx,
    Responsive,
    Rem,
} from 'espectro';
import { Maybe } from 'elmish';

import { Theming } from '../themes/theme.ts';
import { space } from '../tokens/spacing.ts';
import { radius, noShadow } from '../tokens/tokens.ts';
import { Colors, Button } from '../tokens/color.ts';
import { shadows } from '../tokens/tokens.ts';

const { DeviceClass, Orientation, Device } = Responsive,
    { Nothing } = Maybe,
    { paddingXY, focused, rem, moveDown, moveUp, mouseDown, mouseOver } =
        Element;

export enum Type {
    Anchor,
    Button,
}

export interface DefaultButtonArgs {
    device: Responsive.Device;
    theme: Theming;
    onPress: Data.Maybe<preact.JSX.EventHandler<preact.JSX.TargetedEvent>>;
}

function DefaultButtonArgs(
    device: Responsive.Device,
    theme: Theming,
    onPress: Data.Maybe<preact.JSX.EventHandler<preact.JSX.TargetedEvent>>
) {
    return { device, theme, onPress };
}

export interface DefaultButtonIconArgs {
    device: Responsive.Device;
    theme: Theming;
    icon: string;
    onPress: Data.Maybe<preact.JSX.EventHandler<preact.JSX.TargetedEvent>>;
}

function DefaultButtonIconArgs(
    device: Responsive.Device,
    theme: Theming,
    icon: string,
    onPress: Data.Maybe<preact.JSX.EventHandler<preact.JSX.TargetedEvent>>
) {
    return { device, theme, icon, onPress };
}

export interface DefaultAnchorArgs {
    device: Responsive.Device;
    theme: Theming;
    url: string;
}

function DefaultAnchorArgs(
    device: Responsive.Device,
    theme: Theming,
    url: string
) {
    return { device, theme, url };
}

export interface DefaultAnchorIconArgs {
    device: Responsive.Device;
    theme: Theming;
    url: string;
    icon: string;
}

function DefaultAnchorIconArgs(
    device: Responsive.Device,
    theme: Theming,
    url: string,
    icon: string
) {
    return { device, theme, url, icon };
}

// Defaults

function defaultBtnArgs(
    theme: Theming,
    onPress: Data.Maybe<preact.JSX.EventHandler<preact.JSX.TargetedEvent>>
): ButtonArgs {
    return ButtonArgs(
        Device(DeviceClass.Desktop, Orientation.Landscape),
        theme,
        Type.Button,
        '',
        onPress
    );
}

function defaultAnchorArgs(theme: Theming): ButtonArgs {
    return ButtonArgs(
        Device(DeviceClass.Desktop, Orientation.Landscape),
        theme,
        Type.Anchor,
        '',
        Nothing()
    );
}

function defaultBtnIconArgs(
    theme: Theming,
    onPress: Data.Maybe<preact.JSX.EventHandler<preact.JSX.TargetedEvent>>
): ButtonIconArgs {
    return ButtonIconArgs(
        Device(DeviceClass.Desktop, Orientation.Landscape),
        theme,
        Type.Button,
        '',
        '',
        Nothing(),
        onPress
    );
}

function defaultAnchorIconArgs(theme: Theming): ButtonIconArgs {
    return ButtonIconArgs(
        Device(DeviceClass.Desktop, Orientation.Landscape),
        theme,
        Type.Anchor,
        '',
        '',
        Nothing(),
        Nothing()
    );
}

// Size
const size = { xs: paddingXY(rem(0.6), rem(space.xs)) };

// Buttons type: button or anchor

// Primary buttons

function Button({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: DefaultButtonArgs;
    children: preact.ComponentChild;
}) {
    const btnOptions = defaultBtnArgs(options.theme, options.onPress);
    return (
        <Btn
            attributes={attributes}
            options={{ ...btnOptions, device: options.device }}
        >
            {children}
        </Btn>
    );
}

// Primary anchor buttons

function ButtonAnchor({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: DefaultAnchorArgs;
    children: preact.ComponentChild;
}) {
    const btnOptions = defaultAnchorArgs(options.theme);
    return (
        <Btn
            attributes={attributes}
            options={{
                ...btnOptions,
                device: options.device,
                url: options.url,
            }}
        >
            {children}
        </Btn>
    );
}

// Secondary buttons

function secondaryAttr(theme: Theming) {
    return [
        Font.color(theme.button.background),
        Background.color({ ...theme.button.background, alpha: 0 }),
    ];
}

function ButtonSecondary({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: DefaultButtonArgs;
    children: preact.ComponentChild;
}) {
    const btnOptions = defaultBtnArgs(options.theme, options.onPress);
    return (
        <Btn
            attributes={secondaryAttr(options.theme).concat(attributes)}
            options={{ ...btnOptions, device: options.device }}
        >
            {children}
        </Btn>
    );
}

// Ghost buttons

function ghostAttr(theme: Theming) {
    return [
        Font.color(theme.button.background),
        Background.color({ ...theme.button.background, alpha: 0 }),
        Border.color({ ...theme.button.background, alpha: 0 }),
        mouseDown(ghostActive(theme.button)),
        mouseOver(ghostHover(theme.button)),
        focused(ghostFocus(theme)),
    ];
}

function ghostHover(color: Button) {
    return [
        Background.color({ ...color.color, alpha: 0.1 }),
        Border.shadow(noShadow),
    ];
}

function ghostFocus(theme: Theming) {
    return [Border.shadow(Data.Shadow(theme.color.focus, [0, 0], 0, 3))];
}

function ghostActive(color: Button) {
    return [
        Background.color({ ...color.color, alpha: 0.15 }),
        Border.shadow(noShadow),
    ];
}

function ButtonGhost({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: DefaultButtonArgs;
    children: preact.ComponentChild;
}) {
    const btnOptions = defaultBtnArgs(options.theme, options.onPress);
    return (
        <Btn
            attributes={ghostAttr(options.theme).concat(attributes)}
            options={{ ...btnOptions, device: options.device }}
        >
            {children}
        </Btn>
    );
}

// Core components

interface ButtonArgs {
    device: Responsive.Device;
    theme: Theming;
    type: Type;
    url: string;
    onPress: Data.Maybe<preact.JSX.EventHandler<preact.JSX.TargetedEvent>>;
}

function ButtonArgs(
    device: Responsive.Device,
    theme: Theming,
    type: Type,
    url: string,
    onPress: Data.Maybe<preact.JSX.EventHandler<preact.JSX.TargetedEvent>>
) {
    return { device, theme, type, url, onPress };
}

interface ButtonIconArgs {
    device: Responsive.Device;
    theme: Theming;
    type: Type;
    url: string;
    icon: string;
    tooltip: Data.Maybe<unknown>;
    onPress: Data.Maybe<preact.JSX.EventHandler<preact.JSX.TargetedEvent>>;
}

function ButtonIconArgs(
    device: Responsive.Device,
    theme: Theming,
    type: Type,
    url: string,
    icon: string,
    tooltip: Data.Maybe<unknown>,
    onPress: Data.Maybe<preact.JSX.EventHandler<preact.JSX.TargetedEvent>>
) {
    return { device, theme, type, url, icon, tooltip, onPress };
}

function attributes_(
    device: Responsive.Device,
    theme: Theming,
    attributes: Data.Attribute[]
) {
    return [
        paddingXY(
            Rem.rrems(device, {
                ...Responsive.breakpoints,
                default: space.md,
                phone: space.xl,
            }),
            Rem.rrems(device, {
                ...Responsive.breakpoints,
                default: 1.15,
                phone: space.lg,
            })
        ),
        Font.color(theme.button.color),
        Background.color(theme.button.background),
        Border.width(1),
        Border.color(theme.button.background),
        Border.rounded(theme.button.radius),
        mouseDown(active([])),
        mouseOver(hover([])),
        focused(focus(theme, [])),
        ...attributes,
    ];
}

function hover(attributes: Data.Attribute[]) {
    return [moveUp(1), Border.shadows(shadows.up), ...attributes];
}

function focus(theme: Theming, attributes: Data.Attribute[]) {
    return [
        moveUp(1),
        Border.shadows([
            Data.Shadow(theme.color.focus, [0, 0], 0, 3),
            ...shadows.up,
        ]),
        ...attributes,
    ];
}

function active(attributes: Data.Attribute[]) {
    return [moveDown(1), Border.shadows(shadows.down), ...attributes];
}

function Btn({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: ButtonArgs;
    children: preact.ComponentChild;
}) {
    switch (options.type) {
        case Type.Anchor:
            return (
                <ElementJsx.Link
                    attributes={attributes_(
                        options.device,
                        options.theme,
                        attributes
                    )}
                    url={options.url}
                >
                    {children}
                </ElementJsx.Link>
            );

        case Type.Button:
        default:
            return (
                <InputJsx.Button
                    attributes={attributes_(
                        options.device,
                        options.theme,
                        attributes
                    )}
                    onPress={options.onPress}
                >
                    {children}
                </InputJsx.Button>
            );
    }
}

export { Button, ButtonAnchor, ButtonSecondary, ButtonGhost, size };
