import { directlink_url } from '../base/domain.js';
import { navigate } from 'svelte-navigator';
import Swal from 'sweetalert2';

export function direct_fun(url) {
    const randomChoice = Math.floor(Math.random() * 2) + 1;
    if (randomChoice === 2) {
        window.open(directlink_url, "_blank");
       
    } else {
        navigate(`/player${url}`);
    }
}
