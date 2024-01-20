import { useState, createContext } from 'react';

const notificationContext = createContext({
  notification: { title: '', message: '', status: '' },
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    status: 'idle',
  });

  const handleShowNotification = (notificationData) => {
    setNotification(notificationData);
  };

  const handleHideNotification = () => {
    setNotification({ title: '', message: '', status: 'idle' });
  };

  const context = { notification, handleShowNotification, handleHideNotification };

  return <notificationContext.Provider value={context}>{children}</notificationContext.Provider>;
};

export default notificationContext;
