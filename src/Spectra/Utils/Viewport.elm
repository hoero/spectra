module Spectra.Utils.Viewport exposing
    ( directs
    , outsideBottom
    , outsideLeft
    , outsideRight
    , outsideTop
    , position
    , value
    )

import Html exposing (Attribute)
import Spectra.Common.Data exposing (Position, Viewport)
import Spectra.Utils.Utils exposing (styles)


value : Float -> String
value val =
    String.fromFloat val ++ "px"


position : Maybe Position -> List (Attribute msg)
position values =
    values
        |> Maybe.map
            (\( x, y ) ->
                styles
                    [ ( "top", value y )
                    , ( "left", value x )
                    ]
            )
        |> Maybe.withDefault []


{-| Redirects it if it's true
-}
directs : a -> a -> Bool -> a
directs towards or basedOn =
    if basedOn then
        or

    else
        towards



-- Outside viewport


outsideTop : Float -> Float -> Bool
outsideTop y viewportY =
    y < viewportY


outsideRight : Float -> Float -> Viewport -> Bool
outsideRight x triggeredWidth viewport =
    x + triggeredWidth > viewport.x + viewport.width


outsideBottom : Float -> Float -> Viewport -> Bool
outsideBottom y triggeredHeight viewport =
    if triggeredHeight > y then
        False

    else
        y + triggeredHeight > viewport.y + viewport.height


outsideLeft : Float -> Float -> Bool
outsideLeft x viewportX =
    x < viewportX
