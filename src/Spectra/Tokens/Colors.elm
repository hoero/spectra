module Spectra.Tokens.Colors exposing
    ( Colors
    , Dropdown
    , Form
    , Grey
    , Header
    , Nav
    , Table
    , Tag
    , Tooltip
    , cool
    , grey
    , hsl
    , light
    , light_
    , neutral
    , notifications
    , warm
    )

import Chroma.Converter.In.Hsla2Rgb exposing (hslaDegrees2rgb)
import Chroma.Converter.Out.ToRgba exposing (toRgba)
import Chroma.Types as Types exposing (HslaDegreesColor)
import Element exposing (Color, fromRgb)


type alias Colors =
    { primary : Color
    , secondary : Color
    , text : Color
    , textSecondary : Color
    , textTertiary : Color
    , bodyBackground : Color
    , gradient : { c1 : Color, c2 : Color }
    }


type alias Dropdown =
    { background : Color
    , border : Color
    , borderFocus : Color
    , option : Color
    , radius : Int
    , shadow :
        { offset : ( Float, Float )
        , size : Float
        , blur : Float
        , color : Color
        }
    }


type alias Form =
    { legendDescription : Color
    , inputBackground : Color
    , inputBackgroundDisabled : Color
    , inputBorder : Color
    , inputBorderFocus : Color
    , inputRadius : Int
    }


type alias Header =
    { background : Color
    , border : Color
    }


type alias Nav =
    { link : Color
    , dropLinkHover : Color
    , dropLinkActive : Color
    , tertiaryLinkBg : Color
    , tertiaryLinkColor : Color
    }


type alias Table =
    { headFootBg : Color
    , background : Color
    , border : Color
    , fieldsetColor : Color
    , fieldsetTableRowLine : Color
    , title : Color
    , rowLine : Color
    , rowHover : Color
    , rowStripe : Color
    }


type alias Tag =
    { color : Color
    , background : Color
    }


type alias Tooltip =
    { color : Color
    , background : Color
    }



-- Black, white and greys


type alias Grey =
    { grey5 : Color
    , grey10 : Color
    , grey20 : Color
    , grey30 : Color
    , grey40 : Color
    , grey50 : Color
    , grey60 : Color
    , grey70 : Color
    , grey80 : Color
    , grey90 : Color
    , grey95 : Color
    , grey96 : Color
    }


light_ : HslaDegreesColor
light_ =
    { hueDegrees = 0
    , saturation = 0
    , lightness = 1
    , alpha = 1
    }


neutral : Grey
neutral =
    { grey5 = hsl { light_ | lightness = 0.05 }
    , grey10 = hsl { light_ | lightness = 0.1 }
    , grey20 = hsl { light_ | lightness = 0.2 }
    , grey30 = hsl { light_ | lightness = 0.3 }
    , grey40 = hsl { light_ | lightness = 0.4 }
    , grey50 = hsl { light_ | lightness = 0.5 }
    , grey60 = hsl { light_ | lightness = 0.6 }
    , grey70 = hsl { light_ | lightness = 0.7 }
    , grey80 = hsl { light_ | lightness = 0.8 }
    , grey90 = hsl { light_ | lightness = 0.9 }
    , grey95 = hsl { light_ | lightness = 0.95 }
    , grey96 = hsl { light_ | lightness = 0.96 }
    }


{-| Change these based on app colors

  - if you want a cool grey with a light tint of blue (or cold color)
  - or a warm grey with a light tint of orange (or a warm color)

-}
coolGrey : HslaDegreesColor
coolGrey =
    { skyBlue | saturation = 0.3 }


warmGrey : HslaDegreesColor
warmGrey =
    { orange | saturation = 0.3 }


cool : Grey
cool =
    { grey5 = hsl { coolGrey | lightness = 0.05 }
    , grey10 = hsl { coolGrey | lightness = 0.1 }
    , grey20 = hsl { coolGrey | lightness = 0.2 }
    , grey30 = hsl { coolGrey | lightness = 0.3 }
    , grey40 = hsl { coolGrey | lightness = 0.4 }
    , grey50 = hsl { coolGrey | lightness = 0.5 }
    , grey60 = hsl { coolGrey | lightness = 0.6 }
    , grey70 = hsl { coolGrey | lightness = 0.7 }
    , grey80 = hsl { coolGrey | lightness = 0.8 }
    , grey90 = hsl { coolGrey | lightness = 0.9 }
    , grey95 = hsl { coolGrey | lightness = 0.95 }
    , grey96 = hsl { coolGrey | lightness = 0.96 }
    }


warm : Grey
warm =
    { grey5 = hsl { warmGrey | lightness = 0.05 }
    , grey10 = hsl { warmGrey | lightness = 0.1 }
    , grey20 = hsl { warmGrey | lightness = 0.2 }
    , grey30 = hsl { warmGrey | lightness = 0.3 }
    , grey40 = hsl { warmGrey | lightness = 0.4 }
    , grey50 = hsl { warmGrey | lightness = 0.5 }
    , grey60 = hsl { warmGrey | lightness = 0.6 }
    , grey70 = hsl { warmGrey | lightness = 0.7 }
    , grey80 = hsl { warmGrey | lightness = 0.8 }
    , grey90 = hsl { warmGrey | lightness = 0.9 }
    , grey95 = hsl { warmGrey | lightness = 0.95 }
    , grey96 = hsl { warmGrey | lightness = 0.96 }
    }


{-| Used ones
-}
grey : Grey
grey =
    neutral


light : { black : Color, white : Color }
light =
    { black = hsl { light_ | lightness = 0 }
    , white = hsl light_
    }



-- Notifications


vermilion : HslaDegreesColor
vermilion =
    { hueDegrees = 5
    , saturation = 0.76
    , lightness = 0.55
    , alpha = 1
    }


bluishGreen : HslaDegreesColor
bluishGreen =
    { hueDegrees = 164
    , saturation = 1
    , lightness = 0.31
    , alpha = 1
    }


skyBlue : HslaDegreesColor
skyBlue =
    { hueDegrees = 202
    , saturation = 0.77
    , lightness = 0.63
    , alpha = 1
    }


orange : HslaDegreesColor
orange =
    { hueDegrees = 41
    , saturation = 1
    , lightness = 0.45
    , alpha = 1
    }


notifications : { invalid : Color, success : Color, info : Color, warning : Color }
notifications =
    { invalid = hsl vermilion
    , success = hsl bluishGreen
    , info = hsl skyBlue
    , warning = hsl orange
    }


{-| Takes a HSL color and converts it to RGB
-}
hsl : HslaDegreesColor -> Color
hsl color_ =
    color_
        |> hslaDegrees2rgb
        |> Types.RGBAColor
        |> toRgba
        |> fromRgb
