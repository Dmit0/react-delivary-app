import React, { useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.style.css'

export const Toast: React.FC = () => {
  return (<ToastContainer position="top-right"/>);
};