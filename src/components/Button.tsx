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
import { Theming } from '../themes/theme.ts';
import { Maybe } from 'elmish';
import { space } from '../tokens/spacing.ts';
import { radius, noShadow } from '../tokens/tokens.ts';
import { Colors } from '../tokens/color.ts';
import { Tokens } from '../../mod.ts';

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

// Buttons type: button or anchor

function Button({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: DefaultButtonArgs;
    children: preact.ComponentChild;
}): preact.JSX.Element {
    const btnOptions = defaultBtnArgs(options.theme, options.onPress);
    return (
        <Btn
            attributes={[Border.rounded(radius.default), ...attributes]}
            options={{ ...btnOptions, device: options.device }}
        >
            {children}
        </Btn>
    );
}

function ButtonSquare({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: DefaultButtonArgs;
    children: preact.ComponentChild;
}): preact.JSX.Element {
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

function ButtonRound({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: DefaultButtonArgs;
    children: preact.ComponentChild;
}): preact.JSX.Element {
    const btnOptions = defaultBtnArgs(options.theme, options.onPress);
    return (
        <Btn
            attributes={[Border.rounded(radius.rounded), ...attributes]}
            options={{ ...btnOptions, device: options.device }}
        >
            {children}
        </Btn>
    );
}

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

function secondaryAttr(theme: Theming) {
    return [
        Font.color(theme.color.secondary),
        mouseDown([
            Background.color({ ...theme.color.secondary, alpha: 0.16 }),
        ]),
        mouseOver(hover(secondaryHover(theme.color))),
        focused(focus(theme, [])),
    ];
}

function secondaryHover(color: Colors) {
    return [
        Background.color({ ...color.secondary, alpha: 0.04 }),
        Border.shadow(noShadow),
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

// Size
const xs = paddingXY(rem(0.6), rem(space.xs));

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
        Font.semiBold,
        Font.variant(Font.smallCaps),
        Font.color(theme.button.color),
        Background.color(theme.button.background),
        mouseDown(active([])),
        mouseOver(hover([])),
        focused(focus(theme, [])),
        ...attributes,
    ];
}

function hover(attributes: Data.Attribute[]) {
    return [moveUp(1), Border.shadows(Tokens.shadows.up), ...attributes];
}

function focus(theme: Theming, attributes: Data.Attribute[]) {
    return [
        moveUp(1),
        Border.shadows([
            Data.Shadow(theme.button.focus, [0, 0], 0, 3),
            ...Tokens.shadows.up,
        ]),
        ...attributes,
    ];
}

function active(attributes: Data.Attribute[]) {
    return [moveDown(1), Border.shadows(Tokens.shadows.down), ...attributes];
}

function Btn({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: ButtonArgs;
    children: preact.ComponentChild;
}): preact.JSX.Element {
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
                    {typeof children === 'string'
                        ? children.toLowerCase()
                        : children}
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
                    {typeof children === 'string'
                        ? children.toLowerCase()
                        : children}
                </InputJsx.Button>
            );
    }
}

export { Button, ButtonAnchor, ButtonSecondary, ButtonRound, ButtonSquare };
