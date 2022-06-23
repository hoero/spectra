module Spectra.Common.Events exposing (permitEventsOn, touchCoordinates)

import Html exposing (Attribute)
import Html.Events.Extra.Touch as Touch
import Spectra.Common.Data exposing (Position)


{-| This allows the other events like onClick to happen
-}
permitEventsOn : String -> (Touch.Event -> msg) -> Attribute msg
permitEventsOn touchType =
    { stopPropagation = False, preventDefault = False }
        |> Touch.onWithOptions ("touch" ++ touchType)


touchCoordinates : Touch.Event -> Position
touchCoordinates event =
    List.head event.changedTouches
        |> Maybe.map .clientPos
        |> Maybe.withDefault ( 0, 0 )
