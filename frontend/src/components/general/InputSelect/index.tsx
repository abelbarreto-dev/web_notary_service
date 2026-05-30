import { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Check } from "lucide-react";

type InputSelectProps = {
    labelText: string;
    options: string[];
}

export const InputSelect = ({ labelText, options }: InputSelectProps) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string>("");
    const ref = useRef<HTMLDivElement | null>(null);
    const id = useId();

    useEffect(() => {
        function handleClickOutside(e: any) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col gap-2 w-full max-w-sm" ref={ref}>
            <label htmlFor={id} className="text-sm font-light">
                {labelText}
            </label>

            <button
                id={id}
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 flex justify-between items-center
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
        <span className={selected ? "text-black" : "text-gray-400"}>
          {selected || "Escolha uma opção"}
        </span>
                <ChevronDown size={18} />
            </button>

            {open && (
                <div className="border border-gray-200 rounded-lg shadow-md bg-white mt-1">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => {
                                setSelected(option);
                                setOpen(false);
                            }}
                            className="px-3 py-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                        >
                            {option}
                            {selected === option && <Check size={16} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
