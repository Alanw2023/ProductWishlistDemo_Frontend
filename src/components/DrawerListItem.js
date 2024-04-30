import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useTheme} from '@mui/material/styles';
import * as React from "react";

export default function DrawerListItem({title, isActive, open, children, onClick}) {
    const theme = useTheme();

    return (
        <ListItemButton
            onClick={onClick}
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <ListItemIcon>
                {children}
            </ListItemIcon>
            <ListItemText primary={title}
                          sx={{
                              color: isActive ? theme.palette.primary.main : "",
                              flex: 1, // ensure it takes up the remaining space
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: open ? 'normal' : ''
                          }}
            />
        </ListItemButton>
    )
}
