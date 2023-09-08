import {
    Data,
    Element,
    ElementJsx,
    Background,
    Border,
    Input,
    InputJsx,
    Responsive,
    Rem,
    Font,
} from 'espectro';
import { Maybe } from 'elmish';

import { Theming } from '../themes/theme.ts';
import { space } from '../tokens/spacing.ts';

// TODO:
// const {
//     Placeholder,
//     Search,
//     SpellChecked,
// } = InputJsx;

const { paddingXY, focused, rem, spacing, mouseDown, mouseOver, width, fill } =
    Element;

export interface InputArgs {
    device: Responsive.Device;
    theme: Theming;
    onChange: (text: string) => void;
    text: string;
    placeholder?: InputJsx.Placeholder;
    label: InputJsx.Label;
    message?: string;
    errorMessage?: string;
}

export interface InputPasswordArgs {
    device: Responsive.Device;
    theme: Theming;
    onChange: (text: string) => void;
    text: string;
    placeholder?: InputJsx.Placeholder;
    label: InputJsx.Label;
    show: boolean;
    message?: string;
    errorMessage?: string;
}

function attributes_(
    device: Responsive.Device,
    theme: Theming,
    attributes: Data.Attribute[],
    errorMessage?: string
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
        Background.color(theme.form.background),
        Border.width(1),
        Border.color(theme.form.border),
        Border.rounded(theme.form.radius),
        focused(
            errorMessage ? errorActiveFocusAttrs(theme) : activeFocus(theme)
        ),
        mouseDown(
            errorMessage ? errorActiveFocusAttrs(theme) : activeFocus(theme)
        ),
        mouseOver(errorMessage ? errorHoverAttrs(theme) : hover(theme)),
        ...attributes,
        errorMessage ? errorAttrs(theme) : Data.NoAttribute(),
    ];
}

function hover(theme: Theming) {
    return [
        Border.color(theme.form.borderHover),
        Border.shadow(Data.Shadow(theme.color.hover, [0, 0], 0, 3)),
    ];
}

function activeFocus(theme: Theming) {
    return [
        Border.color(theme.form.borderFocus),
        Border.shadow(Data.Shadow(theme.color.focus, [0, 0], 0, 3)),
    ];
}

function errorAttrs(theme: Theming) {
    return Border.color(theme.color.invalid);
}

function errorHoverAttrs(theme: Theming) {
    return [
        Border.color(theme.color.invalid),
        Border.shadow(
            Data.Shadow({ ...theme.color.invalid, alpha: 0.2 }, [0, 0], 0, 3)
        ),
    ];
}

function errorActiveFocusAttrs(theme: Theming) {
    return [
        Border.color(theme.color.invalid),
        Border.shadow(
            Data.Shadow({ ...theme.color.invalid, alpha: 0.4 }, [0, 0], 0, 3)
        ),
    ];
}

function errorMessageAttrs(theme: Theming) {
    return Font.color(theme.color.invalid);
}

function Text({
    attributes,
    options,
}: {
    attributes: Data.Attribute[];
    options: InputArgs;
}) {
    return (
        <Field
            theme={options.theme}
            message={options.message}
            errorMessage={options.errorMessage}
        >
            <InputJsx.Text
                attributes={attributes_(
                    options.device,
                    options.theme,
                    attributes,
                    options.errorMessage
                )}
                options={{ ...options, ...customOptions(options) }}
            />
        </Field>
    );
}

function Username({
    attributes,
    options,
}: {
    attributes: Data.Attribute[];
    options: InputArgs;
}) {
    return (
        <Field
            theme={options.theme}
            message={options.message}
            errorMessage={options.errorMessage}
        >
            <InputJsx.Username
                attributes={attributes_(
                    options.device,
                    options.theme,
                    attributes,
                    options.errorMessage
                )}
                options={{ ...options, ...customOptions(options) }}
            />
        </Field>
    );
}

function Email({
    attributes,
    options,
}: {
    attributes: Data.Attribute[];
    options: InputArgs;
}) {
    return (
        <Field
            theme={options.theme}
            message={options.message}
            errorMessage={options.errorMessage}
        >
            <InputJsx.Email
                attributes={attributes_(
                    options.device,
                    options.theme,
                    attributes,
                    options.errorMessage
                )}
                options={{ ...options, ...customOptions(options) }}
            />
        </Field>
    );
}

function NewPassword({
    attributes,
    options,
}: {
    attributes: Data.Attribute[];
    options: InputPasswordArgs;
}) {
    return (
        <Field
            theme={options.theme}
            message={options.message}
            errorMessage={options.errorMessage}
        >
            <InputJsx.NewPassword
                attributes={attributes_(
                    options.device,
                    options.theme,
                    attributes,
                    options.errorMessage
                )}
                options={{ ...options, ...customOptions(options) }}
            />
        </Field>
    );
}

function CurrentPassword({
    attributes,
    options,
}: {
    attributes: Data.Attribute[];
    options: InputPasswordArgs;
}) {
    const label = { ...options.label };
    return (
        <Field
            theme={options.theme}
            message={options.message}
            errorMessage={options.errorMessage}
        >
            <InputJsx.CurrentPassword
                attributes={attributes_(
                    options.device,
                    options.theme,
                    attributes,
                    options.errorMessage
                )}
                options={{ ...options, ...customOptions(options) }}
            />
        </Field>
    );
}

function customOptions(options: {
    theme: Theming;
    placeholder?: InputJsx.Placeholder;
    label: InputJsx.Label;
    errorMessage?: string;
}) {
    return {
        placeholder: options.placeholder
            ? Maybe.Just(options.placeholder)
            : Maybe.Nothing(),
        label:
            options.label.type !== Input.Labels.HiddenLabel &&
            options.errorMessage
                ? {
                      ...options.label,
                      attributes: [
                          ...options.label.attributes,
                          errorMessageAttrs(options.theme),
                      ],
                  }
                : options.label,
    };
}

// Core components

function Field({
    theme,
    message,
    errorMessage,
    children,
}: {
    theme: Theming;
    message?: string;
    errorMessage?: string;
    children: preact.ComponentChild;
}) {
    return (
        <ElementJsx.Column attributes={[width(fill), spacing(7)]}>
            {children}
            <ElementJsx.El
                attributes={[
                    width(fill),
                    Font.size(rem(Rem.scaled(-1))),
                    errorMessage
                        ? errorMessageAttrs(theme)
                        : Data.NoAttribute(),
                ]}
            >
                {errorMessage ? errorMessage : message ? message : ' '}
            </ElementJsx.El>
        </ElementJsx.Column>
    );
}

export { Text, Email, NewPassword, CurrentPassword, Username };
