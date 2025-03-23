
export const FlyingBee = () => {
    return (
        <video
            width="100"
            height="100"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Video player">
            <source src="https://res.cloudinary.com/dmrsemgsn/video/upload/v1739910465/flyBee-WebM_ixowa7.webm" type="video/webm" />
            <source src="https://res.cloudinary.com/dmrsemgsn/video/upload/v1739910465/flyBee-MP4_bhgufb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}