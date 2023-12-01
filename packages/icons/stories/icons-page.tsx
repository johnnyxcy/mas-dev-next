/*
 * File: @mas/icons/stories/icons-page.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/23/2023 05:50 pm
 *
 * Last Modified: 12/01/2023 10:47 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import React from "react";

export type FontSizeOptions = [12, 16, 20, 24, 28, 48][number];

const IconsPage: React.FC<{ size?: FontSizeOptions; children: React.ReactNode }> = ({
    size = 16,
    children = undefined,
}) => {
    return (
        <>
            <style type="text/css">
                {`
            .icon .inner span, .icon .inner::before  {
                font-size: ${size}px;
            }
            `}
            </style>
            <style type="text/css">
                {`
                .icons-page {
                    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
                    margin: 0;
                    padding: 40px 20px;
                    text-align: center;
                    background-color: #f8f8f8;
                }

                .search-container {
                    position: sticky;
                    top: 40px;
                    width: 100%;
                    z-index: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .icons-container {
                    padding-top: 60px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .icon {
                    display: inline-block;
                    margin: 8px;
                    width: 100px;
                }

                .icon:hover {
                    cursor: pointer;
                }

                .icon:hover .inner {
                    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.24);
                }

                .icon .inner {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    background-color: white;
                    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06);
                    border-radius: 4px;
                    transition: all .3s ease-in-out;
                }

                .icon .inner span, .icon .inner::before {
                    overflow: hidden;
                }

                .label {
                    margin-top: 8px;
                    display: inline-block;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 4px;
                    font-size: 10px;
                    color: #666;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .search {
                    display: flex;
                    width: 100%;
                    font-size: 16px;
                    padding: 12px 16px;
                    margin: 0 auto;
                    max-width: 900px;
                    border: 1px solid rgba(0,0,0,.1);
                    border-radius: 8px;
                    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06);
                }

                .search:focus {
                    outline: none !important;
                    border-color: #18a0fb;
                }

                #notification {
                    position: fixed;
                    margin: auto;
                    bottom: 40px;
                    left: 50%;
                    width: auto;
                    transform: translateX(-50%);
                    color: white;
                    background-color: #212121;
                    padding: 8px 24px;
                    border-radius: 8px;
                    opacity: 0;
                    transition: opacity .3s ease-in-out;
                    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
                }

                #notification-id {
                    font-weight: bold;
                }

                #notification.show{
                    opacity: .9;
                }`}
            </style>
            <div className="icons-page">
                <div className="search-container">
                    <input
                        type="text"
                        className="search"
                        placeholder="🔍 Search for icon names"
                        onChange={(e) => {
                            const value = e.target.value;
                            const filter = value.toUpperCase();
                            const wrapper = document.querySelectorAll(".icons-container");
                            if (!wrapper) {
                                return;
                            }
                            const icons = wrapper[0].querySelectorAll<HTMLDivElement>(".icon");

                            for (let i = 0; i < icons.length; i++) {
                                const iconName = icons[i].getAttribute("data-name");
                                if (iconName && iconName.toUpperCase().includes(filter)) {
                                    icons[i].style.display = "";
                                } else {
                                    icons[i].style.display = "none";
                                }
                            }
                        }}
                    />
                </div>
                <div id="notification">
                    📋 Copied: <span id="notification-id"></span>
                </div>

                <div className="icons-container">{children}</div>
            </div>
        </>
    );
};

export default IconsPage;
