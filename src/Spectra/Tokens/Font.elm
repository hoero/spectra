module Spectra.Tokens.Font exposing
    ( oneRem
    , pt
    , rpts
    , rpx
    , rpxf
    , rpxs
    , rpxsf
    , unitless
    )

import Element exposing (Device, DeviceClass(..))
import Spectra.Utils.Responsive exposing (Breakpoints, respond)



-- Units


type alias Rem =
    Float


{-| It should be either an Int or a Float
-}
type alias Pixel type_ =
    type_


type alias Percent =
    Float


type alias Point =
    Float


{-| Default browser font size
-}
baseFontSize : Pixel Float
baseFontSize =
    16


{-|

    This defines what 1rem is.
    To have 1rem as 10px just divide 10 and the base font size which is 16.

    - Desktop
        1rem = 10px, 10/16 = 62.5%

    - Tablet (1100px)
        1rem = 8.4px, 8.4/16 = 52.5%

    - Phone (600px)
        1rem = 7.28px, 7.28/16 = 45.5%

-}
oneRem : Device -> Pixel Float
oneRem { class } =
    case class of
        Phone ->
            percentToPx 45.5

        Tablet ->
            percentToPx 52.5

        _ ->
            percentToPx 62.5


{-|

    This allows the user to use Points for fonts as we usually use in graphics software.
    The calculation converts the Points value to another one for later use with rem.

-}
pt : Device -> Point -> Pixel Int
pt device point =
    remToPx (oneRem device) (point / 7.5) |> round


{-| Responsive points

    Same as pt function, but in this one you can define points
    for specific device profiles using breakpoints.

-}
rpts : Device -> Breakpoints Point -> Pixel Int
rpts device breakpoints =
    respond device 0 breakpoints
        |> pt device


{-| For line-height unitless values
-}
unitless : Device -> Point -> Float -> Pixel Int
unitless device point val =
    toFloat (pt device point) * val |> round


{-| Responsive pixel

    Using rem values instead of pixels, which is
    a responsive format that scales to user's browser font size preference.

-}
rpx : Device -> Rem -> Pixel Int
rpx device rem =
    rpxf device rem |> round


{-| Responsive pixels

    Same as rpx function, but in this one you can define responsive pixels
    for specific device profiles using breakpoints.

-}
rpxs : Device -> Breakpoints Rem -> Pixel Int
rpxs device breakpoints =
    respond device 0 breakpoints
        |> rpx device


{-| Responsive pixel float
-}
rpxf : Device -> Rem -> Pixel Float
rpxf device rem =
    remToPx (oneRem device) rem


rpxsf : Device -> Breakpoints Rem -> Pixel Float
rpxsf device breakpoints =
    respond device 0 breakpoints
        |> rpxf device


remToPx : Pixel Float -> Rem -> Pixel Float
remToPx base rem =
    base * rem


percentToPx : Percent -> Pixel Float
percentToPx percent =
    percent * baseFontSize / 100
