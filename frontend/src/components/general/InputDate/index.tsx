import { useId } from "react";
import { Calendar } from "lucide-react";

type DateInputProps = {
    labelText: string;
};

export const InputDate = ({ labelText }: DateInputProps) => {
    const id = useId();

    return (
        <div className="flex flex-col gap-2 w-full max-w-sm">
            <label htmlFor={id} className="text-sm font-light">
                {labelText}
            </label>

            <div className="relative">
                <input
                    id={id}
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <Calendar
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
            </div>
        </div>
    );
};
