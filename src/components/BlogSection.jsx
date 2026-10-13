import React, { useState, useMemo } from 'react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/newsData';
import { Icon } from './IconSprite';

export default function BlogSection({ onOpenPost }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  // Handle form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue.trim().toLowerCase());
  };

  // Handle real-time input change
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setSearchQuery(val.trim().toLowerCase());
  };

  // Clear search
  const handleClearSearch = () => {
    setInputValue('');
    setSearchQuery('');
  };

  // Reset all filters
  const handleResetFilters = () => {
    setActiveCategory('all');
    setInputValue('');
    setSearchQuery('');
  };

  // Filtered posts logic
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === 'all' || post.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery) return true;

      const q = searchQuery;
      const titleMatch = post.title?.toLowerCase().includes(q);
      const excerptMatch = post.excerpt?.toLowerCase().includes(q);
      const badgeMatch = post.badge?.toLowerCase().includes(q);
      const authorMatch = post.author?.toLowerCase().includes(q);
      const contentMatch = post.content?.toLowerCase().includes(q);

      return titleMatch || excerptMatch || badgeMatch || authorMatch || contentMatch;
    });
  }, [activeCategory, searchQuery]);

  // Featured vs Grid posts
  const { featuredPost, gridPosts } = useMemo(() => {
    let featured = null;
    let grid = [...filteredPosts];

    if (!searchQuery && activeCategory === 'all') {
      const explicitFeaturedIndex = grid.findIndex((p) => p.featured);
      if (explicitFeaturedIndex !== -1) {
        featured = grid.splice(explicitFeaturedIndex, 1)[0];
      } else if (grid.length > 0) {
        featured = grid.shift();
      }
    } else if (grid.length >= 2) {
      featured = grid.shift();
    }

    return { featuredPost: featured, gridPosts: grid };
  }, [filteredPosts, searchQuery, activeCategory]);

  // Counter text
  const counterText = useMemo(() => {
    const total = filteredPosts.length;
    if (total === 0) return 'Nenhuma notícia encontrada';
    if (total === 1) return '1 publicação encontrada';
    return `${total} publicações encontradas`;
  }, [filteredPosts.length]);

  return (
    <section className="news-section blog-section" id="noticias">
      <div className="container">
        <div className="news-header blog-header">
          <p className="eyebrow eyebrow-dark">
            Atualizações e Artigos
          </p>
          <h2>Blog &amp; Notícias do Projeto</h2>
          <p className="section-text">
            Acompanhe as publicações mais recentes, artigos técnicos, pesquisas de campo e marcos da Arborização Inteligente.
          </p>
        </div>

        {/* Barra de Busca e Categorias do Blog */}
        <div className="blog-toolbar">
          <search className="blog-search-wrapper">
            <form
              id="blogSearchForm"
              className="blog-search-form"
              role="search"
              aria-label="Pesquisar publicações"
              onSubmit={handleSearchSubmit}
            >
              <div className="blog-search-box">
                <input
                  type="search"
                  id="blogSearchInput"
                  name="q"
                  placeholder="Buscar artigos..."
                  aria-label="Buscar artigos"
                  autoComplete="off"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                {inputValue && (
                  <button
                    type="button"
                    className="blog-search-clear ic-btn"
                    id="blogSearchClear"
                    aria-label="Limpar busca"
                    title="Limpar busca"
                    onClick={handleClearSearch}
                  >
                    <Icon name="x-duotone" size="sm" />
                  </button>
                )}
                <button
                  type="submit"
                  className="blog-search-btn ic-btn"
                  id="blogSearchBtn"
                  aria-label="Pesquisar"
                >
                  <Icon name="magnifying-glass-duotone" size="sm" />
                </button>
              </div>
            </form>
          </search>

          <div className="blog-categories" id="blogCategories" role="tablist" aria-label="Filtrar por categoria">
            {BLOG_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-btn${isSelected ? ' active' : ''}`}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Artigo em Destaque */}
        {featuredPost && (
          <div className="blog-featured-wrapper" id="blogFeaturedWrapper">
            <div id="blogFeatured">
              <article className="blog-featured-card reveal">
                <div className="featured-image-area">
                  <span className="featured-tag-badge">
                    <Icon name="sparkle-duotone" size="sm" className="ic-inline" />
                    <span>Destaque</span>
                  </span>
                  <span className="featured-category-badge">{featuredPost.badge}</span>
                  <img src={featuredPost.image} alt={featuredPost.title} loading="lazy" />
                </div>
                <div className="featured-content-area">
                  <div className="blog-meta-row">
                    <span className="blog-date-text">{featuredPost.date}</span>
                    <span className="blog-meta-divider">|</span>
                    <span className="blog-read-time-pill">
                      <Icon name="clock-duotone" size="sm" />
                      <span>{featuredPost.readTime || '3 min de leitura'}</span>
                    </span>
                  </div>
                  <h3 className="featured-title">{featuredPost.title}</h3>
                  <p className="featured-excerpt">{featuredPost.excerpt}</p>
                  <div className="featured-footer">
                    <div className="featured-author">
                      <Icon name="user-duotone" size="sm" />
                      <span>{featuredPost.author || 'Equipe Arbo'}</span>
                    </div>
                    <button
                      type="button"
                      className="btn-read-featured open-blog-post ic-interactive"
                      onClick={() => onOpenPost(featuredPost)}
                    >
                      <span>Ler artigo completo</span>
                      <Icon name="arrow-right-duotone" size="sm" className="ic-inline" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}

        {/* Cabeçalho do Grid de Publicações */}
        {filteredPosts.length > 0 && (
          <div className="blog-grid-header">
            <h3 className="blog-grid-title">Publicações do Projeto</h3>
            <span className="blog-counter" id="blogCounter">
              {counterText}
            </span>
          </div>
        )}

        {/* Grid de Artigos do Blog */}
        {gridPosts.length > 0 && (
          <div className="blog-grid" id="blogGrid">
            {gridPosts.map((post) => (
              <article key={post.id} className="blog-card reveal">
                <div className="blog-card-image">
                  <span className="blog-card-badge">{post.badge}</span>
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-date-text">{post.date}</span>
                    <span className="blog-read-time-pill">
                      <Icon name="clock-duotone" size="sm" />
                      <span>{post.readTime || '3 min'}</span>
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-author">{post.author || 'Equipe Arbo'}</span>
                    <button
                      type="button"
                      className="blog-card-link open-blog-post ic-interactive"
                      onClick={() => onOpenPost(post)}
                    >
                      <span>Ler mais</span>
                      <Icon name="arrow-right-duotone" size="sm" className="ic-inline" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Estado Vazio (quando não há resultados) */}
        {filteredPosts.length === 0 && (
          <div className="blog-empty" id="blogEmpty" style={{ display: 'block' }}>
            <div className="blog-empty-icon icone-badge ic-badge-plan" style={{ margin: '0 auto 1rem' }}>
              <Icon name="magnifying-glass-duotone" size="lg" />
            </div>
            <h3 id="blogEmptyTitle">
              {searchQuery ? 'Nenhum resultado encontrado' : 'Artigos em Produção'}
            </h3>
            <p id="blogEmptyDesc">
              {searchQuery
                ? `Não encontramos nenhuma publicação para "${searchQuery}". Tente outros termos de busca.`
                : 'Ainda não há publicações nesta categoria. Nossos artigos técnicos e científicos estão em fase de produção por nossa equipe e serão lançados em breve!'}
            </p>
            <button
              type="button"
              className="blog-btn-reset"
              id="blogResetBtn"
              onClick={handleResetFilters}
            >
              Ver todas as notícias
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
