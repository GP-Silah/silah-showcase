import React, { useEffect } from 'react';
import HeroSection from '../../components/Landing/HeroSection/HeroSection';
import WhyChooseUs from '../../components/Landing/WhyChooseUs/WhyChooseUs';
import HowItWorks from '../../components/Landing/HowItWorks/HowItWorks';
import ExploreCategories from '../../components/Landing/ExploreCategories/ExploreCategories'; // أو './ExploreCategories' حسب المسار
import { useTranslation } from 'react-i18next';
import './Landing.css';
import '../../App.css';
import Swal from 'sweetalert2';

const DEMO_NOTICE_KEY = 'demoNoticeClosed';

function Landing() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageTitle.landing', { ns: 'common' });
  }, [t, i18n.language]);

  const { t: tDemo } = useTranslation('demo');
  useEffect(() => {
    const isClosed = sessionStorage.getItem(DEMO_NOTICE_KEY) === '1';
    if (isClosed) return;

    Swal.fire({
      icon: 'info',
      title: tDemo('popup.title'),
      text: tDemo('popup.description'),
      confirmButtonText: tDemo('ok'),
      confirmButtonColor: '#8a52a7',
      allowOutsideClick: true,
      allowEscapeKey: true,
      customClass: {
        popup: i18n.language === 'ar' ? 'swal-rtl' : '',
      },
    }).then(() => {
      sessionStorage.setItem(DEMO_NOTICE_KEY, '1');
    });
  }, [tDemo, i18n.language]);

  return (
    <div className={`landing-page ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <HeroSection />
      <div className="container">
        <WhyChooseUs />
        <HowItWorks />
        <ExploreCategories />
      </div>
    </div>
  );
}

export default Landing;
