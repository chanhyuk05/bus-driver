import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Alert,
  Snackbar
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NotificationHeader from './components/NotificationHeader';
import NotificationCard from './components/NotificationCard';
import { CallNotification } from './types';
import { mockNotifications, generateRandomNotification } from './data/mockNotifications';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [notifications, setNotifications] = useState<CallNotification[]>(mockNotifications);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showNewNotificationAlert, setShowNewNotificationAlert] = useState(false);

  const driverInfo = {
    name: '김기사',
    busNumber: '서울70사1234',
    route: '150번 (강남역 ↔ 숙대입구)'
  };

  // 알림음 재생 함수
  const playNotificationSound = () => {
    if (soundEnabled) {
      // 웹 API의 Audio를 사용하여 시스템 알림음 재생
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEeBkOR3fP');
      audio.play().catch(console.log); // 사용자 상호작용 없이는 재생되지 않을 수 있음
    }
  };

  // 새로운 알림 시뮬레이션 (10초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = generateRandomNotification();
      setNotifications(prev => [newNotification, ...prev]);
      playNotificationSound();
      setShowNewNotificationAlert(true);
    }, 10000); // 10초마다 새 알림

    return () => clearInterval(interval);
  }, [soundEnabled]);



  // 사운드 토글
  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
  };







  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <NotificationHeader
          unreadCount={0}
          driverInfo={driverInfo}
          soundEnabled={soundEnabled}
          onSoundToggle={handleSoundToggle}
        />

        <Container maxWidth="md" sx={{ pt: 3, pb: 3 }}>


          {notifications.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="textSecondary">
                알림이 없습니다.
              </Typography>
            </Box>
          ) : (
            notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))
          )}
        </Container>

        {/* 새 알림 스낵바 */}
        <Snackbar
          open={showNewNotificationAlert}
          autoHideDuration={3000}
          onClose={() => setShowNewNotificationAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setShowNewNotificationAlert(false)} 
            severity="info" 
            sx={{ width: '100%' }}
          >
            새로운 승객 호출 알림이 도착했습니다!
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default App;
