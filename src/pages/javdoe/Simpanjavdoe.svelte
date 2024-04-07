<script>
	import { Link,navigate } from 'svelte-navigator';
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
	import {direct_fun} from '../../lib/directlinkclick.js'
	let savedmovies = [];

	function getSavedMovies() {
		let data = JSON.parse(localStorage.getItem('javhd-nonton')) || [];
		savedmovies = data.reverse();
	}

	onMount(() => {
		getSavedMovies();
	});

	const updateLocalStorage = () => {
  localStorage.setItem('javhd-nonton', JSON.stringify(savedmovies));
};
		const hapusfilm = (url) => {
	  savedmovies = savedmovies.filter(item => item.url !== url);
	  updateLocalStorage();
	  Swal.fire({
	    icon: 'success',
	    title: 'Film berhasil dihapus dari daftar',
	    confirmButtonText: 'OK',
	    showConfirmButton: true
	  });
	};

	// CLEAR SEMUA TONTONAN
	const clearLocalStorage = () => {
		    try {
		        localStorage.removeItem('javhd-nonton');
		        // Perbarui variabel reactive
		        getSavedMovies();
		        Swal.fire({
		            icon: 'success',
		            title: 'Daftar Film Sudah Di hapus semuanya ',
		            confirmButtonText: 'ok Bang makasih',
		            showConfirmButton: true
		        });
		    } catch (error) {
		        console.error('Error clearing localStorage:', error);
		        Swal.fire({
		            icon: 'error',
		            title: 'Oops...',
		            text: 'Something went wrong while clearing localStorage!',
		        });
		    }
		};



</script>

<div style="margin-top: 10px">
	<div style="display: flex;justify-content: space-between;">
		<Link to="/" class="btn waves waves-effect pink">kembali</Link>
		
		<button
		on:click={clearLocalStorage}
		 class="btn waves-effect waves red">Hapus Semua </button>
	</div>

	
</div>

<div class="row">
	   {#each savedmovies as video }
      <div class="col s6 m2 l2">
        <div class="card">
          <div class="card-image">
           <img src={video.img || video.image_src} alt={video.title}>
          </div>
          <div class="container">
            {#if video.title.length > 40}
              <p style="font-weight: bold;color:#a10d54">{video.title.slice(0, 40) + "..."}</p>
            {:else}
              <p style="font-weight: bold;color:#a10d54">{video.title}</p>
            {/if}
          </div>
          <div style="display: flex;justify-content: end;margin-top: 10px">

            <button class="btn waves waves-effect red"
            on:click={()=>hapusfilm(video.url)}
            >
              hapus
            </button>

            <button class="btn waves waves-effect blue"
            on:click={()=>direct_fun(video.url)}
            >
              nonton
            </button>

          
          </div>
        </div>
      </div>
    {/each}
</div>

{#if savedmovies.length == 0}
	<div class="container">
		<h6 style="font-weight: bold">Ga ada bokep nya kosong, ga ada yg lu simpen</h6>
	</div>
{/if}

<style>
	.row .col{
		padding: 0px;
		margin:0px;
	}
</style>