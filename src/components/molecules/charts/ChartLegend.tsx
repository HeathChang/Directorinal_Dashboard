import React, { useState } from 'react';
import { Typography, Popover } from '@mui/material';
import type { iLegendItem } from '../../../types/chart.type';

interface ChartLegendProps {
    items: iLegendItem[];
    onToggle: (name: string) => void;
    onColorChange: (name: string, color: string) => void;
}

export const ChartLegend: React.FC<ChartLegendProps> = ({ items, onToggle, onColorChange }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeColorItem, setActiveColorItem] = useState<string | null>(null);

    const handleColorClick = (event: React.MouseEvent<HTMLElement>, name: string) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setActiveColorItem(name);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setActiveColorItem(null);
    };

    const handleColorSelect = (color: string) => {
        if (activeColorItem) {
            onColorChange(activeColorItem, color);
        }
        handleClose();
    };

    const open = Boolean(anchorEl);

    return (
        <div className="mt-3 flex flex-wrap gap-1">
            {items.map((item) => (
                <div
                    key={item.name}
                    className="flex items-center gap-1 p-0.5"
                >
                    <div
                        className="w-[14px] h-[14px] border border-gray-300 cursor-pointer relative"
                        style={{
                            backgroundColor: item.color,
                            opacity: item.visible ? 1 : 0.3,
                        }}
                        onClick={(e) => handleColorClick(e, item.name)}
                    />
                    <Typography
                        variant="caption"
                        className={`cursor-pointer text-xs ${
                            item.visible ? 'opacity-100 no-underline' : 'opacity-30 line-through'
                        }`}
                        onClick={() => onToggle(item.name)}
                    >
                        {item.name}
                    </Typography>
                </div>
            ))}

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className="p-2 flex gap-1 flex-wrap w-[150px]">
                    {/* Predefined colors for quick selection */}
                    {[
                        '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
                        '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
                        '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'
                    ].map((color) => (
                        <div
                            key={color}
                            className="w-5 h-5 border border-gray-400 cursor-pointer hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorSelect(color)}
                        />
                    ))}
                    {/* Native Color Input for custom colors */}
                    <div className="w-full mt-1">
                        <input
                            type="color"
                            className="w-full h-[30px] cursor-pointer"
                            onChange={(e) => handleColorSelect(e.target.value)}
                        />
                    </div>
                </div>
            </Popover>
        </div>
    );
};
