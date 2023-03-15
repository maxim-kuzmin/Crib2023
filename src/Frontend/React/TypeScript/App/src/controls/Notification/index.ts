import { notification } from 'antd';
import { type NotificationComponent, type NotificationData, NotificationType } from '../../common';

function useComponent (): NotificationComponent {
    const [api, contextHolder] = notification.useNotification();

    return {
        content: contextHolder,
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
    useComponent
};
