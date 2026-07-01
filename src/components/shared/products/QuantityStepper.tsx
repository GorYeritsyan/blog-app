"use client";

import {Button} from "@/components/shadcn/button";

type QuantityStepperProps = {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    disabled?: boolean;
}

export default function QuantityStepper({
    quantity,
    onIncrement,
    onDecrement,
    disabled
}: QuantityStepperProps) {
    return (
        <div className="flex items-center gap-3">
            {/*Decrement button*/}
            <Button
                disabled={disabled || quantity <= 1}
                onClick={onDecrement}
                className="flex items-center justify-center"
                size="icon-xs"
                variant="outline"
            >
                -
            </Button>

            {/*Quantity*/}
            <span className="">
                {quantity}
            </span>

            {/*Increment button*/}
            <Button
                disabled={disabled}
                onClick={onIncrement}
                className="flex items-center justify-center"
                size="icon-xs"
                variant="outline"
            >
                +
            </Button>
        </div>
    );
}