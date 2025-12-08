import React, { useState } from 'react';
import { Box, Typography, Popover } from '@mui/material';
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
        <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {items.map((item) => (
                <Box
                    key={item.name}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        p: 0.5
                    }}
                >
                    <Box
                        sx={{
                            width: 14,
                            height: 14,
                            backgroundColor: item.color,
                            border: '1px solid',
                            borderColor: 'divider',
                            cursor: 'pointer',
                            opacity: item.visible ? 1 : 0.3,
                            position: 'relative'
                        }}
                        onClick={(e) => handleColorClick(e, item.name)}
                    />
                    <Typography
                        variant="caption"
                        sx={{
                            cursor: 'pointer',
                            opacity: item.visible ? 1 : 0.3,
                            textDecoration: item.visible ? 'none' : 'line-through',
                            fontSize: '0.75rem'
                        }}
                        onClick={() => onToggle(item.name)}
                    >
                        {item.name}
                    </Typography>
                </Box>
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
                <Box sx={{ p: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap', width: 150 }}>
                    {/* Predefined colors for quick selection */}
                    {[
                        '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
                        '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
                        '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'
                    ].map((color) => (
                        <Box
                            key={color}
                            sx={{
                                width: 20,
                                height: 20,
                                backgroundColor: color,
                                border: '1px solid #ccc',
                                cursor: 'pointer',
                                '&:hover': { transform: 'scale(1.1)' }
                            }}
                            onClick={() => handleColorSelect(color)}
                        />
                    ))}
                    {/* Native Color Input for custom colors */}
                    <Box sx={{ width: '100%', mt: 0.5 }}>
                        <input
                            type="color"
                            style={{ width: '100%', height: '30px', cursor: 'pointer' }}
                            onChange={(e) => handleColorSelect(e.target.value)}
                        />
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
};
