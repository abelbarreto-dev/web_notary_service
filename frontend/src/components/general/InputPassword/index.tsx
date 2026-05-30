import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputPasswordProps = {
    labelText: string;
    placeHolder?: string;
};

export const InputPassword = ({
    labelText,
    placeHolder,
}: InputPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const userId = `input-text-${useId()}`;

    return (
        <div className="flex flex-col gap-2 w-full max-w-sm">
            <label className={"font-light text-[13px]"} htmlFor={userId}>
                {labelText}
            </label>
            <div className="relative">
                <input
                    id={userId}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeHolder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );
};
