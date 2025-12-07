// src/utils/getAntdIcon.tsx

import React from 'react';
// 关键：使用 * as 导入所有图标，Icons 现在是一个包含所有图标组件的对象
import * as AntdIcons from '@ant-design/icons'; 

/**
 * 根据图标名称字符串动态获取并渲染 Ant Design Icon 组件
 * @param iconName 后端返回的图标名称字符串 (例如: 'UserOutlined')
 * @returns 对应的 Ant Design Icon 组件 (JSX.Element) 或 null
 */
const getAntdIcon = (iconName: string) => {
  // 检查 AntdIcons 对象中是否存在这个属性名
  const IconComponent = (AntdIcons as any)[iconName];

  if (IconComponent) {
    // 找到了组件，实例化并返回它
    // 注意：我们必须确保返回的是一个 React 元素，所以需要 JSX 语法 <IconComponent />
    return <IconComponent />;
  }

  // 可选：如果没有找到匹配的图标，返回一个默认图标或 null
  return <AntdIcons.QuestionCircleOutlined />; 
};
export default getAntdIcon