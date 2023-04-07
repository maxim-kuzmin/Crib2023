import React, { type Key, useMemo } from 'react';
import { type BreadcrumbControlItem, type BreadcrumbControlParams } from '../../all';
import { Breadcrumb } from 'antd';
import { type ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';

function convertToItems (controlItems: BreadcrumbControlItem[], currentItemKey?: Key): ItemType[] {
  return controlItems.map((controlItem) => {
    const { href, key, title } = controlItem;

    return {
      title: currentItemKey === key
        ? (
          href
          ? <Link key={key} to={href}><h1>{title}</h1></Link>
          : <h1>{title}</h1>
        )
        : (
          href
            ? <Link key={key} to={href}>{title}</Link>
            : title
        )
    };
  });
}

export const BreadcrumbControl: React.FC<BreadcrumbControlParams> = ({ controlItems, currentItemKey }) => {
  const items = useMemo(() =>
    convertToItems(controlItems, currentItemKey),
    [controlItems, currentItemKey]
  );

  return <Breadcrumb items={items} />
}
