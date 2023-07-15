import * as React from 'react';
import styles from './Steper.module.scss'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Typography from '@mui/material/Typography';
import { StepIconProps, StepLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { AiFillCheckCircle } from 'react-icons/ai';


interface stepsProps {
  activeStep?: number
  completed?: {
    [k: number]: boolean;
  }
  setCompleted: React.Dispatch<React.SetStateAction<{
    [k: number]: boolean;
  }>>
  steps: string[]
}

export default function StepperComponent({ activeStep = 0, completed = [], setCompleted, steps }: stepsProps) {

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#3FC1C9',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#3FC1C9',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
      ...(ownerState.active && {
        color: '#3FC1C9',
      }),
      '& .QontoStepIcon-completedIcon': {
        color: '#3FC1C9',
        zIndex: 1,
        fontSize: 18,
      },
      '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
      },
    }),
  );

  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <AiFillCheckCircle className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  return (
    <Box className={styles.stepBox}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel StepIconComponent={QontoStepIcon} >
              <Typography className={styles.fontesLabel}>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

    </Box>
  );
}