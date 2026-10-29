import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

import './accordion.scss';

interface AccordionProps {
  items: CollapseProps['items'];
}

export const Accordion = ({ items }: AccordionProps) => {
  return (
    <Collapse
      items={items}
      defaultActiveKey={['1']}
      style={{ marginTop: 20, padding: 20 }}
    />
  );
};
