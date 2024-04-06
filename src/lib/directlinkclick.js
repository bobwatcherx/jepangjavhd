import { directlink_url } from '../base/domain.js';
import { navigate } from 'svelte-navigator';
import Swal from 'sweetalert2';

export function direct_fun(url) {
    const randomChoice = Math.floor(Math.random() * 2) + 1;
    if (randomChoice === 2) {
        window.open(directlink_url, "_blank");
        Swal.fire({
      title: 'Maaf kebuka web Iklan',
      text: 'di Close Aja Tab Iklannya',
      icon: 'success',
      confirmButtonText: 'ok biarin bang'
    });
    } else {
        navigate(`/player/${encodeURIComponent(url)}`);
    }
}
