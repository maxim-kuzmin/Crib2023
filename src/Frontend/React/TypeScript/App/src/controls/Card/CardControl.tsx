import { Card } from 'antd';
import React, { useMemo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { type CardControlExtra, type CardControlAction, type CardControlProps } from '../../all';

function convertToActions (controlActions?: CardControlAction[]): ReactNode[] | undefined {
  return controlActions?.map((controlAction) => {
    const { href, key, title } = controlAction;

    return <Link to={href} key={key}>{title}</Link>
  })
}

function convertToExtra (controlExtra?: CardControlExtra): ReactNode | undefined {
  let result: ReactNode;

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
