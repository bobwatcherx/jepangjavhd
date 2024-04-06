<script>
  import { onMount } from "svelte";
  import { base_domain } from '../../base/domain.js';
  import Swal from 'sweetalert2';
  import {Link } from 'svelte-navigator'

  import {simpanbokep} from '../../lib/savelocal.js'

  let videos = [];
  let loading = true; // Tambahkan variabel loading
  let currentpage = 1
  let loadmore = false
  onMount(async () => {
    try {
       let randompage = Math.floor(Math.random() * 2000) + 1;
      const response = await fetch(`${base_domain}/otherpage/javdoe/?page=${randompage}`);

      // Periksa status respons
      if (response.ok) {
        // Konversi respons JSON
        const { data } = await response.json();
        videos = data;
      } else {
        console.error("Gagal melakukan permintaan. Status: " + response.status);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan permintaan.", error);
    } finally {
      // Set loading menjadi false setelah permintaan selesai
      loading = false;
    }
  });


  async function loadotherpage(){
    loadmore = true
    currentpage++

    Swal.fire({
    position: 'top-end',
    icon: "success",
    title: "GW Tambahin BOKEP LAGI",
    showConfirmButton: false,
    timer: 3000  // The toast will be displayed for 3 seconds
  });

    try {
      const response = await fetch(`${base_domain}/otherpage/javdoe/?page=${currentpage}`);
      const result = await response.json();
      // Handle the fetched data here
      videos = [...videos, ...(result.data || [])];
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      loadmore = false; // Set loading to false after fetch is complete (either success or failure)
    }
  }


  function showtrailer(trailer) {
    Swal.fire({
      title: "Trailer Bokep",
      html: `
        <video width="100%" height="auto" autoplay="true" controls>
          <source src="${trailer}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `,
      showCloseButton: true,
      showConfirmButton: false,
    });
  }
</script>

<style>
  /* Tambahkan gaya sesuai kebutuhan */
  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .col {
    margin: 0px;
    padding: 0px;
  }

  @media (max-width: 600px) {
    .col {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
   .zoom-button {
    animation: zoomAnimation 1s infinite alternate; /* Adjust duration as needed */
    transition: transform 0.3s ease-in-out;
  }

  @keyframes zoomAnimation {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.5); /* Adjust the scale factor for zoom-in */
    }
  }
</style>

<!-- Tampilkan loading spinner jika loading masih true -->
{#if loading}
  <div style="display: flex;justify-content: center;margin-top: 20px">
     <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-red-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  </div>
  <h5 style="text-align: center;font-weight: bold">Mencari Bokep Jepang Montok ...</h5>
  <p style="text-align: center">Kalo Loading Lama Lu Refresh atau close buka lagi </p>
{:else}
  <!-- Tampilkan data dalam bentuk kartu -->
  <div class="container" style="margin-top: 30px">
    <h5 style="font-weight: bold">Semua Bokep TERMONTOK</h5>
  </div>
  <div class="row">
    <div class=" mt-2 mb-1">
      <Link to="/cari" class="btn waves waves-effect pink">Cari Artis Bokep</Link>
      <Link to="/simpan" class="btn waves waves-effect blue">Bokep Tersimpan</Link>
    </div>
    {#each videos as video }
      <div class="col s6 m2 l2">
        <div class="card">
          <div class="card-image">
            <img src={video.image_src} alt="Video Thumbnail">
          </div>
          <div class="container">
            {#if video.title.length > 40}
              <p style="font-weight: bold;color:#a10d54">{video.title.slice(0, 40) + "..."}</p>
            {:else}
              <p style="font-weight: bold;color:#a10d54">{video.title}</p>
            {/if}
            <div class="container">
              <p style="font-weight: bold">{video.uploaded}</p>
            </div>
            <div style="display: flex;justify-content: center;">
              {#if video.trailer_source_url != ""}
                <button class="btn waves waves-effect pink" on:click={() => showtrailer(video.trailer_source_url)}>
                  Lihat Trailer
                </button>
              {/if}
            </div>
          </div>
          <div style="display: flex;justify-content: end;margin-top: 10px">

            <button class="btn waves waves-effect blue"
            on:click={()=>simpanbokep(video)}
            >
              simpan
            </button>

           <Link to={`/player/${encodeURIComponent(video.url)}`} class="btn waves waves-effect purple">
                 Nonton
              </Link>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- PAGINATION -->
  {#if loadmore}
  <div style="display: flex;justify-content: center;margin-top: 20px">
     <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-red-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  </div>
  {:else}
  <div style="display: flex;justify-content: center;margin-bottom: 50px">
  <button class="btn waves waves-effect red zoom-button"
  on:click={()=>loadotherpage()}
  >Tambah Bokep Lagi Bang</button>    
  </div>
  {/if}
{/if}
