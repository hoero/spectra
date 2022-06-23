module Spectra.Themes.Font exposing
    ( h1
    , h2
    , h3
    , h4
    , h5
    , h6
    , headings
    )

import Element exposing (Attribute, Device, spacing)
import Element.Font as Font
import Spectra.Tokens.Font exposing (rpts, unitless)
import Spectra.Utils.Responsive exposing (breakpoints)


headings : List (Attribute msg)
headings =
    [ Font.bold
    ]


h1 : Device -> List (Attribute msg)
h1 device =
    [ Font.size <|
        rpts device { breakpoints | default = Just 24, phone = Just 28 }
    , spacing <| unitless device 24 1.165
    ]


h2 : Device -> List (Attribute msg)
h2 device =
    [ Font.size <|
        rpts device { breakpoints | default = Just 21, phone = Just 24 }
    , spacing <| unitless device 21 1.195
    ]


h3 : Device -> List (Attribute msg)
h3 device =
    [ Font.size <|
        rpts device { breakpoints | default = Just 18, phone = Just 21 }
    , spacing <| unitless device 18 1.25
    ]


h4 : Device -> List (Attribute msg)
h4 device =
    [ Font.size <|
        rpts device { breakpoints | default = Just 14, phone = Just 16 }
    ]


h5 : Device -> List (Attribute msg)
h5 device =
    [ Font.size <|
        rpts device { breakpoints | default = Just 12, phone = Just 16 }
    ]


h6 : Device -> List (Attribute msg)
h6 device =
    [ Font.size <|
        rpts device { breakpoints | default = Just 8, phone = Just 10 }
    ]
