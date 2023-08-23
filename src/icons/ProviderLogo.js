import * as React from 'react';
import {ReactComponent as BahnZumBergLogo} from './svg/provider/logo_bzb.svg';
import {ReactComponent as AlpenvereinAktivLogo} from './svg/provider/logo_alpenvereinaktiv.svg';
import {ReactComponent as BergfexLogo} from './svg/provider/logo_bergfex.svg';
import {ReactComponent as HoehenrauschLogo} from './svg/provider/logo_hoehenrausch.svg';
import {ReactComponent as WandernSteiermarkLogo} from './svg/provider/logo_steiermark.svg';
import {ReactComponent as FallbackLogo} from './svg/provider/logo_fallback.svg';
<<<<<<< HEAD
import {ReactComponent as MaPZSsiLogo} from './svg/provider/logo_mapzssi.svg';
=======
>>>>>>> dev-drop-slovenia-front2

const provider = {
    BAHN_ZUM_BERG: 'bahnzumberg',
    ALPENVEREIN_AKTIV: 'alpenvereinaktiv',
    BERGFEXDE: 'bergfexde',
    BERGFEXAT: 'bergfexat',
    BERGFEXCH: 'bergfexch',
    BERGFEXIT: 'bergfexit',
    HOEHENRAUSCH: 'hoehenrausch',
<<<<<<< HEAD
    WANDERN_STEIERMARK: 'wandernsteiermarkat',
    MAPZSSI: 'mapzssi'
=======
    WANDERN_STEIERMARK: 'wandernsteiermarkat'
>>>>>>> dev-drop-slovenia-front2
}

const providerStyles = {width: "48px" , height: "48px"};

export default function ProviderLogo(props) {
    switch (props.provider) {
        case provider.BAHN_ZUM_BERG:
            return <BahnZumBergLogo style={{...providerStyles, ...props.style, }}/>
        case provider.ALPENVEREIN_AKTIV:
            return <AlpenvereinAktivLogo style={{...providerStyles, ...props.style}}/>
        case provider.BERGFEXDE:
        case provider.BERGFEXAT:
        case provider.BERGFEXCH:
        case provider.BERGFEXIT:
            return <BergfexLogo style={{...providerStyles, ...props.style}}/>
        case provider.HOEHENRAUSCH:
            return <HoehenrauschLogo style={{...providerStyles, ...props.style}}/>
        case provider.WANDERN_STEIERMARK:
            return <WandernSteiermarkLogo style={{...providerStyles, ...props.style}}/>
<<<<<<< HEAD
        case provider.MAPZSSI:
                return <MaPZSsiLogo style={{...providerStyles, ...props.style}}/>
=======
>>>>>>> dev-drop-slovenia-front2
        default:
            return <FallbackLogo style={{...providerStyles, ...props.style}}/>
    }
}
