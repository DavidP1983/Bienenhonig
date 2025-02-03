
import { LocationFooter } from "@/components/UI/footer/LocationFooter";
import { LayoutProps } from "../layout";
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';


const Location = ({ children }: LayoutProps) => {
    return (
        <div id="__subNext">
            <MantineProvider>
                {children}
            </MantineProvider>
            <LocationFooter />
        </div>
    );
}

export default Location;