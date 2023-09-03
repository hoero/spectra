import { Color, Data } from 'espectro';

const { hsla } = Color,
    { Shadow } = Data;

/**
 * Radius
 */

interface Radius {
    default: number;
    medium: number;
    small: number;
    rounded: number;
}

const radius: Radius = { default: 4, medium: 3, small: 2, rounded: 100 };

/**
 * Border
 */

const border = {
    edges: { bottom: 0, left: 0, right: 0, top: 0 },
    alpha: 0.1,
    color: hsla(0, 0, 0, 0.1),
};

/**
 * Shadows
 */

const shadows = {
        up: [
            Shadow(hsla(0, 0, 0, 0.14), [0, 5], 5, -2),
            Shadow(hsla(0, 0, 0, 0.09), [0, 3], 1, 0),
            Shadow(hsla(0, 0, 0, 0.05), [0, 2], 15, 0),
        ],
        down: [
            Shadow(hsla(0, 0, 0, 0.16), [0, 3], 1, -2),
            Shadow(hsla(0, 0, 0, 0.05), [0, 2], 2, 0),
            Shadow(hsla(0, 0, 0, 0.08), [0, 1], 5, 0),
        ],
    },
    noShadow = Shadow(hsla(0, 0, 0, 0), [0, 0], 0, 0);

/**
 * z-index
 */

const zIndex = {
    z5k: '5000',
    z4k: '4000',
    z3k: '3000',
    z2k: '2000',
    z15h: '1500',
    z1k: '1000',
    zdefault: '1',
    zbelow: '-1',
};

// Components
const zIndexComp = {
    header: zIndex.z4k,
    modal: zIndex.z5k,
    navPrimary: zIndex.z15h,
    navBtnSup: zIndex.z4k,
    navBtnBg: zIndex.z1k,
    tooltip: zIndex.z4k,
};

export { border, noShadow, radius, shadows, zIndex, zIndexComp };
