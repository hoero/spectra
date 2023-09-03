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

function secondaryAttr(color: Colors) {
    return [
        Font.color(color.secondary),
        mouseDown([Background.color({ ...color.secondary, alpha: 0.16 })]),
        mouseOver(focusHover(secondaryFocusHover(color))),
        focused(focusHover(secondaryFocusHover(color))),
    ];
}

function secondaryFocusHover(color: Colors) {
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
            attributes={secondaryAttr(options.theme.color).concat(attributes)}
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
            rem(space.md),
            Rem.rrems(device, {
                ...Responsive.breakpoints,
                default: 1.3,
                phone: 2.2,
            })
        ),
        Border.rounded(radius.default),
        Font.semiBold,
        Font.variant(Font.smallCaps),
        Font.color(theme.color.text),
        mouseDown(active([])),
        mouseOver(focusHover([])),
        focused(focusHover([])),
        ...attributes,
    ];
}

function focusHover(attributes: Data.Attribute[]) {
    return [moveUp(1), ...attributes];
}

function active(attributes: Data.Attribute[]) {
    return [moveDown(1), ...attributes];
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
