import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

import './accordion.scss';

export const Accordion = () => {

    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <span className='ant-collapse-header-text label'>Recipes</span>,
            children: <p className='descr'>{text}</p>,
        },
        {
            key: '2',
            label: <span className='ant-collapse-header-text label'>Opinions</span>,
            children: <p className='descr'>{text}</p>,
        },
        {
            key: '3',
            label: <span className='ant-collapse-header-text label'>Books</span>,
            children: <p className='descr'>{text}</p>,
        },
    ];

    return (
        <Collapse accordion items={items} defaultActiveKey={['1']} style={{ marginTop: 20, padding: 20 }} />
    );
}