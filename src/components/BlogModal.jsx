import React, { useEffect } from 'react';
import { Icon } from './IconSprite';
import { useLanguage } from '../context/LanguageContext';

export default function BlogModal({ postId, onClose, onShare }) {
  const { dict } = useLanguage();
  const blogDict = dict.blog;
  const post = postId ? blogDict.posts.find((p) => p.id === postId) : null;

  useEffect(() => {
    if (!post) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

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
          aria-label={blogDict.modalCloseAria}
          data-i18n-aria-label="blog.modalCloseAria"
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
            decoding="async"
          />
          <div className="modal-badges-row">
            <span id="modalBadge" className="modal-badge">
              {post.badge}
            </span>
            <span id="modalReadTime" className="modal-read-time">
              {post.readTime}
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
                {post.author}
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
            <span data-i18n="blog.modalShareBtn">{blogDict.modalShareBtn}</span>
          </button>
          <button
            className="modal-btn btn-secondary"
            id="modalCloseBtn"
            type="button"
            data-i18n="blog.modalCloseBtn"
            onClick={onClose}
          >
            {blogDict.modalCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
