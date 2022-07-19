module Spectra.Components.Button exposing (..)

import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Element.Region as Region
import Html.Attributes exposing (class, classList)
import Spectra.Components.Icon as Icon
import Spectra.Tokens exposing (noShadow, radius)
import Spectra.Tokens.Colors exposing (Colors)
import Spectra.Tokens.Font exposing (rpx, rpxs)
import Spectra.Tokens.Spacing exposing (space)
import Spectra.Utils.Responsive exposing (breakpoints)
import Themes.Theme exposing (Theming)


type ButtonType
    = Anchor
    | Button



-- Defaults


defaultBtnArgs : Theming -> Maybe msg -> ButtonArgs msg
defaultBtnArgs theme msg =
    ButtonArgs { class = Desktop, orientation = Landscape } theme Button "" "" msg


defaultAnchorArgs : Theming -> ButtonArgs msg
defaultAnchorArgs theme =
    ButtonArgs { class = Desktop, orientation = Landscape } theme Anchor "" "" Nothing


defaultBtnIconArgs : Theming -> Maybe msg -> ButtonIconArgs msg
defaultBtnIconArgs theme msg =
    ButtonIconArgs { class = Desktop, orientation = Landscape } theme Button "" "" "" Nothing msg


defaultAnchorIconArgs : Theming -> ButtonIconArgs msg
defaultAnchorIconArgs theme =
    ButtonIconArgs { class = Desktop, orientation = Landscape } theme Anchor "" "" "" Nothing Nothing



-- Buttons type: button or anchor


type alias DefaultButtonArgs msg =
    { device : Device
    , theme : Theming
    , text : String
    , msg : Maybe msg
    }


type alias DefaultButtonIconArgs msg =
    { device : Device
    , theme : Theming
    , icon : String
    , text : String
    , msg : Maybe msg
    }


type alias DefaultAnchorArgs =
    { device : Device
    , theme : Theming
    , url : String
    , text : String
    }


type alias DefaultAnchorIconArgs =
    { device : Device
    , theme : Theming
    , url : String
    , icon : String
    , text : String
    }


button : List (Attribute msg) -> DefaultButtonArgs msg -> Element msg
button attributes { device, theme, text, msg } =
    let
        btnArgs =
            defaultBtnArgs theme msg
    in
    btn
        attributes
        { btnArgs
            | device = device
            , text = text
        }


buttonIcon : List (Attribute msg) -> DefaultButtonIconArgs msg -> Element msg
buttonIcon attributes { device, theme, icon, text, msg } =
    let
        btnArgs =
            defaultBtnIconArgs theme msg
    in
    btnIcon
        attributes
        { btnArgs
            | device = device
            , text = text
            , icon = icon
        }


btnAnchor : List (Attribute msg) -> DefaultAnchorArgs -> Element msg
btnAnchor attributes { device, theme, url, text } =
    let
        btnArgs =
            defaultAnchorArgs theme
    in
    btn
        attributes
        { btnArgs
            | device = device
            , url = url
            , text = text
        }


btnAnchorIcon : List (Attribute msg) -> DefaultAnchorIconArgs -> Element msg
btnAnchorIcon attributes { device, theme, url, icon, text } =
    let
        btnArgs =
            defaultAnchorIconArgs theme
    in
    btnIcon
        attributes
        { btnArgs
            | device = device
            , url = url
            , icon = icon
            , text = text
        }



-- Text button


btnTextAttr : List (Attribute msg)
btnTextAttr =
    []


btnText : List (Attribute msg) -> DefaultButtonArgs msg -> Element msg
btnText attributes { device, theme, text, msg } =
    let
        btnArgs =
            defaultBtnArgs theme msg
    in
    btn
        ((classList [ ( "Button--txt", True ) ] |> htmlAttribute) :: attributes)
        { btnArgs
            | device = device
            , text = text
            , msg = msg
        }


btnAnchorText : List (Attribute msg) -> DefaultAnchorArgs -> Element msg
btnAnchorText attributes { device, theme, url, text } =
    let
        btnArgs =
            defaultAnchorArgs theme
    in
    btn
        ((classList [ ( "Button--txt", True ) ] |> htmlAttribute) :: attributes)
        { btnArgs
            | device = device
            , url = url
            , text = text
        }



-- Icon buttons


type alias IconButtonArgs msg =
    { device : Device
    , theme : Theming
    , icon : String
    , tooltip : Maybe (TooltipType msg)
    , msg : Maybe msg
    }


iconBtn : List (Attribute msg) -> IconButtonArgs msg -> Element msg
iconBtn attributes { device, theme, icon, tooltip, msg } =
    let
        btnArgs =
            defaultBtnIconArgs theme msg
    in
    btnIconOnly
        ((classList [ ( "Button--icon", True ) ] |> htmlAttribute) :: attributes)
        { btnArgs
            | device = device
            , icon = icon
            , tooltip = tooltip
        }


btnRound : List (Attribute msg) -> IconButtonArgs msg -> Element msg
btnRound attributes { device, theme, icon, tooltip, msg } =
    let
        btnArgs =
            defaultBtnIconArgs theme msg
    in
    btnIconOnly
        ((classList [ ( "Button--round", True ) ] |> htmlAttribute) :: attributes)
        { btnArgs
            | device = device
            , icon = icon
            , tooltip = tooltip
        }


btnSecondaryAttr : Colors -> List (Attribute msg)
btnSecondaryAttr color =
    [ Font.color color.secondary
    , mouseDown <|
        active
            [ toRgb color.secondary
                |> (\c -> { c | alpha = 0.16 })
                |> fromRgb
                |> Background.color
            ]
    , mouseOver <| focusHover <| btnSecondaryFocusHover color
    , focused <| focusHover <| btnSecondaryFocusHover color
    ]


btnSecondaryFocusHover : Colors -> List Decoration
btnSecondaryFocusHover color =
    [ toRgb color.secondary
        |> (\c -> { c | alpha = 0.04 })
        |> fromRgb
        |> Background.color
    , noShadow
    ]


btnSecondary : List (Attribute msg) -> DefaultButtonArgs msg -> Element msg
btnSecondary attributes { device, theme, text, msg } =
    let
        btnArgs =
            defaultBtnArgs theme msg
    in
    btn
        (btnSecondaryAttr theme.color ++ attributes)
        { btnArgs
            | device = device
            , text = text
        }


btnSecondaryIcon : List (Attribute msg) -> DefaultButtonIconArgs msg -> Element msg
btnSecondaryIcon attributes { device, theme, icon, text, msg } =
    let
        btnArgs =
            defaultBtnIconArgs theme msg
    in
    btnIcon
        (btnSecondaryAttr theme.color ++ attributes)
        { btnArgs
            | device = device
            , text = text
            , icon = icon
        }



-- Size


xs : Device -> Attribute msg
xs device =
    paddingXY (rpx device 0.6) (rpx device space.xs)



-- Core components


type alias ButtonArgs msg =
    { device : Device
    , theme : Theming
    , buttonType : ButtonType
    , url : String
    , text : String
    , msg : Maybe msg
    }


type alias ButtonIconArgs msg =
    { device : Device
    , theme : Theming
    , buttonType : ButtonType
    , url : String
    , text : String
    , icon : String
    , tooltip : Maybe (TooltipType msg)
    , msg : Maybe msg
    }


type alias ButtonOnlyIconArgs msg =
    { device : Device
    , theme : Theming
    , buttonType : ButtonType
    , url : String
    , text : String
    , icon : String
    , tooltip : Maybe (TooltipType msg)
    , msg : Maybe msg
    }


attributes_ : Device -> Theming -> List (Attribute msg) -> List (Attribute msg)
attributes_ device { color } attributes =
    [ class "ButtonEUI" |> htmlAttribute
    , paddingXY (rpx device space.md) (rpxs device { breakpoints | default = Just 1.3, phone = Just 2.2 })
    , Border.rounded radius.default
    , Font.semiBold
    , Font.variant Font.smallCaps
    , Font.color color.text
    , mouseDown <| active []
    , mouseOver <| focusHover []
    , focused <| focusHover []
    ]
        ++ attributes


focusHover : List Decoration -> List Decoration
focusHover attributes =
    moveUp 1 :: attributes


active : List Decoration -> List Decoration
active attributes =
    moveDown 1 :: attributes


label : String -> Element msg
label text =
    String.toLower text |> Element.text


icon_ : List (Attribute msg) -> String -> Element msg
icon_ attr icon =
    Icon.icon "Button-icon" icon
        |> html
        |> el attr


btn : List (Attribute msg) -> ButtonArgs msg -> Element msg
btn attributes { device, theme, buttonType, url, text, msg } =
    case buttonType of
        Anchor ->
            link
                (attributes_ device theme attributes)
                { url = url
                , label = label text
                }

        Button ->
            Input.button
                (attributes_ device theme attributes)
                { onPress = msg
                , label = label text
                }


btnIcon : List (Attribute msg) -> ButtonIconArgs msg -> Element msg
btnIcon attributes { device, theme, buttonType, url, icon, text, msg } =
    let
        attr =
            (classList [ ( "is-changeable", True ) ] |> htmlAttribute) :: attributes

        child =
            column [ class "Button-content" |> htmlAttribute ]
                [ el [ class "Button-visibleContent" |> htmlAttribute ] <| label text
                , el [ class "Button-invisibleContent" |> htmlAttribute ] <|
                    icon_ [ centerX ] icon
                ]
    in
    case buttonType of
        Anchor ->
            link
                (attributes_ device theme attr)
                { url = url
                , label = child
                }

        Button ->
            Input.button
                (attributes_ device theme attr)
                { onPress = msg
                , label = child
                }


btnIconNextText : List (Attribute msg) -> ButtonIconArgs msg -> Element msg
btnIconNextText attributes { device, theme, buttonType, url, icon, text, msg } =
    let
        child =
            row [ spacing 15 ]
                [ icon_ [] icon
                , label text
                ]
    in
    case buttonType of
        Anchor ->
            link
                (attributes_ device theme attributes)
                { url = url
                , label = child
                }

        Button ->
            Input.button
                (attributes_ device theme attributes)
                { onPress = msg
                , label = child
                }


btnIconOnly : List (Attribute msg) -> ButtonOnlyIconArgs msg -> Element msg
btnIconOnly attributes { device, theme, buttonType, url, icon, text, tooltip, msg } =
    let
        aria =
            Region.description text

        child =
            row []
                [ icon_ [] icon
                , onTooltip tooltip
                    |> html
                    |> el []
                ]
    in
    case buttonType of
        Anchor ->
            link
                (aria :: attributes_ device theme attributes)
                { url = url
                , label = child
                }

        Button ->
            Input.button
                (aria :: attributes_ device theme attributes)
                { onPress = msg
                , label = child
                }
