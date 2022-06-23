module Spectra.Common.Data exposing
    ( Browser(..)
    , Device(..)
    , Element
    , Id
    , Index
    , Outside(..)
    , Position
    , Scene
    , Scroll
    , Seconds
    , Viewport
    , element
    , initialElement
    , initialViewport
    , phone
    , scene
    , tabland
    , tablort
    , viewport
    )

import Browser.Dom as Dom


type Device
    = Desktop
    | Tablet
    | Phone


type Browser
    = Edge
    | Opera
    | Chrome
    | IE
    | Firefox
    | Safari
    | Other


type Outside
    = Menu
    | Dropdown
    | SingleSelect
    | MultiSelect
    | Search


type alias Id =
    String


type alias Index =
    Int


type alias Seconds =
    Float


type alias Scroll =
    Float


type alias Position =
    ( Float, Float )


{-| The same one from Browser.Dom Viewport
-}
type alias Scene =
    { width : Float
    , height : Float
    }


scene : Scene
scene =
    { width = 0
    , height = 0
    }


{-| The same one from Browser.Dom Viewport
-}
type alias Viewport =
    { x : Float
    , y : Float
    , width : Float
    , height : Float
    }


viewport : Viewport
viewport =
    { x = 0
    , y = 0
    , width = 0
    , height = 0
    }


initialViewport : Dom.Viewport
initialViewport =
    { scene = scene
    , viewport = viewport
    }


{-| The same one from Browser.Dom Element; but using Viewport instead of doing a new Element to not repeat code
-}
type alias Element =
    { scene : Scene
    , viewport : Viewport
    , element : Viewport
    }


element : Viewport
element =
    viewport


initialElement : Element
initialElement =
    { scene = scene
    , viewport = viewport
    , element = element
    }



-- Same as breakpoint.scss


phone : Float
phone =
    600


tablort : Float
tablort =
    900


tabland : Float
tabland =
    1200
