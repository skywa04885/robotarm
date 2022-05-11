import {
  ExpandLess,
  ExpandMore,
  PanTool,
  PrecisionManufacturing,
  Sensors,
} from '@mui/icons-material';
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
} from '@mui/material';
import { useMemo, useState } from 'react';

export interface GripperControlProps {
  grab: boolean;
  onGrabChanged: (value: boolean) => void;
  detected: boolean;
  label: string;
}

export const GripperControl = ({
  grab,
  onGrabChanged,
  detected,
  label,
}: GripperControlProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ListItemButton
        onClick={() => {
          setOpen((open) => !open);
        }}
      >
        <ListItemIcon>
          <PrecisionManufacturing />
        </ListItemIcon>
        <ListItemText primary={label} secondary="Gripper" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper elevation={1} square>
          <List component="div" disablePadding>
            <ListItem>
              <ListItemIcon>
                <PanTool />
              </ListItemIcon>
              <ListItemText>{grab ? 'Grabbed' : 'Released'}</ListItemText>
              <Switch
                checked={grab}
                onChange={(_event: any, newValue: any) =>
                  onGrabChanged(newValue as boolean)
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Sensors />
              </ListItemIcon>
              <ListItemText>Object Detected</ListItemText>
              <Checkbox disabled checked={detected} />
            </ListItem>
          </List>
        </Paper>
      </Collapse>
    </>
  );
};
