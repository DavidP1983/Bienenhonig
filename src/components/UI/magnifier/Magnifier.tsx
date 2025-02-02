import Magnifier from "react18-image-magnifier";


export const MagnifierImg = ({ imageSrc }: { imageSrc: string }) => {
    return (
        <Magnifier
            src={imageSrc}
            alt="image presentation"
            mgShape="circle"
            mgBorderWidth={2}
            mgWidth={200}
            mgHeight={200}
            zoomFactor={1.5}
            zoomImgSrc={imageSrc}
            width="60%"
            mgShowOverflow={true}
        />
    )
}