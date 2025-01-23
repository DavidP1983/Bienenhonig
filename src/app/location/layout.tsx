
import { LocationFooter } from "@/components/UI/footer/LocationFooter";
import { ArrowUp } from "@/components/UI/arrowup/ArrowUp";
import { LayoutProps } from "../layout";


const Location = ({ children }: LayoutProps) => {
    return (
        <div id="__subNext">
            {children}
            <LocationFooter />
            <ArrowUp />
        </div>
    );
}

export default Location;