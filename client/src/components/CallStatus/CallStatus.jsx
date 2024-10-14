import React, { useEffect, useState } from 'react';
import { ReactComponent as InCall } from '../../assets/icons/in_call.svg';
import { ReactComponent as OutCall } from '../../assets/icons/out_call.svg';
import { ReactComponent as InCallMissed } from '../../assets/icons/in_call_missed.svg';
import { ReactComponent as OutCallFailed } from '../../assets/icons/out_call_failed.svg';

const CallStatus = ({ inOut, status }) => {
    const [icon, setIcon] = useState()

    useEffect(()=>{
        setIcon(getCallIcon())
        //eslint-disable-next-line
    },[])

    const getCallIcon = () => {
        if (inOut === 1) {
            if (status.trim() === 'Дозвонился') {
                return <InCall />;
            } else {
                return <InCallMissed />;
            }
        } else if (status.trim() === 'Дозвонился') {
            return <OutCall />;
        } else {
            return <OutCallFailed />;
        }
    };

    return <>
        {icon}
    </>;
};

export default CallStatus;
