import { Button } from '@/components/ui/button'
import { SimplePopover } from '@/components/ui/simple-popover'
import React, { useEffect, useState } from 'react'

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

export interface MonthYearPickerProps {
    value: string
    onChange: (value: string) => void
    label?: string
    disabled?: boolean
}

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
    value,
    onChange,
    label,
    disabled
}) => {
    const [open, setOpen] = useState(false)
    const [year, setYear] = useState(() => {
        const y = value.split('-')[0]
        return y ? Number(y) : new Date().getFullYear()
    })
    const selectedMonth = value.split('-')[1]

    useEffect(() => {
        if (disabled && open) setOpen(false)
    }, [disabled, open])

    return (
        <div>
            {label && (
                <label className="block mb-1 text-sm font-medium">
                    {label}
                </label>
            )}
            <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => !disabled && setOpen(true)}
                disabled={disabled}
                type="button"
            >
                {value
                    ? `${months[Number(selectedMonth) - 1]} ${year}`
                    : 'Select month and year'}
            </Button>
            <SimplePopover open={open} onClose={() => setOpen(false)}>
                <div className="p-4 w-64">
                    <div className="flex items-center justify-between mb-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setYear((y) => y - 1)}
                        >
                            &lt;
                        </Button>
                        <span className="font-semibold text-lg">{year}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setYear((y) => y + 1)}
                        >
                            &gt;
                        </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                        {months.map((m, i) => (
                            <Button
                                key={m}
                                variant={
                                    selectedMonth ===
                                    String(i + 1).padStart(2, '0')
                                        ? 'secondary'
                                        : 'outline'
                                }
                                size="sm"
                                className="w-full"
                                onClick={() => {
                                    onChange(
                                        `${year}-${String(i + 1).padStart(
                                            2,
                                            '0'
                                        )}`
                                    )
                                    setOpen(false)
                                }}
                            >
                                {m}
                            </Button>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs">
                        <Button
                            variant="link"
                            size="sm"
                            onClick={() => {
                                onChange('')
                                setOpen(false)
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            variant="link"
                            size="sm"
                            onClick={() => {
                                const now = new Date()
                                onChange(
                                    `${now.getFullYear()}-${String(
                                        now.getMonth() + 1
                                    ).padStart(2, '0')}`
                                )
                                setOpen(false)
                            }}
                        >
                            This month
                        </Button>
                    </div>
                </div>
            </SimplePopover>
        </div>
    )
}
