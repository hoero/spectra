import { Font, Responsive, Data, Element, Rem } from 'espectro';

const { breakpoints } = Responsive,
    { spacing } = Element,
    { size } = Font,
    { rpts, unitless } = Rem;

const headings: Data.Attribute[] = [Font.bold];

function h1(device: Responsive.Device): Data.Attribute[] {
    return [
        size(rpts(device, { ...breakpoints, default: 2.4, phone: 2.8 })),
        spacing(unitless(2.4, 1.165)),
    ];
}

function h2(device: Responsive.Device): Data.Attribute[] {
    return [
        size(rpts(device, { ...breakpoints, default: 2.1, phone: 2.4 })),
        spacing(unitless(2.1, 1.195)),
    ];
}

function h3(device: Responsive.Device): Data.Attribute[] {
    return [
        size(rpts(device, { ...breakpoints, default: 1.8, phone: 2.1 })),
        spacing(unitless(1.8, 1.25)),
    ];
}

function h4(device: Responsive.Device): Data.Attribute[] {
    return [size(rpts(device, { ...breakpoints, default: 1.4, phone: 1.6 }))];
}

function h5(device: Responsive.Device): Data.Attribute[] {
    return [size(rpts(device, { ...breakpoints, default: 1.2, phone: 1.6 }))];
}

function h6(device: Responsive.Device): Data.Attribute[] {
    return [size(rpts(device, { ...breakpoints, default: 0.8, phone: 1 }))];
}

export { h1, h2, h3, h4, h5, h6, headings };
