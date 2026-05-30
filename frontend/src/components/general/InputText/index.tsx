import { useId } from "react";

type InputTextProps = {
    labelText: string;
    placeHolder?: string;
};

export const InputText = ({ labelText, placeHolder }: InputTextProps) => {
    const userId = `input-text-${useId()}`;

    return (
        <div className={"flex flex-col gap-2 w-full max-w-sm"}>
            <label className={"font-light text-[13px]"} htmlFor={userId}>
                {labelText}
            </label>
            <input
                id={userId}
                placeholder={placeHolder}
                className={
                    "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
                type={"text"}
            />
        </div>
    );
};
