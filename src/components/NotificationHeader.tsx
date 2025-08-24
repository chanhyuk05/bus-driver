import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Badge, 
  IconButton, 
  Box,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  Notifications, 
  DirectionsBus, 
  VolumeUp,
  VolumeOff
} from '@mui/icons-material';

interface NotificationHeaderProps {
  unreadCount: number;
  driverInfo: {
    name: string;
    busNumber: string;
    route: string;
  };
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  driverInfo,
  soundEnabled,
  onSoundToggle
}) => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
      <Toolbar>
        <DirectionsBus sx={{ mr: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            버스 기사 알림 시스템
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {driverInfo.name} • {driverInfo.busNumber} • {driverInfo.route}
          </Typography>
        </Box>
        
        <FormControlLabel
          control={
            <Switch 
              checked={soundEnabled} 
              onChange={onSoundToggle}
              color="default"
            />
          }
          label={
            <Box display="flex" alignItems="center">
              {soundEnabled ? <VolumeUp /> : <VolumeOff />}
            </Box>
          }
          sx={{ mr: 2, color: 'white' }}
        />
        
        <Badge badgeContent={unreadCount} color="error">
          <Notifications />
        </Badge>
      </Toolbar>
    </AppBar>
  );
};

export default NotificationHeader;
