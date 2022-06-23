module Spectra.Themes.Dark exposing
    ( color
    , dropdown
    , dropdown_
    , form
    , header
    , nav
    , table
    , tag
    , tooltip
    )

import Abstracts.Variables.Colors exposing (Colors, Dropdown, Form, Header, Nav, Table, Tag, Tooltip, hsl, light, light_, neutral)
import Element exposing (Color)
import Spectra.Themes.Light as Light


border : Color
border =
    hsl { light_ | alpha = 0.1 }



-- Color


color_ : Colors
color_ =
    Light.color


color : Colors
color =
    { color_
        | text = light.white
        , textSecondary = hsl { light_ | alpha = 0.7 }
        , textTertiary = hsl { light_ | alpha = 0.4 }
        , bodyBackground = neutral.grey5
        , gradient = { c1 = neutral.grey10, c2 = neutral.grey10 }
    }



-- Dropdown


dropdown_ : Dropdown
dropdown_ =
    Light.dropdown


dropdown : Dropdown
dropdown =
    { dropdown_
        | background = form.inputBackground
        , border = form.inputBorder
        , borderFocus = form.inputBorderFocus
        , option = hsl { light_ | alpha = 0.05 }
        , shadow =
            { offset = ( 0, 2 )
            , size = 0
            , blur = 6
            , color = hsl { light_ | lightness = 0 }
            }
    }



-- Form


form_ : Form
form_ =
    Light.form


form : Form
form =
    { form_
        | legendDescription = color.textSecondary
        , inputBackground = neutral.grey10
        , inputBackgroundDisabled = neutral.grey10
        , inputBorder = border
        , inputBorderFocus = hsl light_
    }



-- Header


header : Header
header =
    { background = neutral.grey10
    , border = border
    }



-- Nav


nav : Nav
nav =
    { link = hsl { light_ | alpha = 0.8 }
    , dropLinkHover = hsl { light_ | alpha = 0.1 }
    , dropLinkActive = hsl { light_ | alpha = 0.15 }
    , tertiaryLinkBg = neutral.grey96
    , tertiaryLinkColor = neutral.grey50
    }



-- Table


table : Table
table =
    { headFootBg = neutral.grey10
    , background = neutral.grey10
    , border = border
    , fieldsetColor = neutral.grey30
    , fieldsetTableRowLine = neutral.grey30
    , title = color.textSecondary
    , rowLine = border
    , rowHover = hsl { light_ | alpha = 0.015 }
    , rowStripe = hsl { light_ | alpha = 0.005 }
    }



-- Tag


tag : Tag
tag =
    { color = neutral.grey10
    , background = light.white
    }



-- Tooltip


tooltip : Tooltip
tooltip =
    { color = neutral.grey10
    , background = light.white
    }
