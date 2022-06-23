module Spectra.Themes.Light exposing
    ( color
    , dropdown
    , form
    , header
    , nav
    , table
    , tag
    , tooltip
    )

import Element exposing (Color, fromRgb, rgba255, toRgb)
import Spectra.Tokens.Colors exposing (Colors, Dropdown, Form, Header, Nav, Table, Tag, Tooltip, grey, hsl, light, light_)
import Spectra.Tokens.Tokens exposing (radius)



-- Color


text : Color
text =
    grey.grey30


border : Color
border =
    hsl { light_ | lightness = 0, alpha = 0.1 }


color : Colors
color =
    { primary = grey.grey30
    , secondary = grey.grey60
    , text = text
    , textSecondary =
        toRgb text
            |> (\c -> { c | alpha = 0.7 })
            |> fromRgb
    , textTertiary =
        toRgb text
            |> (\c -> { c | alpha = 0.4 })
            |> fromRgb
    , bodyBackground = light.white
    , gradient = { c1 = light.white, c2 = grey.grey96 }
    }



-- Dropdown


dropdown : Dropdown
dropdown =
    { background = form.inputBackground
    , border = form.inputBorder
    , borderFocus = form.inputBorderFocus
    , option = hsl { light_ | lightness = 0, alpha = 0.05 }
    , radius = form.inputRadius
    , shadow =
        { offset = ( 0, 2 )
        , size = 0
        , blur = 6
        , color = rgba255 34 36 38 0.15
        }
    }



-- Form


form : Form
form =
    { legendDescription = color.textSecondary
    , inputBackground = color.bodyBackground
    , inputBackgroundDisabled = color.bodyBackground
    , inputBorder = hsl { grey30 | saturation = 0.13, lightness = 0.86 }
    , inputBorderFocus = hsl { grey30 | saturation = 0.13, lightness = 0.72 }
    , inputRadius = radius.medium
    }



-- Header


header : Header
header =
    { background = color.bodyBackground
    , border = border
    }



-- Nav


nav : Nav
nav =
    { link = color.text
    , dropLinkHover = hsl { light_ | lightness = 0, alpha = 0.1 }
    , dropLinkActive = hsl { light_ | lightness = 0, alpha = 0.15 }
    , tertiaryLinkBg = grey.grey10
    , tertiaryLinkColor = grey.grey70
    }



-- Table


table : Table
table =
    { headFootBg = light.white
    , background = light.white
    , border = border
    , fieldsetColor = grey.grey90
    , fieldsetTableRowLine = grey.grey95
    , title = color.textSecondary
    , rowLine = grey.grey95
    , rowHover = hsl { light_ | lightness = 0.98 }
    , rowStripe = light.white
    }



-- Tag


tag : Tag
tag =
    { color = light.white
    , background = grey.grey30
    }



-- Tooltip


tooltip : Tooltip
tooltip =
    { color = light.white
    , background = grey.grey30
    }
