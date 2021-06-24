import React from 'react';

import { AuthProvider } from './AuthContext';

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return <AuthProvider>{children}</AuthProvider>;
};
