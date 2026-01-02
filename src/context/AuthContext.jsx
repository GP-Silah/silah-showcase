import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { fetchMe, fetchSupplierMe } from '@/utils/mock-api/authApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { t } = useTranslation('auth');
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('guest');
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);
  const [supplierStatus, setSupplierStatus] = useState(null);
  const [supplierId, setSupplierId] = useState(null);

  const INACTIVE_NOTICE_KEY = 'inactiveSupplierNoticeClosed';

  const MOCK_AUTH_KEY = 'mock-authenticated';

  const showInactiveSupplierNotice = () => {
    const isClosed = sessionStorage.getItem(INACTIVE_NOTICE_KEY) === '1';
    if (isClosed) return;

    Swal.fire({
      icon: 'warning',
      title: t('inactiveSupplierNoticeTitle'),
      text: t('inactiveSupplierNoticeText'),
      confirmButtonText: t('gotIt'),
      confirmButtonColor: '#8a52a7',
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: { popup: 'swal-rtl' },
    }).then(() => {
      sessionStorage.setItem(INACTIVE_NOTICE_KEY, '1');
    });
  };

  // ---- NEW: list of allowed paths for INACTIVE suppliers ----
  const ALLOWED_INACTIVE_PATHS = [
    '/supplier/listings',
    '/supplier/overview',
    '/supplier/orders',
    '/supplier/invoices',
    '/supplier/settings',
    '/supplier/choose-plan',
  ];

  // Helper that returns true only for the 8 routes (including dynamic segments)
  const isPathAllowedForInactive = (pathname) => {
    // exact matches
    if (ALLOWED_INACTIVE_PATHS.includes(pathname)) return true;

    // dynamic routes: /supplier/orders/:id  and  /supplier/invoices/:id
    const base = pathname.split('/').slice(0, 3).join('/');
    return ['/supplier/orders', '/supplier/invoices'].includes(base);
  };

  const handleLogout = async () => {
    try {
      // await axios.post(
      //   `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
      //   {},
      //   { withCredentials: true },
      // );
      sessionStorage.removeItem(MOCK_AUTH_KEY);

      // Only clear frontend state if backend confirmed logout
      setUser(null);
      setRole('guest');
      setSupplierStatus(null);
      setSupplierId(null);
      sessionStorage.removeItem(INACTIVE_NOTICE_KEY);
    } catch (err) {
      console.error('Logout failed:', err);
      toast.error('Logout failed. Please try again.');

      // Do NOT clear user state if backend didn't log out!
      // Or at least refetch user to sync state
      await fetchUser(); // This will correct the state if cookie still exists
    }
  };

  // const fetchUser = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
  //       { withCredentials: true },
  //     );
  //     const userData = res.data;
  //     setUser(userData);
  //     const userRole = userData.role?.toLowerCase() || 'guest';
  //     setRole(userRole);

  //     const normalizeUrl = (url) => {
  //       if (!url) return null;
  //       if (url.startsWith('http')) return url;
  //       return `/${url}`;
  //     };

  //     // === إذا كان supplier → جلب بيانات المورد ===
  //     if (userRole === 'supplier') {
  //       try {
  //         const supplierRes = await axios.get(
  //           `${import.meta.env.VITE_BACKEND_URL}/api/suppliers/me`,
  //           { withCredentials: true },
  //         );
  //         const supplierData = supplierRes.data;
  //         setSupplierStatus(supplierData.supplierStatus);
  //         setSupplierId(supplierData.supplierId);

  //         // === إظهار التنبيه إذا INACTIVE ولم يُغلق ===
  //         if (supplierData.supplierStatus === 'INACTIVE') {
  //           showInactiveSupplierNotice();
  //         }
  //       } catch (supplierErr) {
  //         console.error('Failed to fetch supplier data:', supplierErr);
  //         setSupplierStatus(null);
  //       }
  //     } else {
  //       setSupplierStatus(null);
  //     }
  //   } catch (err) {
  //     if (err.response?.status === 401 || err.response?.status === 403) {
  //       const message = err.response?.data?.error?.message;

  //       if (message === 'Invalid or expired token') {
  //         await Swal.fire({
  //           icon: 'warning',
  //           title: t('title'),
  //           text: t('text'),
  //           confirmButtonColor: '#476DAE',
  //           confirmButtonText: 'OK',
  //         });
  //       }

  //       setUser(null);
  //       setRole('guest');
  //       setSupplierStatus(null);
  //     } else {
  //       console.error('Fetch user failed:', err);
  //       setUser(null);
  //       setRole('guest');
  //       setSupplierStatus(null);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);
  const fetchUser = async () => {
    try {
      // ⬅️ MOCK AUTH GATE
      if (!sessionStorage.getItem(MOCK_AUTH_KEY)) {
        setUser(null);
        setRole('guest');
        setSupplierStatus(null);
        setSupplierId(null);
        setLoading(false);
        return;
      }

      const normalizeUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `/silah-showcase/${url}`;
      };

      // ---- users/me (MOCK) ----
      const userData = await fetchMe();
      userData.pfpUrl = normalizeUrl(userData.pfpUrl);
      setUser(userData);

      const userRole = userData.role?.toLowerCase() || 'guest';
      setRole(userRole);

      // ---- suppliers/me (MOCK) ----
      if (userRole === 'supplier') {
        try {
          const supplierData = await fetchSupplierMe();
          supplierData.storeBannerFileUrl = normalizeUrl(
            supplierData.storeBannerFileUrl,
          );
          setSupplierStatus(supplierData.supplierStatus);
          setSupplierId(supplierData.supplierId);

          if (supplierData.supplierStatus === 'INACTIVE') {
            showInactiveSupplierNotice();
          }
        } catch (supplierErr) {
          console.error('Failed to fetch supplier data:', supplierErr);
          setSupplierStatus(null);
        }
      } else {
        setSupplierStatus(null);
        setSupplierId(null);
      }
    } catch (err) {
      console.error('Fetch user failed:', err);
      setUser(null);
      setRole('guest');
      setSupplierStatus(null);
      setSupplierId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const switchRole = async () => {
    if (switching) return role;
    setSwitching(true);
    try {
      // const res = await axios.patch(
      //   `${import.meta.env.VITE_BACKEND_URL}/api/auth/switch-role`,
      //   {},
      //   { withCredentials: true },
      // );
      // await fetchUser();
      // return res.data?.newRole?.toLowerCase() || role;
      // Must be logged in (mock)
      if (!sessionStorage.getItem(MOCK_AUTH_KEY)) {
        return role;
      }

      if (role === 'buyer') {
        // switch → supplier
        const supplierData = await fetchSupplierMe();

        setRole('supplier');
        setSupplierStatus(supplierData.supplierStatus);
        setSupplierId(supplierData.supplierId);

        if (supplierData.supplierStatus === 'INACTIVE') {
          showInactiveSupplierNotice();
        }

        return 'supplier';
      }

      // switch → buyer
      setRole('buyer');
      setSupplierStatus(null);
      setSupplierId(null);

      return 'buyer';
    } catch (err) {
      const msg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message;
      Swal.fire({
        icon: 'error',
        title: t('switchRoleErrorTitle') || 'Switch role failed',
        text: msg,
        confirmButtonColor: '#476DAE',
      });
      return role;
    } finally {
      setSwitching(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        switching,
        supplierStatus,
        supplierId,
        handleLogout,
        fetchUser,
        switchRole,
        isPathAllowedForInactive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
