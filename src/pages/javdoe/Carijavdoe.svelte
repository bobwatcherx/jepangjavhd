<script>
  import {Link } from 'svelte-navigator'
  // Inisialisasi variabel untuk menyimpan data dari API
  import Swal from 'sweetalert2';
  import { base_domain } from '../../base/domain.js';
  import {simpanbokep} from '../../lib/savelocal.js'
  import {direct_fun} from '../../lib/directlinkclick.js'

  let data = [];
  let searchvalue = ""
  let currentpage = 1
  let isLoading = false
  // Fungsi untuk melakukan request ke API
  async function fetchData(query, page) {
    isLoading = true
    try{
      const res = await fetch(`${base_domain}/search/javdoe/?query=${searchvalue}&page=${currentpage}`);
    const jsonData = await res.json();
    data = jsonData.data.videos; 
  }catch(e){
    console.log("error")
  }finally{
    isLoading = false
  }
  }

  async function loadotherpage(){
    currentpage++

    Swal.fire({
    position: 'top-end',
    icon: "success",
    title: "GW Tambahin BOKEP LAGI",
    showConfirmButton: false,
    timer: 3000  // The toast will be displayed for 3 seconds
  });
    // APPEND
     try{
      const res = await fetch(`${base_domain}/search/javdoe/?query=${searchvalue}&page=${currentpage}`);
    const jsonData = await res.json();
    data = [...data, ...(jsonData.data.videos || [])];
  }catch(e){
    console.log("error")
  }finally{
    isLoading = false
  }

} 

 
</script>

<div class="container " style="margin-top: 30px">
  <Link to="/" class="btn waves waves-effect">Kembali</Link>
  <Link to="/simpan" class="btn waves waves-effect blue">Bokep Tersimpan</Link>
</div>

<div class="container">
  <h5 style="font-weight: bold">Cari Bokep jepang Artis Atau Kode </h5>
</div>

<div class="card z-depth-2" style="padding: 5px">
  <div class="container">
    <p style="font-weight: bold">Masukkan Kode atau Artis Bokep yg lu SUKA</p>
    <input type="text" placeholder="Masukkan artis atau kode"
    bind:value={searchvalue}
    >
    <button class="waves btn waves-effect pink"
    on:click={fetchData}
    >Cari Bokep</button>
  </div>
</div>

<!-- Card untuk menampilkan hasil pencarian -->
{#if !isLoading}
<div class="row mt-2">
  {#each data as video}
  <div class="col s6 m2 l2">
    <div class="card z-depth-2" style="margin-bottom: 10px">
    <div class="card-image">
      <img src={video.img} style="width: 100%" alt="">
    </div>
    <div class="container">
       {#if video.title.length > 40}
              <p style="font-weight: bold;color:#a10d54">{video.title.slice(0, 40) + "..."}</p>
            {:else}
              <p style="font-weight: bold;color:#a10d54">{video.title}</p>
            {/if}
      <p style="font-weight: bold"> {video.uploaded}</p>
    </div>
    <div style="display: flex;justify-content: space-around;">
            <button class="btn waves waves-effect blue"
            on:click={()=>simpanbokep(video)}
            >
              simpan
            </button>
       <button class="btn waves waves-effect purple"
            on:click={()=>direct_fun(video.url)}
            >
              nonton
            </button>
    </div>
  </div>
  </div>
  {/each}
  
</div>

{:else}
<!-- Tampilkan loading jika data belum tiba -->
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
{/if}

{#if data != ""}
<div  style="display:flex;justify-content:center;margin-bottom: 50px;margin-top: 20px">
    <button class="btn waves waves-effect pink zoom-button"
    on:click={()=>loadotherpage()}
    >Tambah BOKEP LAGI BANG</button>
  </div>
{/if}
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