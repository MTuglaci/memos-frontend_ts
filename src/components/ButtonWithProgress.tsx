import React from "react";

interface IProp {
    disabled: boolean;
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    pendingApiCall: boolean;
}

export const ButtonWithProgress: React.FC<IProp> = ({ disabled, label, onClick, pendingApiCall }: IProp): JSX.Element => {
    return (
        <button
            className="btn btn-lg btn-primary btn-block text-center"
            type="submit"
            onClick={onClick}
            disabled={disabled}
        >
            {label}
            {pendingApiCall && <span className="spinner-grow spinner-grow-sm"></span>}
        </button>
    );
}