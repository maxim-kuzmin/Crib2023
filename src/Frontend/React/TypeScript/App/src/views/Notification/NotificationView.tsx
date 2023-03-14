import React from 'react';
import { NotificationType } from '../../common';
import { notificationControl } from '../../controls';

export function NotificationView () {
    const control = notificationControl.create()
    return (
        <>
            {control.component}
            <button onClick={() => {
                control.show({
                    type: NotificationType.Error,
                    message: '11111',
                    // description: '11111 1111111'
                })
            }} >111</button>
        </>
    );
}
