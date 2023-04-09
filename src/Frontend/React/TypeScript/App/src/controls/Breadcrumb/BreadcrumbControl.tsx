import React, { type Key, useMemo, memo } from 'react';
import { Breadcrumb } from 'antd';
import { type ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';
import { type BreadcrumbControlItem, type BreadcrumbControlProps } from '../../all';

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

export const BreadcrumbControl: React.FC<BreadcrumbControlProps> = memo(function BreadcrumbControl ({
  controlItems,
  currentItemKey
}: BreadcrumbControlProps) {
  const items = useMemo(() =>
    convertToItems(controlItems, currentItemKey),
    [controlItems, currentItemKey]
  );

  return (
    <Breadcrumb items={items} />
  );
});
