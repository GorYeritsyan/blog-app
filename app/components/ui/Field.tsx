import { cloneElement } from "react";

export default function Field({ children, label, name, errors }) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="font-medium">{label}</label>
            {/*TODO: check with Sargis*/}
            {cloneElement(children, { name, errors })}
            {errors?.[name] && <p className="text-red-500 font-medium text-sm">{errors?.[name]}</p>}
        </div>
    )
}

