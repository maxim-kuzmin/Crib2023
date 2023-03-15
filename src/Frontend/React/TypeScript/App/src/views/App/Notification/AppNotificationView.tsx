import React from 'react';
import { NotificationType } from '../../../common';
import { notificationControl } from '../../../controls';

export function AppNotificationView () {
    const component = notificationControl.useComponent()
    return (
        <>
            {component.content}
            <button onClick={() => {
                component.show({
                    type: NotificationType.Error,
                    message: '11111',
                    // description: '11111 1111111'
                })
            }} >111</button>
        </>
    );
}
