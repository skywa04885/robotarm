import {
  Button,
  ButtonGroup,
  Divider,
  List,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import _ from 'lodash';
import { useState } from 'react';
import { Box } from '@mui/system';
import {
  JointWithAngle,
  JointWithAngleType,
} from './control/JointWithAngle.component';
import { GripperControl } from './control/GripperControl.component';
import { Calculate, Home } from '@mui/icons-material';
import { Preview } from './Preview.component';

export const Control = ({}): any => {
  const [joint0Value, setJoint0Value] = useState<number>(0);
  const [joint0Enabled, setJoint0Enabled] = useState<boolean>(false);

  const [gripperGrabbed, setGripperGrabbed] = useState<boolean>(false);

  const [endEffectorX, setEndEffectorX] = useState<string>('0');
  const [endEffectorY, setEndEffectorY] = useState<string>('0');
  const [endEffectorZ, setEndEffectorZ] = useState<string>('0');

  return (
    <Grid container>
      <Grid item xs={6}>
        <Paper
          sx={{
            height: 'calc(100vh - 56px)',
          }}
          square
        >
          <Preview />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper
          square
          elevation={3}
          sx={{
            overflow: 'auto',
            height: 'calc(100vh - 56px)',
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h3">ARM Control</Typography>
            <Typography variant="body1">
              Each change to the following values will be applied in real time
              to the robotic arm, so be careful.
            </Typography>
          </Box>
          <Divider />
          <Paper square>
            <Box padding={2}>
              <Box paddingBottom={2}>
                <Grid container columnSpacing={2} rowSpacing={0}>
                  <Grid item xs={4}>
                    <TextField
                      value={endEffectorX}
                      onChange={(e: any) => setEndEffectorX(e.target.value)}
                      type="number"
                      sx={{ width: '100%' }}
                      placeholder="X"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      sx={{ width: '100%' }}
                      onChange={(e: any) => setEndEffectorY(e.target.value)}
                      placeholder="Y"
                      value={endEffectorY}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={endEffectorZ}
                      onChange={(e: any) => setEndEffectorZ(e.target.value)}
                      sx={{ width: '100%' }}
                      placeholder="Z"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <ButtonGroup>
                  <Button
                    startIcon={<Calculate />}
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Solve
                  </Button>
                  <Button
                    startIcon={<Home />}
                    size="large"
                    variant="outlined"
                    color="primary"
                  >
                    Home
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </Paper>
          <Divider />
          <List
            sx={{
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            <GripperControl
              grab={gripperGrabbed}
              onGrabChanged={(newGrab: boolean) => setGripperGrabbed(newGrab)}
              label="End Effector"
              detected={false}
            />
            <JointWithAngle
              theta={joint0Value}
              enabled={joint0Enabled}
              onThetaChanged={(newTheta: number) => setJoint0Value(newTheta)}
              onEnabledChanged={(enabled: boolean) => setJoint0Enabled(enabled)}
              minTheta={-180}
              maxTheta={180}
              markCount={5}
              label="Joint 0"
              type={JointWithAngleType.Revolute}
            />
            <JointWithAngle
              theta={joint0Value}
              enabled={joint0Enabled}
              onThetaChanged={(newTheta: number) => setJoint0Value(newTheta)}
              onEnabledChanged={(enabled: boolean) => setJoint0Enabled(enabled)}
              minTheta={-90}
              maxTheta={90}
              markCount={5}
              label="Joint 1"
              type={JointWithAngleType.Twisting}
            />
            <JointWithAngle
              theta={joint0Value}
              enabled={joint0Enabled}
              onThetaChanged={(newTheta: number) => setJoint0Value(newTheta)}
              onEnabledChanged={(enabled: boolean) => setJoint0Enabled(enabled)}
              minTheta={0}
              maxTheta={360}
              markCount={5}
              label="Joint 2"
              type={JointWithAngleType.Rotational}
            />
            <JointWithAngle
              theta={joint0Value}
              enabled={joint0Enabled}
              onThetaChanged={(newTheta: number) => setJoint0Value(newTheta)}
              onEnabledChanged={(enabled: boolean) => setJoint0Enabled(enabled)}
              minTheta={0}
              maxTheta={360}
              markCount={5}
              label="Joint 3"
              type={JointWithAngleType.Revolute}
            />
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};
