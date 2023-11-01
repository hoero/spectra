// deno-lint-ignore-file no-explicit-any
import { StateUpdater, useState } from 'preact/hooks';
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
import { isString } from '../../../espectro/src/utils/utils.ts';
import { space } from '../tokens/spacing.ts';

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
    focused,
    mouseDown,
    mouseOver,
    paddingEach,
    spacing,
    rem,
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

export interface CheckboxRowArgs {
    device: Responsive.Device;
    theme: Theming;
    options: { id?: any | string; name: string }[];
    selected: [string[], StateUpdater<string[]>];
    message?: string;
    errorMessage?: string;
}

export default function CheckboxRow({
    theme,
    device,
    options,
    selected,
    errorMessage,
}: CheckboxRowArgs) {
    const options_: {
        label: string;
        checked: boolean;
        onChange: (checked: boolean) => void;
    }[] = options.map((option) => {
        const selected_ = selected[0].find((so) => so === option.id);
        const [checked, setChecked] = useState(selected_ ? true : false);
        return {
            label: option.name,
            checked,
            onChange: () => {
                setChecked((ps: boolean) => !ps);
                selected[1]((ps: string[]) =>
                    isString(option.id) && ps.includes(option.id)
                        ? ps.filter((p) => p !== option.id)
                        : isString(option.id)
                        ? [...ps, option.id]
                        : ps
                );
            },
        };
    });
    return (
        <ElementJsx.Row
            attributes={[centerY, spacing(rem(space.md))]}
            keys={options.map((option) =>
                typeof option.id === 'string' ? option.id : ''
            )}
        >
            {options_.map((option) => (
                <Checkbox
                    attributes={[]}
                    options={{
                        theme,
                        device,
                        onChange: option.onChange,
                        checked: option.checked,
                        label: InputJsx.labelRight([], option.label),
                        errorMessage,
                    }}
                />
            ))}
        </ElementJsx.Row>
    );
}

function CheckboxField(options: CheckboxRowArgs) {
    return (
        <Field
            theme={options.theme}
            message={options.message}
            errorMessage={options.errorMessage}
        >
            <CheckboxRow
                theme={options.theme}
                device={options.device}
                options={options.options}
                selected={options.selected}
                message={options.message}
                errorMessage={options.errorMessage}
            />
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
                          centerY,
                          errorMessageAttrs(options.theme),
                      ],
                  }
                : options.label.type !== Input.Labels.HiddenLabel
                ? {
                      ...options.label,
                      attributes: Responsive.isPhone(options.device)
                          ? [...options.label.attributes, centerY]
                          : options.label.attributes,
                  }
                : options.label,
        onChange: options.onChange ? options.onChange : () => {},
    };
}

export { Checkbox, DefaultCheckbox, CheckboxRow, CheckboxField };
