import React, { useEffect } from 'react';
import { Icon } from './IconSprite';

export default function BlogModal({ post, onClose, onShare }) {
  useEffect(() => {
    if (!post) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Escape key listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      id="newsModal"
      className="modal active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="modal-overlay" id="modalOverlay" onClick={onClose}></div>
      <div className="modal-content blog-modal-content">
        <button
          className="modal-close ic-btn"
          id="modalClose"
          aria-label="Fechar modal"
          onClick={onClose}
        >
          <Icon name="x-duotone" size="md" />
        </button>

        <div className="modal-header">
          <img
            id="modalImage"
            src={post.image}
            alt={post.title}
            className="modal-image"
          />
          <div className="modal-badges-row">
            <span id="modalBadge" className="modal-badge">
              {post.badge}
            </span>
            <span id="modalReadTime" className="modal-read-time">
              {post.readTime || '3 min de leitura'}
            </span>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-author-bar">
            <div className="modal-author-avatar" aria-hidden="true">
              <Icon name="user-duotone" size="md" />
            </div>
            <div className="modal-author-info">
              <span id="modalAuthor" className="modal-author-name">
                {post.author || 'Equipe Arbo Inteligente'}
              </span>
              <span id="modalDate" className="modal-date">
                {post.date}
              </span>
            </div>
          </div>

          <h2 id="modalTitle">{post.title}</h2>
          <p id="modalDescription" className="modal-description">
            {post.excerpt}
          </p>

          <div
            id="modalContent"
            className="modal-full-content"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </div>

        <div className="modal-footer">
          <button
            className="modal-share-btn ic-interactive"
            id="modalShareBtn"
            type="button"
            onClick={() => onShare(post)}
          >
            <Icon name="share-network-duotone" size="sm" />
            <span>Compartilhar</span>
          </button>
          <button
            className="modal-btn btn-secondary"
            id="modalCloseBtn"
            type="button"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
