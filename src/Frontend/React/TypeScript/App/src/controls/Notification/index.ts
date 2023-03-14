import { notification } from 'antd';
import { type NotificationControl, type NotificationData, NotificationType } from '../../common';

function create (): NotificationControl {
    const [api, contextHolder] = notification.useNotification();

    return {
        component: contextHolder,
        show (input: NotificationData) {
            const { type, message, description } = input;

            switch (type) {
                case NotificationType.Error:
                    api.error({ message, description });
                    break;
                case NotificationType.Info:
                    api.info({ message, description });
                    break;
                case NotificationType.Success:
                    api.success({ message, description });
                    break;
                case NotificationType.Waring:
                    api.warning({ message, description });
                    break;
            }
        }
    }
}

export const notificationControl = {
    create
};
