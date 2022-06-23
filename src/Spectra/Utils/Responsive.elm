module Spectra.Utils.Responsive exposing
    ( Breakpoints
    , bigDesktop
    , bigDesktopL
    , bigDesktopP
    , breakpoints
    , desktop
    , desktopL
    , desktopP
    , deviceData
    , phone
    , phoneL
    , phoneP
    , respond
    , tablet
    , tabletL
    , tabletP
    )

import Element exposing (Device, DeviceClass(..), Orientation(..), classifyDevice)
import Maybe.Extra exposing (isJust)


{-| MEDIA QUERY MANAGER
-------------------------

    0      - *      : Base
    0      - 600px  : Phone
    600    - 954px  : Tablet portrait mode
    954    - 1200px : Tablet landscape mode
    [1200  - 1921px]: Is where our normal styles apply (Desktop)
    1921px ->       : Big Desktop

    $breakpoint argument choices:
    - phone
    - phoneP (Phone portrait)
    - phoneL (Phone landscape)
    - tablet
    - tabletP (Tablet portrait)
    - tabletL (Tablet landscape)
    - desktop
    - desktopP (Desktop portrait)
    - desktopL (Desktop landscape)
    - bigDesktop
    - bigDesktopP (Big Desktop portrait)
    - bigDesktopL (Big Desktop landscape)

-}
type alias Breakpoints val =
    { default : Maybe val
    , phone : Maybe val
    , phoneP : Maybe val
    , phoneL : Maybe val
    , tablet : Maybe val
    , tabletP : Maybe val
    , tabletL : Maybe val
    , desktop : Maybe val
    , desktopP : Maybe val
    , desktopL : Maybe val
    , bigDesktop : Maybe val
    , bigDesktopP : Maybe val
    , bigDesktopL : Maybe val
    }


breakpoints : Breakpoints val
breakpoints =
    { default = Nothing
    , phone = Nothing
    , phoneP = Nothing
    , phoneL = Nothing
    , tablet = Nothing
    , tabletP = Nothing
    , tabletL = Nothing
    , desktop = Nothing
    , desktopP = Nothing
    , desktopL = Nothing
    , bigDesktop = Nothing
    , bigDesktopP = Nothing
    , bigDesktopL = Nothing
    }


phone : Device -> Bool
phone device =
    device.class == Phone


phoneP : Device -> Bool
phoneP device =
    device.class == Phone && device.orientation == Portrait


phoneL : Device -> Bool
phoneL device =
    device.class == Phone && device.orientation == Landscape


tablet : Device -> Bool
tablet device =
    device.class == Tablet


tabletP : Device -> Bool
tabletP device =
    device.class == Tablet && device.orientation == Portrait


tabletL : Device -> Bool
tabletL device =
    device.class == Tablet && device.orientation == Landscape


desktop : Device -> Bool
desktop device =
    device.class == Desktop


desktopP : Device -> Bool
desktopP device =
    device.class == Desktop && device.orientation == Portrait


desktopL : Device -> Bool
desktopL device =
    device.class == Desktop && device.orientation == Landscape


bigDesktop : Device -> Bool
bigDesktop device =
    device.class == BigDesktop


bigDesktopP : Device -> Bool
bigDesktopP device =
    device.class == BigDesktop && device.orientation == Portrait


bigDesktopL : Device -> Bool
bigDesktopL device =
    device.class == BigDesktop && device.orientation == Landscape


{-| Simulates CSS @media query

    With device data it can return specific values for different
    device profiles using breakpoints.

-}
respond : Device -> val -> Breakpoints val -> val
respond { class, orientation } default bps =
    let
        return val =
            val |> Maybe.withDefault default
    in
    case class of
        Phone ->
            if
                isJust bps.phone
                    || isJust bps.phoneP
                    || isJust bps.phoneL
            then
                case orientation of
                    Portrait ->
                        if isJust bps.phoneP then
                            return bps.phoneP

                        else
                            return bps.phone

                    Landscape ->
                        if isJust bps.phoneL then
                            return bps.phoneL

                        else
                            return bps.phone

            else
                return bps.default

        Tablet ->
            if
                isJust bps.tablet
                    || isJust bps.tabletP
                    || isJust bps.tabletL
            then
                case orientation of
                    Portrait ->
                        if isJust bps.tabletP then
                            return bps.tabletP

                        else
                            return bps.tablet

                    Landscape ->
                        if isJust bps.tabletL then
                            return bps.tabletL

                        else
                            return bps.tablet

            else
                return bps.default

        Desktop ->
            if
                isJust bps.desktop
                    || isJust bps.desktopP
                    || isJust bps.desktopL
            then
                case orientation of
                    Portrait ->
                        if isJust bps.desktopP then
                            return bps.desktopP

                        else
                            return bps.desktop

                    Landscape ->
                        if isJust bps.desktopL then
                            return bps.desktopL

                        else
                            return bps.desktop

            else
                return bps.default

        BigDesktop ->
            if
                isJust bps.bigDesktop
                    || isJust bps.bigDesktopP
                    || isJust bps.bigDesktopL
            then
                case orientation of
                    Portrait ->
                        if isJust bps.bigDesktopP then
                            return bps.bigDesktopP

                        else
                            return bps.bigDesktop

                    Landscape ->
                        if isJust bps.bigDesktopL then
                            return bps.bigDesktopL

                        else
                            return bps.bigDesktop

            else
                return bps.default


deviceData : Int -> Int -> Device
deviceData vw vh =
    classifyDevice { width = vw, height = vh }
