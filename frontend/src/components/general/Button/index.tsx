type ButtonProps = {
    labelButton: string;
    type: "submit" | "button";
    ariaLabel?: string;
    color: "primary" | "warning" | "danger";
};

const colors = {
    primary: "bg-blue-500 hover:brightness-85 text-white",
    warning: "bg-yellow-500 hover:brightness-85 text-black",
    danger: "bg-red-500 hover:brightness-85 text-white",
};

export const Button = ({
    labelButton,
    type,
    ariaLabel,
    color,
}: ButtonProps) => {
    return (
        <button
            type={type}
            aria-label={ariaLabel}
            className={`cursor-pointer rounded-lg focus:outline-none ${colors[color]} px-3 py-2 disabled:bg-slate-400 disabled:hover:brightness-100`}
            disabled={false}
        >
            {labelButton}
        </button>
    );
};
