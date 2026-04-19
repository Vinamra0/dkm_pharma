"use client";

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TagInputProps {
    label?: string
    error?: string
    value: string[]
    onChange: (tags: string[]) => void
    placeholder?: string
    className?: string
}

export function TagInput({
    label,
    error,
    value = [],
    onChange,
    placeholder = "Type and press Enter to add",
    className
}: TagInputProps) {
    const [inputValue, setInputValue] = React.useState("")

    const addTokens = (rawInput: string) => {
        const tokens = rawInput
            .split(/[,\n]+/)
            .map((token) => token.trim())
            .filter(Boolean)

        if (tokens.length === 0) return

        const existing = new Set(value)
        const next = [...value]

        for (const token of tokens) {
            if (!existing.has(token)) {
                existing.add(token)
                next.push(token)
            }
        }

        if (next.length !== value.length) {
            onChange(next)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === 'Tab' || e.key === ',') && inputValue.trim()) {
            e.preventDefault()
            addTokens(inputValue)
            setInputValue("")
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            onChange(value.slice(0, -1))
        }
    }

    const handleBlur = () => {
        if (!inputValue.trim()) return
        addTokens(inputValue)
        setInputValue("")
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedText = e.clipboardData.getData('text')
        if (!pastedText.includes(',') && !pastedText.includes('\n')) return

        e.preventDefault()
        addTokens(pastedText)
        setInputValue("")
    }

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove))
    }

    return (
        <div className={cn("w-full", className)}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    {label}
                </label>
            )}
            <div
                className={cn(
                    "flex flex-wrap gap-2 min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2",
                    "focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent",
                    "transition-all duration-200",
                    error && "border-red-500 focus-within:ring-red-500"
                )}
            >
                {value.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 text-sm font-medium"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    onPaste={handlePaste}
                    placeholder={value.length === 0 ? placeholder : ""}
                    className="flex-1 min-w-[120px] outline-none text-sm placeholder:text-slate-400"
                />
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}
