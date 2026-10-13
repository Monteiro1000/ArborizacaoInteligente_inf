import React from 'react';
import { Icon } from './IconSprite';

export default function Toast({ message, isVisible }) {
  return (
    <div
      id="blogToast"
      className={`blog-toast${isVisible ? ' show' : ''}`}
      role="status"
      aria-live="polite"
    >
      <Icon name="check-circle-duotone" size="sm" className="ic-toast-icon" />
      <span>{message}</span>
    </div>
  );
}
