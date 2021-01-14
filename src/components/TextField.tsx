import React from "react";

interface Prop {
    name?: string
    type?: string;
    className?: string;
    label: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (event: React.FormEvent<HTMLInputElement>) => void;
    error?: string;
}

export const TextField: React.FC<Prop> = ({ name, type = "text", className = "form-control", label, value, onChange, onSubmit, error }: Prop): JSX.Element => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                className={error ? className +" is-invalid" : className}
                placeholder={label}
                value={value}
                onChange={onChange}
                onSubmit={onSubmit}
            />
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    );
}