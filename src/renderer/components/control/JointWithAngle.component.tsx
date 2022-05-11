import {
  ExpandLess,
  ExpandMore,
  Power,
  PrecisionManufacturing,
  ThreeSixty,
} from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Slider,
  Switch,
} from '@mui/material';
import { useMemo, useState } from 'react';

export enum JointWithAngleType {
  Twisting = 'Twisting',
  Revolute = 'Revolute',
  Rotational = 'Rotational',
}

export interface JointWithAngleProps {
  enabled: boolean;
  onEnabledChanged: (value: boolean) => void;
  theta: number;
  onThetaChanged: (theta: number) => void;
  markCount: number;
  minTheta: number;
  maxTheta: number;
  label: string;
  type: JointWithAngleType;
}

export const JointWithAngle = ({
  enabled,
  onEnabledChanged,
  theta,
  onThetaChanged,
  markCount,
  minTheta,
  maxTheta,
  label,
  type,
}: JointWithAngleProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const MARKS: { value: number; label: string }[] = useMemo(() => {
    let result: { value: number; label: string }[] = [];

    for (let i: number = 0; i <= markCount; ++i) {
      const partitionSize: number = (maxTheta - minTheta) / markCount;
      const currentMarkTheta: number = minTheta + i * partitionSize;

      result.push({
        label: `${currentMarkTheta}°`,
        value: currentMarkTheta,
      });
    }

    return result;
  }, [markCount, minTheta, maxTheta]);

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
        <ListItemText primary={label} secondary={type} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper elevation={1} square>
          <List component="div" disablePadding>
            <ListItem>
              <ListItemIcon>
                <ThreeSixty />
              </ListItemIcon>
              <Slider
                min={minTheta}
                max={maxTheta}
                value={theta}
                onChange={(_event: any, newValue: any) => {
                  onThetaChanged(newValue as number);
                }}
                marks={MARKS}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Power />
              </ListItemIcon>
              <ListItemText>{enabled ? 'Enabled' : 'Disabled'}</ListItemText>
              <Switch
                checked={enabled}
                onChange={(_event: any, newValue: any) => {
                  onEnabledChanged(newValue as boolean);
                }}
              />
            </ListItem>
          </List>
        </Paper>
      </Collapse>
    </>
  );
};
