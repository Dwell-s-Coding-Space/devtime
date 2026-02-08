import Api from './core';

export const clientApi = new Api('/api/proxy', {
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
});
