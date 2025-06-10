//sistema de comunicação 
import { createContext, useContext, useState } from 'react';
const MessageContext = createContext();
export function MessageProvider({ children }) {
  const [message, setMessage] = useState(null);
  function showMessage(msg) {
    setMessage(msg);
  }
  function clearMessage() {
    setMessage(null);
  }
  return (
    <MessageContext.Provider value={{ message, showMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
}
export function useMessage() {
  return useContext(MessageContext);
}
