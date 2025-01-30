import { ProductsCategory } from '@/components/products/ProductsCategory';
import { Drawer } from 'antd';
import Link from 'next/link';
import { useMobileFilter } from '@/store';
import { useShallow } from 'zustand/shallow';


import './styles/mobileFilter.scss';

export const MobileFilter = () => {
    const { status, changeStatus } = useMobileFilter(useShallow((state) => ({
        status: state.status,
        changeStatus: state.changeStatus
    })))


    return (

        <Drawer
            title="Filter Options"
            style={{ height: "472px" }}
            placement={'top'}
            width={500}
            onClose={() => changeStatus()}
            open={status}
            classNames={
                {
                    content: "content",
                    wrapper: "wrapper",
                }
            }
        >
            <div className='mobileFilter'>

                <div className='categories'>
                    <ProductsCategory />
                </div>

                <div className='location'>
                    <h2 className='title'>Locations</h2>
                    <ul className='addr'>
                        <li>
                            <Link href="/location/Erkrath-Hochdahl" title="location address Erkrath-Hochdahl" onClick={() => changeStatus()}><address ><strong>Erkrath-Hochdahl, Germany</strong></address></Link>
                        </li>
                        <li>
                            <Link href="/location/Dusseldorf" title="location address Düsseldorf" onClick={() => changeStatus()}><address ><strong>Düsseldorf, Germany</strong></address></Link>
                        </li>
                        <li>
                            <a className='phone' href="tel:44999228974" inputMode='tel' onClick={() => changeStatus()}>+4 (499) 922-89-74</a>
                        </li>
                    </ul>
                </div>

            </div>
        </Drawer>
    );
}