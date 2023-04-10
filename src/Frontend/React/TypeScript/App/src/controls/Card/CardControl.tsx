import React, { useMemo, type ReactNode, memo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'antd';
import { type CardControlExtra, type CardControlAction, type CardControlProps, CardControlType } from '../../all';

function convertToActions (controlActions?: CardControlAction[]): ReactNode[] | undefined {
  return controlActions?.map((controlAction) => {
    const { className, href, key, onClick, title } = controlAction;

    return href
      ? <Link className={className} to={href} key={key}>{title}</Link>
      : (
          onClick
            ? <Button className={className} onClick={onClick}>{title}</Button>
            : (
                className
                  ? <span className={className}>{ title }</span>
                  : title
              )
        );
  })
}

function convertToExtra (controlExtra?: CardControlExtra): ReactNode | undefined {
  let result: ReactNode;

  if (controlExtra) {
    const { className, title } = controlExtra;

    result = className
      ? <span className={className}>{ title }</span>
      : title;
  }

  return result
}

export const CardControl: React.FC<CardControlProps> = memo(function CardControl ({
  children,
  controlActions,
  controlExtra,
  title,
  type
}: CardControlProps) {
  const actions = useMemo(
    () => convertToActions(controlActions),
    [controlActions]
  );

  const extra = useMemo(
    () => convertToExtra(controlExtra),
    [controlExtra]
  );

  let titleMarkup: ReactNode = title;

  if (type === CardControlType.Main) {
    titleMarkup = (
      <h1>{titleMarkup}</h1>
    );
  }

  return (
    <Card title={titleMarkup} extra={extra} actions={actions}>
      {children}
    </Card>
  );
});
