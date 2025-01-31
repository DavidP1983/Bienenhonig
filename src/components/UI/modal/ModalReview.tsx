import { Modal } from "antd";
import { ModalForm } from '../form/ModalForm';

import '../../singleItem/styles/singleItem.scss';
import { useState } from 'react';


export const ModalReview = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function closeModal(timer?: NodeJS.Timeout | null): void {
        setIsModalOpen(false);
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    return (
        <>

            <Modal
                title="Rate Form"
                open={isModalOpen}
                onCancel={() => closeModal()}
                footer
                destroyOnClose
                classNames={
                    {
                        mask: "singleItem__modalMask",
                        header: "singleItem__modalTitle",
                        content: "singleItem__modalClose",
                        wrapper: "singleItem__modalWrapper"

                    }
                }
            >
                <ModalForm close={closeModal} />
            </Modal>

            <button className='singleItem__btn' onClick={() => setIsModalOpen(true)} suppressHydrationWarning={true}>Add you comment</button>
        </>
    );
}