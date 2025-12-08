import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Divider,
    Button,
    Typography,
    AppBar,
    Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { LoginModal } from '../../molecules/LoginModal/LoginModal';

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
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const handleDrawerToggle = () => {
        const newState = !drawerOpen;
        setDrawerOpen(newState);
        onDrawerStateChange?.(newState);
    };

    const handleOpenLoginModal = () => {
        setLoginModalOpen(true);
    };

    const handleCloseLoginModal = () => {
        setLoginModalOpen(false);
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    p: 2.5,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: 64,
                }}
            >
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    Navigation
                </Typography>
                <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                    aria-label="close drawer"
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List sx={{ flex: 1, pt: 1.5, pb: 1 }}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.path} disablePadding sx={{ mb: 0.5, px: 1.5 }}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={isActive}
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: isActive ? 'primary.main' : 'transparent',
                                    color: isActive ? 'white' : 'text.primary',
                                    py: 1.25,
                                    '&:hover': {
                                        backgroundColor: isActive ? 'primary.dark' : 'action.hover',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        },
                                    },
                                }}
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
            <Box sx={{ p: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleOpenLoginModal}
                    sx={{
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: 2,
                        '&:hover': {
                            boxShadow: 4,
                        },
                    }}
                >
                    로그인
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
                    ml: drawerOpen ? `${DRAWER_WIDTH}px` : 0,
                    transition: (theme) =>
                        theme.transitions.create(['width', 'margin'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    backgroundColor: 'white',
                    color: 'text.primary',
                    boxShadow: 1,
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Directional 2025
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                open={drawerOpen}
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        borderRight: '1px solid',
                        borderColor: 'divider',
                        position: 'relative',
                    },
                }}
            >
                {drawer}
            </Drawer>
            <LoginModal open={loginModalOpen} onClose={handleCloseLoginModal}>
                <Box sx={{ minHeight: 200 }}>
                </Box>
            </LoginModal>
        </>
    );
};
