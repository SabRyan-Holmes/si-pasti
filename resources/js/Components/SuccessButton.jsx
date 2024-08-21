export default function SuccessButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `${className} inline-flex glass items-center px-4 py-2 bg-hijau border border-transparent rounded-md font-semibold text-xs text-white uppercase
                tracking-widest hover:hijau/80 focus:hijau/80 active:bg-hijau/90 focus:outline-none focus:ring-2 focus:ring-hijau focus:ring-offset-2 hover:scale-105 transform-origin: left;
                transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                }`
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
