import { Button, Card } from 'antd';
import React, { useMemo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { type CardControlExtra, type CardControlAction, type CardControlProps } from '../../all';

function convertToActions (controlActions?: CardControlAction[]): ReactNode[] | undefined {
  return controlActions?.map((controlAction) => {
    const { className, href, key, onClickCallback, title } = controlAction;

    return href
      ? <Link className={className} to={href} key={key}>{title}</Link>
      : (
          onClickCallback
            ? <Button className={className} onClick={onClickCallback}>{title}</Button>
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

export const CardControl: React.FC<CardControlProps> = ({
  children,
  controlActions,
  controlExtra,
  title
}: CardControlProps) => {
  const actions = useMemo(() => convertToActions(controlActions), [controlActions]);
  const extra = useMemo(() => convertToExtra(controlExtra), [controlExtra]);

  return (
    <Card title={title} extra={extra} actions={actions}>
      {children}
    </Card>
  );
}