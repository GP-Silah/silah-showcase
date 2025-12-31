import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { useTranslation } from 'react-i18next';
import ItemCard from '@/components/ItemCard/ItemCard';
import styles from './BrowseByCategory.module.css'; // ← فقط غيرت هذا السطر
import { getCategories } from '@/utils/mock-api/categoryApi';
import { getSearchResults } from '@/utils/mock-api/searchApi';

export default function BrowseByCategoryItems() {
  const { i18n, t } = useTranslation('browseByCategory');
  const lang = i18n.language || 'en';
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedMainCat, setSelectedMainCat] = useState(null);
  const [selectedSubCat, setSelectedSubCat] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState(null);

  const url = getCategories({ main: true, lang });

  useEffect(() => {
    document.title = t('pageTitle');
  }, [t, i18n.language]);

  // --- Parse categoryId ---
  const query = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search],
  );
  const categoryIdParam = query.categoryId;

  // --- Fetch categories ---
  // useEffect(() => {
  //   let cancelled = false;
  //   setLoadingCategories(true);
  //   setError(null);
  //   axios
  //     .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`, {
  //       params: { lang },
  //     })
  //     .then((res) => {
  //       if (cancelled) return;
  //       setCategories(res.data || []);
  //     })
  //     .catch((err) => {
  //       if (cancelled) return;
  //       const msg =
  //         err?.response?.data?.error?.message ||
  //         err?.response?.data?.message ||
  //         err?.message ||
  //         'Failed to load categories';
  //       setError(msg);
  //     })
  //     .finally(() => {
  //       if (!cancelled) setLoadingCategories(false);
  //     });
  //   return () => {
  //     cancelled = true;
  //   };
  // }, [lang]);
  // --- Fetch categories (MOCK) ---
  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setError(null);

        const res = await fetch(url);
        const data = await res.json();

        if (cancelled) return;

        // mock returns array directly
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        if (cancelled) return;
        console.error('Error fetching categories:', err);
        setError(t('fetchError'));
      } finally {
        if (!cancelled) setLoadingCategories(false);
      }
    };

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, [url, lang, t]);

  // --- Determine selected category ---
  useEffect(() => {
    setSelectedMainCat(null);
    setSelectedSubCat(null);
    if (!categoryIdParam || categories.length === 0) return;

    let foundMain = categories.find(
      (c) => String(c.id) === String(categoryIdParam),
    );
    if (foundMain) {
      setSelectedMainCat(foundMain);
      setSelectedSubCat(null);
      return;
    }
    for (const main of categories) {
      const foundSub = (main.subcategories || []).find(
        (s) => String(s.id) === String(categoryIdParam),
      );
      if (foundSub) {
        setSelectedMainCat(main);
        setSelectedSubCat(foundSub);
        return;
      }
    }
    setError(t('invalidCategoryId'));
  }, [categoryIdParam, categories, t]);

  // --- Fetch items ---
  useEffect(() => {
    if (loadingCategories) return;
    if (!categoryIdParam) {
      setError(t('noCategoryProvided'));
      return;
    }
    if (!selectedMainCat) return;

    const usedFor = selectedMainCat.usedFor;
    const isProduct = usedFor === 'PRODUCT';
    const endpoint = isProduct
      ? '/api/search/products'
      : '/api/search/services';
    const params = { lang };
    if (selectedSubCat) {
      params.category = selectedMainCat.id;
      params.subcategory = selectedSubCat.id;
    } else {
      params.category = selectedMainCat.id;
    }

    let cancelled = false;
    setLoadingItems(true);
    setError(null);
    // axios
    //   .get(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, { params })
    //   .then((res) => {
    //     if (cancelled) return;
    //     setItems(res.data || []);
    //   })
    //   .catch((err) => {
    //     if (cancelled) return;
    //     const msg =
    //       err?.response?.data?.error?.message ||
    //       err?.response?.data?.message ||
    //       err?.message ||
    //       t('fetchError');
    //     setError(msg);
    //   })
    //   .finally(() => {
    //     if (!cancelled) setLoadingItems(false);
    //   });

    const type = isProduct ? 'products' : 'services';

    const fetchItems = async () => {
      try {
        const isProduct = selectedMainCat.usedFor === 'PRODUCT';
        const type = isProduct ? 'products' : 'services';

        const url = getSearchResults({
          type,
          categoryId: selectedMainCat.id,
          lang,
        });

        const res = await fetch(url);
        const data = await res.json();

        if (cancelled) return;
        let results = Array.isArray(data) ? data : [];

        if (selectedSubCat) {
          results = results.filter(
            (item) => String(item.category?.id) === String(selectedSubCat.id),
          );
        }

        setItems(results);
      } catch (err) {
        if (cancelled) return;
        console.error('Error fetching items:', err);
        setError(t('fetchError'));
      } finally {
        if (!cancelled) setLoadingItems(false);
      }
    };

    fetchItems();

    return () => {
      cancelled = true;
    };
  }, [
    selectedMainCat,
    selectedSubCat,
    lang,
    categoryIdParam,
    loadingCategories,
    t,
  ]);

  // --- Side Menu handlers ---
  const onSelectMain = (main) => {
    navigate(`/browse/items?categoryId=${encodeURIComponent(main.id)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const onSelectSub = (main, sub) => {
    navigate(`/browse/items?categoryId=${encodeURIComponent(sub.id)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Heading ---
  const renderHeading = () => {
    if (!selectedMainCat) return t('browsingUnknown');
    if (!selectedSubCat)
      return (
        <>
          {t('browsing')}{' '}
          <span className={styles['breadcrumb-main']}>
            {selectedMainCat.name}
          </span>
        </>
      );
    return (
      <>
        {t('browsing')}{' '}
        <span className={styles['breadcrumb-main']}>
          {selectedMainCat.name}
        </span>
        <span className={styles['breadcrumb-sep']}> › </span>
        <span className={styles['breadcrumb-sub']}>{selectedSubCat.name}</span>
      </>
    );
  };

  return (
    <div
      className={`${styles['browse-by-category']} ${
        lang === 'ar' ? styles.rtl : styles.ltr
      }`}
    >
      <div className={styles.container}>
        <aside className={styles['side-menu']}>
          {loadingCategories && (
            <div className={styles.muted}>{t('loadingCategories')}</div>
          )}
          {!loadingCategories && categories.length > 0 && (
            <nav className={styles['menu-list']} aria-label={t('categories')}>
              {selectedMainCat && (
                <div className={`${styles['menu-main']} ${styles.active}`}>
                  <div
                    className={styles['menu-main-title']}
                    onClick={() => onSelectMain(selectedMainCat)}
                  >
                    {selectedMainCat.name}
                  </div>
                  <div className={styles['menu-divider']} />
                  {selectedMainCat.subcategories &&
                    selectedMainCat.subcategories.length > 0 && (
                      <div className={styles['menu-sub-list']}>
                        {selectedMainCat.subcategories.map((sub) => (
                          <div
                            key={sub.id}
                            className={`${styles['menu-sub']} ${
                              selectedSubCat?.id === sub.id ? styles.active : ''
                            }`}
                            onClick={() => onSelectSub(selectedMainCat, sub)}
                          >
                            {sub.name}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              )}
            </nav>
          )}
        </aside>

        <main className={styles.content}>
          <div className={styles.topbar}>
            <h2 className={styles.heading}>{renderHeading()}</h2>
          </div>
          {loadingItems && (
            <div className={styles.muted}>{t('loadingItems')}</div>
          )}
          {!loadingItems && error && (
            <div className={styles.error}>{error}</div>
          )}
          {!loadingItems && !error && items.length === 0 && (
            <div className={styles['no-items']}>{t('noItemsFound')}</div>
          )}
          {!loadingItems && !error && items.length > 0 && (
            <div className={styles['items-grid']}>
              {items.map((it) => {
                const isProduct = !!it.productId;
                const itemType = isProduct ? 'product' : 'service';

                return (
                  <div
                    key={it.productId ?? it.serviceId ?? it.id}
                    className={styles['item-wrapper']}
                  >
                    <ItemCard
                      item={it}
                      type={itemType}
                      isAvailable={isProduct ? it.stock > 0 : true}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
