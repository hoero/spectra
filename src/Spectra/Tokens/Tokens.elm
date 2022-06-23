module Spectra.Tokens.Tokens exposing
    ( border
    , noShadow
    , radius
    , shadows
    , zIndex
    , zIndexComp
    )

import Element exposing (Decoration, rgba)
import Element.Border as Border



-- Radius


type alias Radius =
    { default : Int
    , medium : Int
    , small : Int
    , rounded : Int
    }


radius : Radius
radius =
    { default = 4
    , medium = 3
    , small = 2
    , rounded = 100
    }



-- Border


border =
    { edges =
        { bottom = 0
        , left = 0
        , right = 0
        , top = 0
        }
    , alpha = 0.1
    , color = rgba 0 0 0 0.1
    }



-- Shadows


shadows =
    { up =
        { first =
            { offset = ( 0, 5 )
            , size = -2
            , blur = 5
            , color = rgba 0 0 0 0.14
            }
        , second =
            { offset = ( 0, 3 )
            , size = 0
            , blur = 1
            , color = rgba 0 0 0 0.09
            }
        , third =
            { offset = ( 0, 2 )
            , size = 0
            , blur = 15
            , color = rgba 0 0 0 0.05
            }
        }
    , down =
        { first =
            { offset = ( 0, 3 )
            , size = -2
            , blur = 1
            , color = rgba 0 0 0 0.16
            }
        , second =
            { offset = ( 0, 2 )
            , size = 0
            , blur = 2
            , color = rgba 0 0 0 0.05
            }
        , third =
            { offset = ( 0, 1 )
            , size = 0
            , blur = 5
            , color = rgba 0 0 0 0.08
            }
        }
    }


noShadow : Decoration
noShadow =
    Border.shadow
        { offset = ( 0, 0 )
        , size = 0
        , blur = 0
        , color = rgba 0 0 0 0
        }



-- Z-index


zIndex =
    { z5k = "5000"
    , z4k = "4000"
    , z3k = "3000"
    , z2k = "2000"
    , z15h = "1500"
    , z1k = "1000"
    , zdefault = "1"
    , zbelow = "-1"
    }


{-| Components
-}
zIndexComp =
    { header = zIndex.z4k
    , modal = zIndex.z5k
    , navPrimary = zIndex.z15h
    , navBtnSup = zIndex.z4k
    , navBtnBg = zIndex.z1k
    , tooltip = zIndex.z4k
    }
