module Spectra.Components.Icon exposing (icon)

import Html exposing (Html)
import Svg exposing (svg, use)
import Svg.Attributes exposing (class, xlinkHref)


{-| The sprite file that contains all icons is inserted in the markup as an SVG. Here you just need to provide the name of the icon.
-}
icon : String -> String -> Html msg
icon class_ name =
    svg
        [ class class_ ]
        [ use
            [ "#icon-" ++ name |> xlinkHref ]
            []
        ]
