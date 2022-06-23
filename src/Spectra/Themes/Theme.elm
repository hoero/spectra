module Spectra.Themes.Theme exposing
    ( Theme(..)
    , Theming
    , convertToTheme
    , theming
    , toBool
    , toString
    )

import Spectra.Tokens.Colors exposing (Colors, Dropdown, Form, Grey, Header, Nav, Table, Tag, Tooltip, grey, neutral)
import Themes.Dark as Dark
import Themes.Light as Light


type Theme
    = Light
    | Dark


type alias Theming =
    { color : Colors
    , dropdown : Dropdown
    , form : Form
    , grey : Grey
    , header : Header
    , nav : Nav
    , table : Table
    , tag : Tag
    , tooltip : Tooltip
    }


theming : Theme -> Theming
theming theme =
    case theme of
        Light ->
            { color = Light.color
            , dropdown = Light.dropdown
            , form = Light.form
            , grey = grey
            , header = Light.header
            , nav = Light.nav
            , table = Light.table
            , tag = Light.tag
            , tooltip = Light.tooltip
            }

        Dark ->
            { color = Dark.color
            , dropdown = Dark.dropdown
            , form = Dark.form
            , grey = neutral
            , header = Dark.header
            , nav = Dark.nav
            , table = Dark.table
            , tag = Dark.tag
            , tooltip = Dark.tooltip
            }


convertToTheme : Bool -> Theme
convertToTheme state =
    if state then
        Dark

    else
        Light


toBool : Theme -> Bool
toBool theme =
    case theme of
        Light ->
            False

        Dark ->
            True


toString : Theme -> String
toString theme =
    case theme of
        Light ->
            "Light"

        Dark ->
            "Dark"
