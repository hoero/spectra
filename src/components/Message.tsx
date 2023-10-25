import {
    Background,
    Border,
    Data,
    Element,
    ElementJsx,
    Font,
    InputJsx,
    Rem,
} from 'espectro';

import { Theming } from '../themes/theme.ts';
import { space } from '../tokens/spacing.ts';
import { shadows } from '../tokens/tokens.ts';
import { size } from '../tokens/font.ts';

const { Row, El } = ElementJsx,
    { spacing, paddingEach, rem, width, fill, centerY } = Element,
    { Button } = InputJsx;

interface Props {
    attributes: Data.Attribute[];
    theme: Theming;
    children: preact.ComponentChild[];
}

export function Message({ attributes, theme, children }: Props) {
    return (
        <>
            <Row
                attributes={[
                    width(fill),
                    paddingEach({
                        top: rem(space.xs),
                        right: rem(space.xs),
                        bottom: rem(space.xs),
                        left: rem(space.md),
                    }),
                    spacing(rem(space.md)),
                    Font.color(theme.color.bodyBackground),
                    Font.size(rem(size.scaled0)),
                    Background.color(theme.color.text),
                    Border.shadows(shadows.up),
                    centerY,
                    ...attributes,
                ]}
            >
                {children}
            </Row>
        </>
    );
}
