module Spectra.Utils.Utils exposing
    ( click
    , click_
    , keys
    , mouseOnDown
    , mouseOnUp
    , onEnterKey
    , onEscape
    , onEscapeOrEnter
    , onKeyDown
    , onKeyUp
    , onLeftOrRight
    , onSpacebarKey
    , onTab
    , onUpOrDownKey
    , styles
    )

import Html exposing (Attribute)
import Html.Attributes exposing (style)
import Html.Events exposing (on, onClick, preventDefaultOn, stopPropagationOn)
import Json.Decode as JD
import Keyboard.Event exposing (KeyboardEvent, considerKeyboardEvent)
import Keyboard.Key exposing (Key(..))



-- Attributes


type alias Keys msg =
    { down : Maybe msg
    , enter : Maybe msg
    , escape : Maybe msg
    , left : Maybe msg
    , right : Maybe msg
    , spacebar : Maybe msg
    , tab : Maybe msg
    , up : Maybe msg
    }


styles : List ( String, String ) -> List (Attribute msg)
styles styles_ =
    List.map (\( property, value ) -> style property value) styles_


click_ : Maybe msg -> List (Attribute msg)
click_ msg =
    msg
        |> Maybe.map (\theMsg -> [ onClick theMsg ])
        |> Maybe.withDefault []


click : msg -> Attribute msg
click msg =
    stopPropagationOn "click" <| JD.map prevent <| JD.succeed msg


mouseOnDown : msg -> Attribute msg
mouseOnDown msg =
    stopPropagationOn "mousedown" <| JD.map prevent <| JD.succeed msg


mouseOnUp : msg -> Attribute msg
mouseOnUp msg =
    stopPropagationOn "mouseup" <| JD.map prevent <| JD.succeed msg


prevent : msg -> ( msg, Bool )
prevent msg =
    ( msg, True )


keys : Keys msg
keys =
    { down = Nothing
    , enter = Nothing
    , escape = Nothing
    , left = Nothing
    , right = Nothing
    , spacebar = Nothing
    , tab = Nothing
    , up = Nothing
    }


onKeyDown : Keys msg -> Attribute msg
onKeyDown { down, enter, escape, left, right, spacebar, tab, up } =
    let
        keyboardEventToMsg : KeyboardEvent -> Maybe msg
        keyboardEventToMsg event =
            if event.keyCode == Down then
                down

            else if event.keyCode == Escape then
                escape

            else if event.keyCode == Enter then
                enter

            else if event.keyCode == Left then
                left

            else if event.keyCode == Right then
                right

            else if event.keyCode == Spacebar then
                spacebar

            else if event.keyCode == Tab && not event.shiftKey then
                tab

            else if event.keyCode == Up then
                up

            else
                Nothing
    in
    preventDefaultOn "keydown" <| JD.map alwaysPreventDefault <| considerKeyboardEvent keyboardEventToMsg


onKeyUp : Keys msg -> Attribute msg
onKeyUp { down, enter, escape, left, right, spacebar, tab, up } =
    let
        keyboardEventToMsg : KeyboardEvent -> Maybe msg
        keyboardEventToMsg event =
            if event.keyCode == Down then
                down

            else if event.keyCode == Escape then
                escape

            else if event.keyCode == Enter then
                enter

            else if event.keyCode == Left then
                left

            else if event.keyCode == Right then
                right

            else if event.keyCode == Spacebar then
                spacebar

            else if event.keyCode == Tab && not event.shiftKey then
                tab

            else if event.keyCode == Up then
                up

            else
                Nothing
    in
    preventDefaultOn "keyup" <| JD.map alwaysPreventDefault <| considerKeyboardEvent keyboardEventToMsg


onTab : msg -> Attribute msg
onTab msg =
    let
        keyboardEventToMsg : KeyboardEvent -> Maybe msg
        keyboardEventToMsg event =
            if event.keyCode == Tab && not event.shiftKey then
                Just msg

            else
                Nothing
    in
    on "keyup" <| considerKeyboardEvent keyboardEventToMsg


onEscape : msg -> Attribute msg
onEscape msg =
    let
        keyboardEventToMsg : KeyboardEvent -> Maybe msg
        keyboardEventToMsg event =
            if event.keyCode == Escape then
                Just msg

            else
                Nothing
    in
    on "keyup" <| considerKeyboardEvent keyboardEventToMsg


onSpacebarKey : msg -> Attribute msg
onSpacebarKey msg =
    let
        keyboardEventToMsg : KeyboardEvent -> Maybe msg
        keyboardEventToMsg event =
            if event.keyCode == Spacebar then
                Just msg

            else
                Nothing
    in
    on "keyup" <| considerKeyboardEvent keyboardEventToMsg


onEnterKey : msg -> Attribute msg
onEnterKey msg =
    let
        keyboardEventToMsg : KeyboardEvent -> Maybe msg
        keyboardEventToMsg event =
            if event.keyCode == Enter then
                Just msg

            else
                Nothing
    in
    on "keyup" <| considerKeyboardEvent keyboardEventToMsg


onEscapeOrEnter : Maybe msg -> Maybe msg -> Attribute msg
onEscapeOrEnter onEscape_ onEnter_ =
    let
        keyboardEventToMsg : KeyboardEvent -> Maybe msg
        keyboardEventToMsg event =
            if event.keyCode == Escape then
                onEscape_

            else if event.keyCode == Enter then
                onEnter_

            else
                Nothing
    in
    on "keyup" <| considerKeyboardEvent keyboardEventToMsg


onUpOrDownKey : Maybe msg -> Maybe msg -> Attribute msg
onUpOrDownKey onUp onDown =
    let
        keyboardEventToMsg : KeyboardEvent -> Maybe msg
        keyboardEventToMsg event =
            if event.keyCode == Up then
                onUp

            else if event.keyCode == Down then
                onDown

            else
                Nothing
    in
    -- stopPropagationOn "keydown" <| JD.map prevent <| considerKeyboardEvent keyboardEventToMsg
    preventDefaultOn "keydown" <| JD.map alwaysPreventDefault <| considerKeyboardEvent keyboardEventToMsg


onLeftOrRight : Maybe msg -> Maybe msg -> Attribute msg
onLeftOrRight onLeft onRight =
    let
        keyboardEventToMsg : KeyboardEvent -> Maybe msg
        keyboardEventToMsg event =
            if event.keyCode == Left then
                onLeft

            else if event.keyCode == Right then
                onRight

            else
                Nothing
    in
    preventDefaultOn "keydown" <| JD.map alwaysPreventDefault <| considerKeyboardEvent keyboardEventToMsg


alwaysPreventDefault : msg -> ( msg, Bool )
alwaysPreventDefault msg =
    ( msg, True )
