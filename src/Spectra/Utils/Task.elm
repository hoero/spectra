module Spectra.Utils.Task exposing
    ( blurElement
    , delay
    , focusElement
    , getElement
    , getViewportOf
    , perform
    , resetScroll
    , restoreScroll
    , setScrollOf
    )

import Browser.Dom as Dom
import Process exposing (sleep)
import Spectra.Common.Data exposing (Id, Scroll, Seconds)
import Task


perform : msg -> Cmd msg
perform =
    Task.perform identity << Task.succeed


delay : Seconds -> msg -> Cmd msg
delay secs msg =
    sleep (1000 * secs)
        |> Task.andThen (always <| Task.succeed msg)
        |> Task.perform identity


getElement :
    Id
    -> (Result Dom.Error Dom.Element -> msg)
    -> Cmd msg
getElement id msg =
    Task.attempt msg (Dom.getElement id)


focusElement : Id -> msg -> Cmd msg
focusElement id msg =
    Task.attempt (\_ -> msg) (Dom.focus id)


blurElement : Id -> msg -> Cmd msg
blurElement id msg =
    Task.attempt (\_ -> msg) (Dom.blur id)


restoreScroll : Scroll -> msg -> Cmd msg
restoreScroll position msg =
    Task.perform (\_ -> msg) (Dom.setViewport 0 position)


resetScroll : Id -> msg -> Cmd msg
resetScroll id msg =
    Dom.getViewportOf id
        |> Task.andThen (\_ -> Dom.setViewportOf id 0 0)
        |> Task.attempt (\_ -> msg)


getViewportOf : Id -> (Result Dom.Error Dom.Viewport -> msg) -> Cmd msg
getViewportOf id msg =
    Task.attempt msg (Dom.getViewportOf id)


setScrollOf : Id -> Scroll -> msg -> Cmd msg
setScrollOf id position msg =
    Dom.getViewportOf id
        |> Task.andThen (\_ -> Dom.setViewportOf id 0 position)
        |> Task.attempt (\_ -> msg)
