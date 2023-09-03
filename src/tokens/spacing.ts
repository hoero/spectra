/** xs = extra small
    sm  = small
    md  = medium
    lg  = large
    xl = extra large
    xx = extra extra large
    xxx = extra extra extra large
 */

interface Spacing {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xx: number;
    xxx: number;
}

const space = {
    xs: 0.4,
    sm: 0.8,
    md: 1.6,
    lg: 2.4,
    xl: 3.2,
    xx: 4.0,
    xxx: 4.8,
};

const edges = { top: 0, right: 0, bottom: 0, left: 0 };

export { space, edges };
