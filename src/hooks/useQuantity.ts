"use client";

import { useState } from "react";

export const useQuantity = () => {
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    }

    const decrementQuantity = () => {
        if (quantity <= 1) return;
        setQuantity(prev => prev - 1);
    }

    return { quantity, incrementQuantity, decrementQuantity };
}