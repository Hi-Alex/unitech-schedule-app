import * as React from 'react';

export default function First({ children }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      padding: 100,
      backgroundColor: '#4bdaff'
    }}>{children}</div>
  );
}
