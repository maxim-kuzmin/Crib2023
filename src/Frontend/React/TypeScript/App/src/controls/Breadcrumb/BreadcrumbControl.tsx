import React, { useMemo } from 'react';
import { type BreadcrumbControlItem, type BreadcrumbControlParams } from '../../all';
import { Breadcrumb } from 'antd';
import { type ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';

function convertToItems (controlItems: BreadcrumbControlItem[]): ItemType[] {
  return controlItems.map((controlItem) => {
    const { href, title } = controlItem;

    return {
      title: href
        ? <Link to={href}>{title}</Link>
        : <h1>{title}</h1>
    }
  });
}

export const BreadcrumbControl: React.FC<BreadcrumbControlParams> = ({ controlItems }) => {
  const items = useMemo(() => convertToItems(controlItems), [controlItems]);

  return <Breadcrumb items={items} />
}
