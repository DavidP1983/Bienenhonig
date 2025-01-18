import {
    Form,
    Input,
    InputNumber,
    InputRef,
    Select,
} from 'antd';
import { RefObject, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IRules {
    required: boolean;
    message: string;
}

interface IStructureFrom {
    id: number;
    label: string;
    name: string;
    rules: IRules[];
    placeholder?: string;
    myRef?: RefObject<InputRef>;
    keys?: string;
}


const formStructureArray: IStructureFrom[] = [
    { id: 0, label: "Name", name: "name", rules: [{ required: true, message: 'Please fill out the field' }], placeholder: 'your name' },
    { id: 1, label: "City", name: "city", rules: [{ required: true, message: 'Please fill out the field' }], placeholder: 'your city' },
    { id: 2, label: "Rating", name: "rating", rules: [{ required: true, message: 'Please fill out the field' }], placeholder: 'rate the article' },
    { id: 3, label: "Title", name: "title", rules: [{ required: true, message: 'Please fill out the field' }], placeholder: 'select options' },
    { id: 4, label: "Comment", name: "comment", rules: [{ required: true, message: 'Please fill out the field' }], placeholder: 'leave your comment' },
]


interface MapElement {
    [key: string]: JSX.Element
}
type checkNodeElementType = Omit<IStructureFrom, "rules" | "id">
const checkNodeElement = ({ label, name, placeholder, myRef, keys }: checkNodeElementType) => {

    const map: MapElement = {
        "Name": <Input type='text'
            name={name}
            placeholder={placeholder}
            autoComplete='off'
            ref={myRef}
            key={keys}
            style={{ textTransform: "capitalize" }} />,
        "City": <Input type='text' name={name} placeholder={placeholder} autoComplete='off' style={{ textTransform: "capitalize" }} />,
        "Rating": <InputNumber type='number' name={name} style={{ width: '100%' }} min="1" max="5" placeholder={placeholder} autoComplete='off' />,
        "Title": <Select
            allowClear
            title='select'
            id={name}
            options={[
                { value: 'Bad Honey', label: 'Bad Honey', title: 'select' },
                { value: 'Good Honey', label: 'Good Honey', title: 'select' },
                { value: 'Excellent honey', label: 'Excellent honey', title: 'select' },
            ]}
            placeholder={placeholder}
        />,
        "Comment": <Input.TextArea name={name} placeholder={placeholder} autoComplete='off' />,
    }

    const element: JSX.Element = map[label] ?? 'Not fount';
    return element
}

const CreateFromStructure = ({ label, name, rules, placeholder, myRef, keys }: IStructureFrom) => {
    return (
        <Form.Item
            label={label}
            name={name}
            rules={rules}
        >
            {checkNodeElement({ label, name, placeholder, myRef, keys })}
        </Form.Item>
    );
}

export const ModalFormStructure = () => {
    const [inputKey, setInputKey] = useState('')
    const myRef = useRef<InputRef>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const uniqKey = uuidv4();
        setInputKey(uniqKey);
        // eslint-disable-next-line prefer-const
        timer = setTimeout(() => {
            if (myRef.current) {
                myRef.current.focus({
                    cursor: "start",
                });
            }
        }, 0);

        return () => {
            clearTimeout(timer)
        }
    }, []);

    return (
        <>
            {
                formStructureArray.map((item) => {
                    return <CreateFromStructure key={item.id} {...item} myRef={myRef} keys={inputKey} />
                })

            }
        </>
    );
}