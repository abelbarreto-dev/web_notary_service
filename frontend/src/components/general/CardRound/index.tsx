type CardRoundProps = {
    children?: React.ReactNode;
};

export const CardRound = ({ children }: CardRoundProps) => {
    return (
        <div
            className={
                "bg-slate-100 rounded-3xl w-full h-fit sm:w-1/2 md:w-1/3 lg:w-1/4 text-black p-4"
            }
        >
            {children}
        </div>
    );
};
