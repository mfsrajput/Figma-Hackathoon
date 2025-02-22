
// src/components/CartProvider.tsx
'use client'

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}



