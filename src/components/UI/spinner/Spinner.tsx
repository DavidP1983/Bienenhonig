
export const Spinner = () => {
    return (
        <div style={{ position: 'relative', zIndex: 2 }}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.0" width="100px" height="100px" viewBox="0 0 128 128" xmlSpace="preserve" > <g><circle cx="16" cy="64" r="16" fill="#1429d8" /> <circle cx="16" cy="64" r="16" fill="#6270e5" transform="rotate(45,64,64)" /> <circle cx="16" cy="64" r="16" fill="#9ca5ef" transform="rotate(90,64,64)" /> <circle cx="16" cy="64" r="16" fill="#d0d4f7" transform="rotate(135,64,64)" /> <circle cx="16" cy="64" r="16" fill="#e3e6fa" transform="rotate(180,64,64)" /> <circle cx="16" cy="64" r="16" fill="#e3e6fa" transform="rotate(225,64,64)" /> <circle cx="16" cy="64" r="16" fill="#e3e6fa" transform="rotate(270,64,64)" /> <circle cx="16" cy="64" r="16" fill="#e3e6fa" transform="rotate(315,64,64)" /> <animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite" > </animateTransform></g > </svg>
        </div>
    );
}