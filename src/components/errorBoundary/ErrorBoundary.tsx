import { Component } from "react";
import { ErrorComponent } from "../UI/error/ErrorComponent";
import { Buttons } from "../UI/button/Buttons";

import classes from '@/styles/Error.module.scss';

interface Props {
    children?: React.ReactNode
}

class ErrorBoundary extends Component<Props> {

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({ error: true });
    }

    render() {

        const errorMessage = this.state.error
            ?
            <div className={classes.error}>
                <ErrorComponent />
                <Buttons
                    props={{
                        type: 'primary',
                        style: { display: 'block', margin: '10px auto' },
                        onClick: () => this.setState({ error: false })
                    }} >
                    Try again
                </Buttons>
            </div>
            :
            this.props.children;
        return (
            <>
                {errorMessage}
            </>
        )
    }
}

export default ErrorBoundary;