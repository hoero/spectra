module Spectra.Tokens.Spacing exposing
    ( edges
    , space
    )

{-|

    xs = extra small
    sm  = small
    md  = medium
    lg  = large
    xl = extra large
    xx = extra extra large
    xxx = extra extra extra large

-}


type alias Spacing =
    { xs : Float
    , sm : Float
    , md : Float
    , lg : Float
    , xl : Float
    , xx : Float
    , xxx : Float
    }


space : Spacing
space =
    { xs = 0.4
    , sm = 0.8
    , md = 1.6
    , lg = 2.4
    , xl = 3.2
    , xx = 4.0
    , xxx = 4.8
    }


edges : { top : Int, right : Int, bottom : Int, left : Int }
edges =
    { top = 0
    , right = 0
    , bottom = 0
    , left = 0
    }
