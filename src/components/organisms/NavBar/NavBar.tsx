import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Divider,
    Button,
    AppBar,
    Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface NavItem {
    path: string;
    label: string;
}

interface NavBarProps {
    navItems: NavItem[];
    onDrawerStateChange?: (isOpen: boolean) => void;
}

const DRAWER_WIDTH = 280;

export const NavBar = ({ navItems, onDrawerStateChange }: NavBarProps) => {
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(true);

    const handleDrawerToggle = () => {
        const newState = !drawerOpen;
        setDrawerOpen(newState);
        onDrawerStateChange?.(newState);
    };

    const drawer = (
        <div className="h-full flex flex-col">
            <div className="p-5 bg-primary-600 text-white flex items-center justify-between min-h-[64px]">
                <h6 className="font-semibold text-lg">Navigation</h6>
                <IconButton
                    onClick={handleDrawerToggle}
                    className="text-white hover:bg-white/10"
                    aria-label="close drawer"
                >
                    <CloseIcon />
                </IconButton>
            </div>
            <Divider />
            <List className="flex-1 pt-3 pb-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.path} disablePadding className="mb-1 px-3">
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={isActive}
                                className={`rounded-lg py-2.5 ${
                                    isActive
                                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                                        : 'bg-transparent text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 500,
                                        fontSize: '0.95rem',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Divider />
            <div className="p-4">
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="py-3 rounded-lg normal-case font-semibold shadow-md hover:shadow-lg"
                >
                    로그인
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <AppBar
                position="fixed"
                className="bg-white text-gray-900 shadow-sm transition-all duration-300"
                style={{
                    width: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
                    marginLeft: drawerOpen ? `${DRAWER_WIDTH}px` : 0,
                    zIndex: 1201,
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className="mr-4"
                    >
                        <MenuIcon />
                    </IconButton>
                    <h6 className="text-lg font-medium flex-grow whitespace-nowrap">Directional 2025</h6>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                open={drawerOpen}
                PaperProps={{
                    className: 'w-[280px] shrink-0 box-border border-r border-gray-200 relative',
                    style: {
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};
