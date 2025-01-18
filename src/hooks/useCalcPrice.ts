import { useState } from "react";


export const useCalcPrice = (initial: number, maxQnt: number) => {
    const [counter, setCounter] = useState<number>(initial);
    const increment = () => {
        if (counter < maxQnt) {
            setCounter((prev) => prev + 1)
        }
    }

    const decrement = () => {
        if (counter > 1) {
            setCounter((prev) => prev - 1)
        }
    }

    return {
        counter,
        setCounter,
        increment,
        decrement
    }
}