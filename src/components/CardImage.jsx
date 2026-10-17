import React, { useState } from 'react';
import { Icon } from './IconSprite';

/**
 * Componente reutilizável de imagem para cards do projeto
 * - Proporção de aspecto estável (aspect-ratio 16/9 ou 4/3) sem layout shift
 * - object-fit: cover com cantos arredondados consistentes
 * - Efeito sutil de hover (zoom suave) respeitando prefers-reduced-motion
 * - loading="lazy" e decoding="async" nativos
 * - Fallback elegante com fundo botânico caso a imagem não carregue
 */
export default function CardImage({
  src,
  alt = '',
  aspectRatio = '16/9',
  width = 800,
  height = 450,
  loading = 'lazy',
  decoding = 'async',
  className = '',
  placeholderTitle = '',
  style = {}
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Se não houver src ou ocorrer erro de carregamento, renderiza o placeholder acessível
  if (!src || hasError) {
    return (
      <div
        className={`card-image-wrapper card-image-placeholder ${className}`}
        style={{
          aspectRatio,
          ...style
        }}
        role="img"
        aria-label={alt || placeholderTitle || 'Imagem ilustrativa do card'}
      >
        <div className="card-image-placeholder-inner">
          <div className="card-image-placeholder-icon">
            <Icon name="tree-duotone" size="lg" />
          </div>
          {placeholderTitle && (
            <span className="card-image-placeholder-title">{placeholderTitle}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`card-image-wrapper ${isLoaded ? 'is-loaded' : 'is-loading'} ${className}`}
      style={{
        aspectRatio,
        ...style
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        className="card-image-img"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
