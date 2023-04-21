import { useRef } from 'react';
import { notification } from 'antd';
import {
  type NotificationControlComponent,
  type NotificationControlHooks,
  type NotificationControlProps,
  NotificationControlType,
} from '../../common';

function useComponent (): NotificationControlComponent {
    const [api, contextHolder] = notification.useNotification();

    return useRef({
      content: contextHolder,
      show: (props: NotificationControlProps) => {
        const { type, message, description } = props;

        switch (type) {
            case NotificationControlType.Error:
                api.error({ message, description });
                break;
            case NotificationControlType.Info:
                api.info({ message, description });
                break;
            case NotificationControlType.Success:
                api.success({ message, description });
                break;
            case NotificationControlType.Waring:
                api.warning({ message, description });
                break;
        }
      },
    }).current;
  }

export function createNotificationControlHooks (): NotificationControlHooks {
  return {
    useComponent
  };
}
