import { LocationFooter } from "@/components/UI/footer/LocationFooter";
import { LayoutProps } from "../layout";
import { ArrowUp } from "@/components/UI/arrowup/ArrowUp";



const Location = ({ children }: LayoutProps) => {
    return (
        <div id='__subNext'>
            {children}
            <LocationFooter />
            <ArrowUp />
        </div>
    );
}

export default Location;