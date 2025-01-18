import { LocationFooter } from "@/components/UI/footer/LocationFooter";
import { LayoutProps } from "../layout";



const Location = ({ children }: LayoutProps) => {
    return (
        <div id='__subNext'>
            {children}
            <LocationFooter />
        </div>
    );
}

export default Location;