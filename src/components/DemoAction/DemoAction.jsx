import Swal from 'sweetalert2';

export async function demoAction({ title, text, e } = {}) {
  if (e?.stopPropagation) e.stopPropagation();

  await Swal.fire({
    icon: 'info',
    title: title || 'Demo Action',
    text: text || 'This is a demo feature. Functionality is limited.',
    confirmButtonColor: '#476DAE',
    confirmButtonText: 'OK',
  });
}
