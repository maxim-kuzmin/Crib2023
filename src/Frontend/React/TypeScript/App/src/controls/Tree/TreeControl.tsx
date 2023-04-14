import React, { type Key, useMemo, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Tree } from 'antd';
import { type DataNode } from 'antd/es/tree';
import { type TreeControlNode, type TreeControlProps } from '../../common';

interface Data {
  defaultExpandedKeys: Key[];
  defaultSelectedKeys: Key[];
  initTreeData: DataNode[];
}

function convertToData (controlNodes: TreeControlNode[]): Data {
  const defaultExpandedKeys: Key[] = [];
  const defaultSelectedKeys: Key[] = [];

  const initTreeData = controlNodes.map((controlNode) => {
    const { children, href, isLeaf, key, title, isExpanded, isSelected } = controlNode;

    const result: DataNode = {
      isLeaf,
      key,
      title: <Link to={href}>{title}</Link>
    };

    if (isExpanded) {
      defaultExpandedKeys.push(key);
    }

    if (isSelected) {
      defaultSelectedKeys.push(key);
    }

    if (children.length > 0) {
      const data = convertToData(children);

      result.children = data.initTreeData;

      defaultExpandedKeys.push(...data.defaultExpandedKeys);
      defaultSelectedKeys.push(...data.defaultSelectedKeys);
    }

    return result;
  });

  return {
    defaultExpandedKeys,
    defaultSelectedKeys,
    initTreeData
  }
};

function updateTreeData (list: DataNode[], key: Key, children: DataNode[]): DataNode[] {
  return list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }

    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }

    return node;
  });
}

export const TreeControl: React.FC<TreeControlProps> = memo(
function TreeControl ({
  controlNodes,
  getChildren
}: TreeControlProps) {
  const { initTreeData, defaultExpandedKeys, defaultSelectedKeys } = useMemo(
    () => convertToData(controlNodes),
    [controlNodes]
  );

  const [treeData, setTreeData] = useState(initTreeData);

  async function onLoadData ({ key, children }: any) {
    if (children) {
      return;
    }

    const nodes = await getChildren(key);

    const { initTreeData } = convertToData(nodes);

    setTreeData((origin) =>
      updateTreeData(origin, key, initTreeData),
    );
  };

  return (
    <Tree
      defaultExpandedKeys={defaultExpandedKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      loadData={onLoadData}
      treeData={treeData}
    />
  );
});
