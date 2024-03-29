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
import { noShadow } from '../tokens/tokens.ts';
import { Button } from '../tokens/color.ts';
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
    onPress?: preact.JSX.EventHandler<preact.JSX.TargetedEvent>;
    invalid?: boolean;
}

function DefaultButtonArgs(
    device: Responsive.Device,
    theme: Theming,
    onPress?: preact.JSX.EventHandler<preact.JSX.TargetedEvent>,
    invalid?: boolean
) {
    return { device, theme, onPress, invalid };
}

export interface DefaultButtonIconArgs {
    device: Responsive.Device;
    theme: Theming;
    icon: string;
    onPress?: preact.JSX.EventHandler<preact.JSX.TargetedEvent>;
}

function DefaultButtonIconArgs(
    device: Responsive.Device,
    theme: Theming,
    icon: string,
    onPress?: preact.JSX.EventHandler<preact.JSX.TargetedEvent>
) {
    return { device, theme, icon, onPress };
}

export interface DefaultAnchorArgs {
    device: Responsive.Device;
    theme: Theming;
    url: string;
    invalid?: boolean;
}

function DefaultAnchorArgs(
    device: Responsive.Device,
    theme: Theming,
    url: string,
    invalid?: boolean
) {
    return { device, theme, url, invalid };
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
    onPress?: preact.JSX.EventHandler<preact.JSX.TargetedEvent>,
    invalid?: boolean
): ButtonArgs {
    return ButtonArgs(
        Device(DeviceClass.Desktop, Orientation.Landscape),
        theme,
        Type.Button,
        '',
        onPress,
        invalid
    );
}

function defaultAnchorArgs(
    theme: Theming,
    url: string,
    invalid?: boolean
): ButtonArgs {
    return ButtonArgs(
        Device(DeviceClass.Desktop, Orientation.Landscape),
        theme,
        Type.Anchor,
        url,
        undefined,
        invalid
    );
}

// Size
const size = {
    xs: paddingXY(rem(0.6), rem(space.xs)),
    sm: paddingXY(rem(1), rem(space.sm)),
};

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
    const btnOptions = defaultBtnArgs(
        options.theme,
        options.onPress,
        options.invalid
    );
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
    const btnOptions = defaultAnchorArgs(
        options.theme,
        options.url,
        options.invalid
    );
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

function secondaryAttr(theme: Theming, invalid: boolean) {
    return [
        Font.color(invalid ? theme.color.invalid : theme.button.background),
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
    const btnOptions = defaultBtnArgs(
        options.theme,
        options.onPress,
        options.invalid
    );
    return (
        <Btn
            attributes={secondaryAttr(
                options.theme,
                options.invalid ? options.invalid : false
            ).concat(attributes)}
            options={{ ...btnOptions, device: options.device }}
        >
            {children}
        </Btn>
    );
}

function ButtonAnchorSecondary({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: DefaultAnchorArgs;
    children: preact.ComponentChild;
}) {
    const btnOptions = defaultAnchorArgs(
        options.theme,
        options.url,
        options.invalid
    );
    return (
        <Btn
            attributes={secondaryAttr(
                options.theme,
                options.invalid ? options.invalid : false
            ).concat(attributes)}
            options={{ ...btnOptions, device: options.device }}
        >
            {children}
        </Btn>
    );
}

// Ghost buttons

function ghostAttr(theme: Theming, invalid: boolean) {
    return [
        Font.color(invalid ? theme.color.invalid : theme.button.background),
        Background.color({ ...theme.button.background, alpha: 0 }),
        Border.color({ ...theme.button.background, alpha: 0 }),
        focused(ghostFocus(theme, invalid)),
        mouseDown(ghostActive(theme, invalid)),
        mouseOver(ghostHover(theme, invalid)),
    ];
}

function ghostHover(theme: Theming, invalid: boolean) {
    return [
        Background.color(
            invalid
                ? { ...theme.color.invalid, alpha: 0.1 }
                : { ...theme.button.background, alpha: 0.1 }
        ),
        Border.shadow(noShadow),
    ];
}

function ghostFocus(theme: Theming, invalid: boolean) {
    return [
        Border.shadow(
            Data.Shadow(
                invalid
                    ? { ...theme.color.invalid, alpha: 0.4 }
                    : theme.color.focus,
                [0, 0],
                0,
                3
            )
        ),
    ];
}

function ghostActive(theme: Theming, invalid: boolean) {
    return [
        Background.color(
            invalid
                ? { ...theme.color.invalid, alpha: 0.15 }
                : { ...theme.button.background, alpha: 0.15 }
        ),
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
    const btnOptions = defaultBtnArgs(
        options.theme,
        options.onPress,
        options.invalid
    );
    return (
        <Btn
            attributes={ghostAttr(
                options.theme,
                options.invalid ? options.invalid : false
            ).concat(attributes)}
            options={{ ...btnOptions, device: options.device }}
        >
            {children}
        </Btn>
    );
}

function ButtonAnchorGhost({
    attributes,
    options,
    children,
}: {
    attributes: Data.Attribute[];
    options: DefaultAnchorArgs;
    children: preact.ComponentChild;
}) {
    const btnOptions = defaultAnchorArgs(
        options.theme,
        options.url,
        options.invalid
    );
    return (
        <Btn
            attributes={ghostAttr(
                options.theme,
                options.invalid ? options.invalid : false
            ).concat(attributes)}
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
    onPress?: preact.JSX.EventHandler<preact.JSX.TargetedEvent>;
    invalid?: boolean;
}

function ButtonArgs(
    device: Responsive.Device,
    theme: Theming,
    type: Type,
    url: string,
    onPress?: preact.JSX.EventHandler<preact.JSX.TargetedEvent>,
    invalid?: boolean
) {
    return { device, theme, type, url, onPress, invalid };
}

interface ButtonIconArgs {
    device: Responsive.Device;
    theme: Theming;
    type: Type;
    url: string;
    icon: string;
    tooltip?: Data.Maybe<unknown>;
    onPress?: preact.JSX.EventHandler<preact.JSX.TargetedEvent>;
}

function ButtonIconArgs(
    device: Responsive.Device,
    theme: Theming,
    type: Type,
    url: string,
    icon: string,
    tooltip?: Data.Maybe<unknown>,
    onPress?: preact.JSX.EventHandler<preact.JSX.TargetedEvent>
) {
    return { device, theme, type, url, icon, tooltip, onPress };
}

function attributes_(
    device: Responsive.Device,
    theme: Theming,
    invalid: boolean,
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
        Background.color(
            invalid ? theme.color.invalid : theme.button.background
        ),
        Border.width(1),
        Border.color(invalid ? theme.color.invalid : theme.button.background),
        Border.rounded(theme.button.radius),
        mouseDown(active([])),
        mouseOver(hover([])),
        focused(focus(theme, invalid, [])),
        ...attributes,
    ];
}

function hover(attributes: Data.Attribute[]) {
    return [moveUp(1), Border.shadows(shadows.up), ...attributes];
}

function focus(theme: Theming, invalid: boolean, attributes: Data.Attribute[]) {
    return [
        moveUp(1),
        Border.shadows([
            Data.Shadow(
                invalid
                    ? { ...theme.color.invalid, alpha: 0.4 }
                    : theme.color.focus,
                [0, 0],
                0,
                3
            ),
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
                        options.invalid ? options.invalid : false,
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
                        options.invalid ? options.invalid : false,
                        attributes
                    )}
                    onPress={
                        options.onPress
                            ? Maybe.Just(options.onPress)
                            : Maybe.Nothing()
                    }
                >
                    {children}
                </InputJsx.Button>
            );
    }
}

export {
    Button,
    ButtonAnchor,
    ButtonAnchorSecondary,
    ButtonAnchorGhost,
    ButtonSecondary,
    ButtonGhost,
    size,
};
