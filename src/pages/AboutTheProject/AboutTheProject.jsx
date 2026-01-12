import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page } from 'react-pdf';
import styles from './AboutTheProject.module.css';

export default function AboutTheProject() {
  const { t, i18n } = useTranslation('project');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const team = t('members', { returnObjects: true });

  useEffect(() => {
    document.title = t('pageTitle');

    const sections = document.querySelectorAll(`.${styles['fade-section']}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.2 },
    );
    sections.forEach((sec) => observer.observe(sec));
  }, [t, i18n.language]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <main className={`${styles['about-project']} lang-${i18n.language}`}>
      {/* Header */}
      <section
        className={`${styles['about-header']} ${styles['fade-section']}`}
      >
        <p className={styles['section-label']}>{t('gp')}</p>
        <h1>{t('title')}</h1>
        <blockquote>{t('supervised')}</blockquote>
      </section>

      {/* Intro / Story */}
      <section
        className={`${styles['project-intro']} ${styles['fade-section']}`}
      >
        <p>{t('intro')}</p>
        <p>{t('abstract')}</p>
      </section>

      {/* Organization Link */}
      <section
        className={`${styles['organization-section']} ${styles['fade-section']}`}
      >
        <p>
          {t('organization.text')}{' '}
          <a
            href={t('organization.github') || 'https://github.com/GP-Silah'}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('organization.name')}
          </a>
        </p>
      </section>

      {/* Team */}
      <section
        className={`${styles['team-section']} ${styles['fade-section']}`}
      >
        <h2>{t('teamTitle')}</h2>
        <div className={styles['team-grid']}>
          {team.map((member) => {
            const username = member.github.split('/').pop();
            return (
              <a
                key={member.github}
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles['team-card']}>
                  <img
                    src={`https://github.com/${username}.png?size=100`}
                    alt={member.name}
                  />
                  <p className={styles.name}>{member.name}</p>
                  <p className={styles.role}>{member.role}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* PDF Viewer */}
      <section className={`${styles['pdf-section']} ${styles['fade-section']}`}>
        <h2>{t('pdfTitle')}</h2>
        <p>
          <a
            href="/silah-showcase/1447-1-CS-GP2-8C2-Silah.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('pdfLinkText')}
          </a>
        </p>

        <Document
          file="/silah-showcase/1447-1-CS-GP2-8C2-Silah.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>

        {numPages && (
          <div className={styles['pdf-controls']}>
            <button onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}>
              {t('prevPage')}
            </button>
            <span>
              {t('page')} {pageNumber} / {numPages}
            </span>
            <button
              onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
            >
              {t('nextPage')}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
