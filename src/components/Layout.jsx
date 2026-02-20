import React, { useState } from 'react';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
    CssBaseline,
    Avatar,
    Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const Layout = ({ children, sections, onNavigate, personalInfo, currentTheme, onThemeChange, themes, themeStyles }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const themeIcons = [
        { key: 'default', domain: null, label: 'Default' },
        { key: 'google', domain: 'google.com', label: 'Google' },
        { key: 'elastic', domain: 'elastic.co', label: 'Elastic' },
        { key: 'tinybird', domain: 'tinybird.co', label: 'Tinybird' },
        { key: 'clickhouse', domain: 'clickhouse.com', label: 'ClickHouse' },
        { key: 'revenuecat', domain: 'revenuecat.com', label: 'RevenueCat' },
    ];

    const drawerContent = (
        <Box sx={{ p: 2 }}>
            {personalInfo && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3, mt: 2 }}>
                    <Avatar
                        alt={personalInfo.name}
                        src={personalInfo.photo}
                        sx={{ width: 100, height: 100, mb: 2, border: `4px solid ${theme.palette.primary.main}` }}
                    />
                    <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {personalInfo.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                        {personalInfo.title}
                    </Typography>
                </Box>
            )}

            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, pl: 2 }}>
                Navigation
            </Typography>
            <List>
                {sections.map((section) => (
                    <ListItem
                        button="true"
                        key={section.id}
                        onClick={() => {
                            onNavigate(section.id);
                            if (isMobile) setMobileOpen(false);
                        }}
                    >
                        <ListItemText
                            primary={section.label}
                            slotProps={{
                                primary: {
                                    color: theme.palette.text?.third || 'inherit',
                                }
                            }}
                        />
                    </ListItem>
                ))}
            </List>

            <Box sx={{ mt: 4, px: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Pick a Style
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {themeIcons.map((t) => {
                        const imgSrc = themes?.[t.key]?.styles?.image;
                        return (
                            <Tooltip key={t.key} title={t.label}>
                                <IconButton
                                    onClick={() => onThemeChange(t.key)}
                                    sx={{
                                        p: 0.5,
                                        border: currentTheme === t.key ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent'
                                    }}
                                >
                                    {!imgSrc ? (
                                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#eee' }}>
                                            <HomeIcon sx={{ color: '#666', fontSize: 20 }} />
                                        </Avatar>
                                    ) : (
                                        <Avatar
                                            src={imgSrc}
                                            alt={t.label}
                                            sx={{ width: 32, height: 32, bgcolor: '#fff' }}
                                        />
                                    )}
                                </IconButton>
                            </Tooltip>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Mobile AppBar */}
            {isMobile && (
                <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            About Me
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    mt: isMobile ? 8 : 0,
                    bgcolor: theme.palette.background.default,
                    minHeight: '100vh'
                }}
            >
                {children}
            </Box>

            {/* Right Drawer */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* Mobile Drawer (Temporary) */}
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    slotProps={{
                        sx: {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: themeStyles?.menuBackground,
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                        <IconButton onClick={handleDrawerToggle}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {drawerContent}
                </Drawer>

                {/* Desktop Drawer (Permanent) */}
                <Drawer
                    variant="permanent"
                    anchor="right"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                    }}
                    PaperProps={{
                        sx: {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: themeStyles?.menuBackground,
                        }
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>
        </Box>
    );
};

export default Layout;
