// deno-lint-ignore-file no-explicit-any
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
    Attributes,
    Font,
} from 'espectro';
import { Maybe } from 'elmish';

import { Theming } from '../themes/theme.ts';
import { radius } from '../tokens/tokens.ts';
import { space } from '../tokens/spacing.ts';
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
        focused,
        mouseDown,
        mouseOver,
        paddingEach,
        spacing,
        alignLeft,
        shrink,
        fill,
        rem,
    } = Element,
    { OptionState } = Input,
    { OptionWith } = InputJsx;

interface RadioArgs {
    device: Responsive.Device;
    theme: Theming;
    onChange?: (option: any) => void;
    options: InputJsx.Option[];
    selected?: any;
    label: InputJsx.Label;
    message?: string;
    errorMessage?: string;
}

function radioAttrs(
    attributes: Data.Attribute[],
    device: Responsive.Device,
    theme: Theming,
    status: Input.OptionState,
    errorMessage?: string
): Data.Attribute[] {
    return [
        status === OptionState.Selected
            ? Attributes.class_('unfocusable')
            : Data.NoAttribute(),
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
        Background.color(theme.form.background),
        Border.rounded(radius.rounded),
        Border.width(
            (() => {
                switch (status) {
                    case OptionState.Idle:
                        return 1;

                    case OptionState.Focused:
                        return 1;

                    case OptionState.Selected:
                        return Responsive.isPhone(device) ? 7 : 5;
                }
            })()
        ),
        Border.color(
            (() => {
                switch (status) {
                    case OptionState.Idle:
                        return theme.form.border;

                    case OptionState.Focused:
                        return theme.form.borderHover;

                    case OptionState.Selected:
                        return theme.form.borderFocus;
                }
            })()
        ),
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

function DefaultRadioOption({
    attributes,
    device,
    theme,
    status,
    errorMessage,
    children,
}: {
    attributes: Data.Attribute[];
    device: Responsive.Device;
    theme: Theming;
    status: Input.OptionState;
    errorMessage?: string;
    children: preact.ComponentChild;
}) {
    return (
        <ElementJsx.Row attributes={[spacing(10), alignLeft, width(shrink)]}>
            <ElementJsx.El
                attributes={radioAttrs(
                    attributes,
                    device,
                    theme,
                    status,
                    errorMessage
                )}
            >
                {}
            </ElementJsx.El>
            <ElementJsx.El
                attributes={[width(fill), Attributes.class_('unfocusable')]}
            >
                {typeof children === 'string'
                    ? ElementJsx.Text({ children })
                    : children}
            </ElementJsx.El>
        </ElementJsx.Row>
    );
}

function Option(
    attributes: Data.Attribute[],
    device: Responsive.Device,
    theme: Theming,
    value: any,
    text: preact.ComponentChild,
    errorMessage?: string
) {
    return OptionWith(value, (status: Input.OptionState) => (
        <DefaultRadioOption
            attributes={attributes}
            device={device}
            theme={theme}
            status={status}
            errorMessage={errorMessage}
        >
            {text}
        </DefaultRadioOption>
    ));
}

function Radio({
    attributes,
    options,
}: {
    attributes: Data.Attribute[];
    options: RadioArgs;
}) {
    return (
        <InputJsx.Radio
            attributes={[spacing(rem(space.lg)), ...attributes]}
            options={{
                ...options,
                ...customOptions(options),
            }}
        />
    );
}

function RadioRow({
    attributes,
    options,
}: {
    attributes: Data.Attribute[];
    options: RadioArgs;
}) {
    return (
        <InputJsx.RadioRow
            attributes={[spacing(rem(space.lg)), ...attributes]}
            options={{
                ...options,
                ...customOptions(options),
            }}
        />
    );
}

function customOptions(options: {
    device: Responsive.Device;
    theme: Theming;
    onChange?: (option: any) => void;
    selected?: any;
    label: InputJsx.Label;
    message?: string;
    errorMessage?: string;
}) {
    return {
        label:
            options.label.type !== Input.Labels.HiddenLabel &&
            (options.message || options.errorMessage)
                ? {
                      ...options.label,
                      attributes: [
                          ...options.label.attributes,
                          width(fill),
                          options.errorMessage
                              ? errorMessageAttrs(options.theme)
                              : Data.NoAttribute(),
                      ],
                      children: (
                          <>
                              <ElementJsx.Text>
                                  {options.label.children}
                              </ElementJsx.Text>
                              <ElementJsx.Paragraph
                                  attributes={[
                                      width(fill),
                                      paddingEach({
                                          top: rem(space.sm),
                                          right: rem(0),
                                          bottom: rem(0),
                                          left: rem(0),
                                      }),
                                      Font.size(rem(Rem.scaled(-1))),
                                      options.errorMessage
                                          ? errorMessageAttrs(options.theme)
                                          : Data.NoAttribute(),
                                  ]}
                              >
                                  {options.errorMessage
                                      ? options.errorMessage
                                      : options.message
                                      ? options.message
                                      : options.message === ''
                                      ? ''
                                      : ' '}
                                  {''}
                              </ElementJsx.Paragraph>
                          </>
                      ),
                  }
                : options.label,
        onChange: options.onChange ? options.onChange : () => {},
        selected: options.selected
            ? Maybe.Just(options.selected)
            : Maybe.Nothing(),
    };
}

export { Radio, RadioRow, Option };
