import { GlassMagnifier } from "react-image-magnifiers";

export const MagnifierImg = ({ imageSrc, alt }: { imageSrc: string, alt: string }) => {
    return (

        <GlassMagnifier
            imageSrc={imageSrc}
            imageAlt={alt}
            magnifierSize="70%"
            magnifierBorderSize={5}
            allowOverflow={true}
            style={{ width: "80%", height: "80%" }}
            largeImageSrc={imageSrc}
            magnifierBorderColor="rgba(255, 255, 255, 0.5)"

        />
    )
}