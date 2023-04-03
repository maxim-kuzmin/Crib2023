import React, { useMemo } from 'react';
import { Tree } from 'antd';
import { type TreeControlData, type TreeControlParams } from '../../all';
import { type DataNode } from 'antd/es/tree';

interface Data {
  treeData: DataNode[];
  defaultExpandedKeys: string[];
  defaultSelectedKeys: string[];
}

function getTreeData (nodes: TreeControlData[]): Data {
  const defaultExpandedKeys: string[] = [];
  const defaultSelectedKeys: string[] = [];

  const treeData = nodes.map((node) => {
    const { children, isLeaf, key, title, isExpanded, isSelected } = node;

    const result: DataNode = {
      isLeaf,
      key,
      title
    };

    if (isExpanded) {
      defaultExpandedKeys.push(key);
    }

    if (isSelected) {
      defaultSelectedKeys.push(key);
    }

    if (children.length > 0) {
      const data = getTreeData(children);

      result.children = data.treeData;

      defaultExpandedKeys.push(...data.defaultExpandedKeys);
      defaultSelectedKeys.push(...data.defaultSelectedKeys);
    }

    return result;
  });

  return {
    defaultExpandedKeys,
    defaultSelectedKeys,
    treeData
  }
};

export const TreeControl: React.FC<TreeControlParams> = ({ data }: TreeControlParams) => {
  const { treeData, defaultExpandedKeys, defaultSelectedKeys } = useMemo(() => getTreeData(data), [data]);

  return <Tree
    treeData={treeData}
    defaultExpandedKeys={defaultExpandedKeys}
    defaultSelectedKeys={defaultSelectedKeys}
    />
}
