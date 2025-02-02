import Magnifier from "react18-image-magnifier";


export const MagnifierImg = ({ imageSrc }: { imageSrc: string }) => {
    return (
        <Magnifier
            {...({
                src: imageSrc,
                zoomImgSrc: imageSrc,
                alt: "image presentation",
                mgShape: "circle",
                mgBorderWidth: 2,
                mgWidth: 200,
                mgHeight: 200,
                zoomFactor: 1.5,
                width: "60%",
                mgShowOverflow: true
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)}
        />
    )
}