import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { InputProps } from "../types";
import { Input as ShadcnInput } from "./ui/input";

const Input = ({ label, value, onChange, placeholder, type, isSelect, options }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className="mb-4">
            <label className="text-[13px] text-slate-800 block mb-1">
                {label}
            </label>
            <div className="relative">
                {isSelect ? (
                    <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={value as string | number}
                        onChange={(e) => onChange(e as any)}
                    >
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <div className="relative">
                        <ShadcnInput
                            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                            placeholder={placeholder}
                            value={value as string | number}
                            onChange={(e) => onChange(e as any)}
                            className={type === 'password' ? "pr-10" : ""}
                        />
                        {type === 'password' && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10 flex items-center justify-center">
                                {showPassword ? (
                                    <Eye
                                        size={20}
                                        className="text-primary hover:text-primary/80 transition-colors"
                                        onClick={toggleShowPassword}
                                    />
                                ) : (
                                    <EyeOff
                                        size={20}
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                        onClick={toggleShowPassword}
                                    />
                                )}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Input;
