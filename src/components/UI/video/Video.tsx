
export const Video = () => {
    return (
        <video
            width="320"
            height="240"
            controls
            preload="none"
            muted
            poster="https://res.cloudinary.com/dmrsemgsn/image/upload/v1733840603/clover_zly6yr.jpg"
            playsInline
            aria-label="Video player">
            <source src="https://res.cloudinary.com/dmrsemgsn/video/upload/v1733830323/Erkrath-video_ipkwp4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}