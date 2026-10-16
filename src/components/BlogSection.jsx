import React, { useState, useMemo } from 'react';
import { Icon } from './IconSprite';
import { useLanguage } from '../context/LanguageContext';

export default function BlogSection({ onOpenPost }) {
  const { dict } = useLanguage();
  const blogDict = dict.blog;
  const posts = blogDict.posts;
  const categories = blogDict.categories;

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue.trim().toLowerCase());
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setSearchQuery(val.trim().toLowerCase());
  };

  const handleClearSearch = () => {
    setInputValue('');
    setSearchQuery('');
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setInputValue('');
    setSearchQuery('');
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
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
  }, [posts, activeCategory, searchQuery]);

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

  const counterText = useMemo(() => {
    const total = filteredPosts.length;
    if (total === 0) return blogDict.counterZero;
    if (total === 1) return blogDict.counterOne;
    return `${total} ${blogDict.counterManySuffix}`;
  }, [filteredPosts.length, blogDict]);

  return (
    <section className="news-section blog-section" id="noticias">
      <div className="container">
        <div className="news-header blog-header">
          <p className="eyebrow eyebrow-dark" data-i18n="blog.eyebrow">
            {blogDict.eyebrow}
          </p>
          <h2 data-i18n="blog.title">{blogDict.title}</h2>
          <p className="section-text" data-i18n="blog.subtitle">
            {blogDict.subtitle}
          </p>
        </div>

        {/* Barra de Busca e Categorias do Blog */}
        <div className="blog-toolbar">
          <search className="blog-search-wrapper">
            <form
              id="blogSearchForm"
              className="blog-search-form"
              role="search"
              aria-label={blogDict.searchFormAria}
              data-i18n-aria-label="blog.searchFormAria"
              onSubmit={handleSearchSubmit}
            >
              <div className="blog-search-box">
                <input
                  type="search"
                  id="blogSearchInput"
                  name="q"
                  placeholder={blogDict.searchPlaceholder}
                  data-i18n-placeholder="blog.searchPlaceholder"
                  aria-label={blogDict.searchInputAria}
                  data-i18n-aria-label="blog.searchInputAria"
                  autoComplete="off"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                {inputValue && (
                  <button
                    type="button"
                    className="blog-search-clear ic-btn"
                    id="blogSearchClear"
                    aria-label={blogDict.clearSearchAria}
                    title={blogDict.clearSearchAria}
                    onClick={handleClearSearch}
                  >
                    <Icon name="x-duotone" size="sm" />
                  </button>
                )}
                <button
                  type="submit"
                  className="blog-search-btn ic-btn"
                  id="blogSearchBtn"
                  aria-label={blogDict.searchBtnAria}
                  data-i18n-aria-label="blog.searchBtnAria"
                >
                  <Icon name="magnifying-glass-duotone" size="sm" />
                </button>
              </div>
            </form>
          </search>

          <div
            className="blog-categories"
            id="blogCategories"
            role="tablist"
            aria-label={blogDict.categoriesAria}
            data-i18n-aria-label="blog.categoriesAria"
          >
            {categories.map((cat) => {
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
                    <span data-i18n="blog.featuredBadge">{blogDict.featuredBadge}</span>
                  </span>
                  <span className="featured-category-badge">{featuredPost.badge}</span>
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="featured-content-area">
                  <div className="blog-meta-row">
                    <span className="blog-date-text">{featuredPost.date}</span>
                    <span className="blog-meta-divider">|</span>
                    <span className="blog-read-time-pill">
                      <Icon name="clock-duotone" size="sm" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                  </div>
                  <h3 className="featured-title">{featuredPost.title}</h3>
                  <p className="featured-excerpt">{featuredPost.excerpt}</p>
                  <div className="featured-footer">
                    <div className="featured-author">
                      <Icon name="user-duotone" size="sm" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <button
                      type="button"
                      className="btn-read-featured open-blog-post ic-interactive"
                      onClick={() => onOpenPost(featuredPost.id)}
                    >
                      <span data-i18n="blog.readFullBtn">{blogDict.readFullBtn}</span>
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
            <h3 className="blog-grid-title" data-i18n="blog.gridTitle">
              {blogDict.gridTitle}
            </h3>
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
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-date-text">{post.date}</span>
                    <span className="blog-read-time-pill">
                      <Icon name="clock-duotone" size="sm" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-author">{post.author}</span>
                    <button
                      type="button"
                      className="blog-card-link open-blog-post ic-interactive"
                      onClick={() => onOpenPost(post.id)}
                    >
                      <span data-i18n="blog.readMoreBtn">{blogDict.readMoreBtn}</span>
                      <Icon name="arrow-right-duotone" size="sm" className="ic-inline" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Estado Vazio */}
        {filteredPosts.length === 0 && (
          <div className="blog-empty" id="blogEmpty" style={{ display: 'block' }}>
            <div
              className="blog-empty-icon icone-badge ic-badge-plan"
              style={{ margin: '0 auto 1rem' }}
            >
              <Icon name="magnifying-glass-duotone" size="lg" />
            </div>
            <h3 id="blogEmptyTitle">
              {searchQuery ? blogDict.emptySearchTitle : blogDict.emptyDefaultTitle}
            </h3>
            <p id="blogEmptyDesc">
              {searchQuery
                ? `${blogDict.emptySearchDescPrefix} "${searchQuery}". ${blogDict.emptySearchDescSuffix}`
                : blogDict.emptyDefaultDesc}
            </p>
            <button
              type="button"
              className="blog-btn-reset"
              id="blogResetBtn"
              data-i18n="blog.resetBtn"
              onClick={handleResetFilters}
            >
              {blogDict.resetBtn}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
