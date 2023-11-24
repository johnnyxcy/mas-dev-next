/*
 * File: @mas/icons/stories/icon-button.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/23/2023 05:52 pm
 *
 * Last Modified: 11/23/2023 06:12 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

export interface IconButtonProps {
    familyClassName: string;
    iconId: string;
    label: string;
    variant?: "font" | "font-symbols";
}

export const FontIconInner: React.FC<{ className: string; label: string }> = ({ className, label }) => {
    return (
        <>
            <span className="inner">
                <span className={className} aria-hidden="true" />
            </span>
            <span className="label">{label}</span>
        </>
    );
};

export const FontSymbolIconInner: React.FC<{ familyClassName: string; label: string; iconId: string }> = ({
    familyClassName,
    label,
    iconId,
}) => {
    return (
        <>
            <span className="inner">
                <span className={familyClassName} aria-hidden="true">
                    {iconId}
                </span>
            </span>
            <span className="label">{label}</span>
        </>
    );
};

const IconButton: React.FC<IconButtonProps> = ({ familyClassName, iconId, label, variant = "font" }) => {
    const fontInnerClassName = `${familyClassName} ${iconId}`;
    return (
        <div
            className="icon"
            data-name={iconId}
            title={iconId}
            onClick={() => {
                const toCopy =
                    variant === "font"
                        ? `<span className="${fontInnerClassName}" />`
                        : `<span className="${familyClassName}">${iconId}</span>`;
                navigator.clipboard.writeText(toCopy);
                const notification = document.querySelector("#notification");
                const notificationText = document.querySelector("#notification-id");
                if (notification && notificationText) {
                    notificationText.innerHTML = iconId;
                    if (!notification.classList.contains("show")) {
                        notification.classList.add("show");
                    }
                    setTimeout(() => {
                        if (notification.classList.contains("show")) {
                            notification.classList.remove("show");
                        }
                    }, 3000);
                }
            }}
        >
            {variant === "font" ? (
                <FontIconInner className={fontInnerClassName} label={label} />
            ) : (
                <FontSymbolIconInner familyClassName={familyClassName} iconId={iconId} label={label} />
            )}
        </div>
    );
};

export default IconButton;
