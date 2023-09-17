import {
    Data,
    Element,
    ElementJsx,
    Background,
    Border,
    Input,
    InputJsx,
    Font,
    Responsive,
    Rem,
} from 'espectro';

import { Theming } from '../themes/theme.ts';
import {
    Field,
    activeFocus,
    errorActiveFocusAttrs,
    errorAttrs,
    errorHoverAttrs,
    errorMessageAttrs,
    hover,
} from './Input.tsx';

const {
    width,
    height,
    px,
    centerY,
    centerX,
    rotate,
    moveUp,
    transparent,
    noStaticStyleSheet,
    inFront,
    jsx,
    alpha,
    focused,
    mouseDown,
    mouseOver,
    paddingEach,
} = Element;

interface CheckboxArgs {
    device: Responsive.Device;
    theme: Theming;
    onChange?: (checked: boolean) => void;
    icon?: (checked: boolean) => Element;
    checked: boolean;
    label: InputJsx.Label;
    message?: string;
    errorMessage?: string;
}

function checkboxAttrs(
    attributes: Data.Attribute[],
    device: Responsive.Device,
    theme: Theming,
    checked: boolean,
    errorMessage?: string
): Data.Attribute[] {
    return [
        width(
            Rem.rrems(device, {
                ...Responsive.breakpoints,
                default: 1.4,
                phone: 2.4,
            })
        ),
        height(
            Rem.rrems(device, {
                ...Responsive.breakpoints,
                default: 1.4,
                phone: 2.4,
            })
        ),
        centerY,
        Font.color(theme.color.text),
        Font.size(9),
        Font.center,
        Border.width(1),
        Border.color(checked ? theme.form.borderFocus : theme.form.border),
        Border.shadow(
            Data.Shadow(
                checked
                    ? theme.color.focus
                    : { ...theme.color.focus, alpha: 0 },
                [0, 0],
                0,
                3
            )
        ),
        Background.color(theme.form.background),
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

function checkboxInFrontAttrs(
    device: Responsive.Device,
    theme: Theming,
    checked: boolean
): Data.Attribute[] {
    return [
        height(px(6)),
        width(px(9)),
        rotate(-45),
        centerX,
        centerY,
        moveUp(1),
        transparent(!checked),
        Border.color(theme.color.text),
        Border.widthEach({
            top: 0,
            left: 2,
            bottom: 2,
            right: 0,
        }),
    ];
}

function DefaultCheckbox({
    attributes,
    options,
}: {
    attributes: Data.Attribute[];
    options: CheckboxArgs;
}) {
    return (
        <ElementJsx.LayoutWith
            options={[noStaticStyleSheet]}
            attributes={[
                ...checkboxAttrs(
                    attributes,
                    options.device,
                    options.theme,
                    options.checked,
                    options.errorMessage
                ),
                inFront(
                    jsx(
                        <ElementJsx.El
                            attributes={checkboxInFrontAttrs(
                                options.device,
                                options.theme,
                                options.checked
                            )}
                        >
                            {}
                        </ElementJsx.El>
                    )
                ),
            ]}
            context={Data.asEl}
        >
            {}
        </ElementJsx.LayoutWith>
    );
}

function Checkbox({
    attributes,
    options,
}: {
    attributes: Data.Attribute[];
    options: CheckboxArgs;
}) {
    return (
        <InputJsx.Checkbox
            attributes={attributes}
            options={{
                ...options,
                ...customOptions(options),
                icon: options.icon
                    ? () => options.icon
                    : () => (
                          <DefaultCheckbox attributes={[]} options={options} />
                      ),
            }}
        />
    );
}

function CheckboxField({
    attributes,
    options,
}: {
    attributes: Data.Attribute[];
    options: CheckboxArgs;
}) {
    return (
        <Field
            theme={options.theme}
            message={options.message}
            errorMessage={options.errorMessage}
        >
            <Checkbox attributes={attributes} options={options} />
        </Field>
    );
}

function customOptions(options: {
    device: Responsive.Device;
    theme: Theming;
    onChange?: (checked: boolean) => void;
    label: InputJsx.Label;
    errorMessage?: string;
}) {
    return {
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
                : options.label.type !== Input.Labels.HiddenLabel
                ? {
                      ...options.label,
                      attributes: Responsive.isPhone(options.device)
                          ? [
                                ...options.label.attributes,
                                paddingEach({
                                    top: 4,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                }),
                            ]
                          : options.label.attributes,
                  }
                : options.label,
        onChange: options.onChange ? options.onChange : () => {},
    };
}

export { Checkbox, DefaultCheckbox, CheckboxField };
