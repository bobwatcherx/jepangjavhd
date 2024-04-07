<script>
  import { Link } from 'svelte-navigator';
  import { onMount } from 'svelte';
  import { base_domain,base_unblock,download_video } from '../../base/domain.js';
  import {simpanbokep} from '../../lib/savelocal.js'
import { directlink_url } from '../../base/domain.js';
  import Swal from 'sweetalert2';

  export let id;
  export let title;
  let base_id = `/${id}/${title}`
  let responseData = [];
 let loading = true; 
 let direct_iframe = true
  let videoplayer = ""

async function getdetail(){
  try {
      const response = await fetch(base_domain + '/detailpage/javdoe/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `url=${base_id}`
      });

      const data = await response.json();
      responseData = data;
      videoplayer = responseData.playembed_urls[0]
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally {
      loading = false;
    }
}

onMount( () => {
    getdetail()
  });

function changepage(url){
  base_id = url
  direct_iframe = true
    const randomChoice = Math.floor(Math.random() * 2) + 1;
    if (randomChoice === 2) {
        window.open(directlink_url, "_blank");
        
    } else {
       loading = true;
        getdetail()
    }
  
}
 function opentutor() {

    Swal.fire({
        title: "Tutor Download BOKEP",
        html: `
            <div>
                <h6 style="color:red">Lu back aja Setiap kebuka web iklan</h6>
                <iframe src="${download_video}"
                    width="100%"
                    allowfullscreen
                />
            </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
            content: 'sweetalert-video-content',
        },
    });
}

function opendirectlink(){
     window.open(directlink_url,"_blank")
    direct_iframe = false
}


function gantiserver(player){
  videoplayer = player
     Swal.fire({
      position: 'top-center',
      icon: "success",
      title: "Server Bokep Sedang Di ganti...",
      showConfirmButton: false,
      timer: 1500
    });
}
</script>

<svelte:head>
    <script type="text/javascript" src="https://javdoe.sh/misc/jquery/jquery.min.js"></script>
    <link href={base_unblock + "/https://javdoe.sh/misc/bootstrap/css/bootstrap.min.css"} rel="stylesheet">
    <script src={base_unblock + "/https://javdoe.sh/misc/bootstrap/js/bootstrap.min.js"}></script>
</svelte:head>



<style>
 
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
</style>


<div  class="container" style="margin-top: 30px">
  <Link to="/" class="btn waves waves-effect pink">Kembali</Link>
  <Link to="/request" class="btn waves waves-effect purple">Request Bokep</Link>

  
</div>
<div style="margin-top: 10px;"class="container">
    <Link to="/simpan" class="btn waves waves-effect blue">bokep tersimpan</Link>
    <Link to="/cari" class="btn waves waves-effect pink">Cari Bokep</Link>
    
</div>
<div class="row">
    <div class="col12 s12 m4 l4">
      {#if loading == false}
      <!-- IFRAME -->
      <div style="margin-top: 15px">
        <!-- direct -->
        {#if direct_iframe}
      <div class="card z-depth-5" style="position: relative; "
      on:click={opendirectlink}
      >
            <img src={responseData.img_src} alt="Video Thumbnail" width="100%">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);animation: zoomAnimation 5s infinite alternate;">
              <button style="background-color: white; border: none; width: 80px; height: 80px; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
              </button>
            </div>
            <p style="font-weight: bold;text-align: center;font-size: 15px">Klik Untuk memulai Video</p>
          </div>
        {:else}
         <iframe src={videoplayer}
      allowfullscreen="true"
      allowscrolling="no"
      width="100%" height="330px" 
       frameborder="0"></iframe>
        {/if}



       <br>
       <p style="background-color:red;padding: 2px;
       margin:5px;
       color: white">
         Kalo <b>Video Error</b> ga bisa di tonton . lu ganti
         <b> server Di bawah Ini ke yg lain </b> . kalo masih error juga 
         <b>lu Refresh </b> . kalo masih erorr juga <b>lu Nonton Bokep laen aja</b>
       </p>
       <h5 style="font-weight: bold">Pilih server nonton . jika video Error </h5>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
          {#each responseData.playembed_urls as player, index}
            <button 
            class="btn waves-effect waves pink"
            on:click={() => gantiserver(player)}>server {index+1}</button>
            <br><br>
          {/each}
        </div>
       
       <br>
       <h5 style="font-size: 13px;color:#870754;font-weight: bold">{responseData.title}</h5>
       <br>
       <div class="card" style="border:1px solid orange;padding:5px">
        <div class="container">
          <h6 style="font-weight: bold">Video Tutorial DOWNLOAD BOKEP </h6>
          <p style="color:red;font-weight: bold">Pas Klik Download . kalo ke buka web iklan di back aja terus sampe lu bisa lewatin iklan nya </p>
         <button class="btn waves waves-effect purple"
          on:click={opentutor}
         >Tutorial Download BOKEP</button>
        </div>
       </div>
       <!-- DOWNLOAD -->
       <div class="card">
          <div class="container">
            <h5 style="font-weight: bold">Link Download Dan cadangannya</h5>
            <p style="background-color: red;color: white;padding: 3px;font-weight: bold">jangan Pake Link Sbchill.com dan mycloudzz.com itu pasti error</p>
      <div  style="margin-top: 10px;margin-bottom: 10px">
       {#each responseData.download_link_url as downloadLink, index}
          <a 
            href={`https://cuty.io/quick?token=3c2f8445e662326c2ebcd8d60&url=${downloadLink}`}
            target="_blank"
            style="width: 100%;color: #ba184b;font-weight: bold" 
          >Link Download #{index+1} {downloadLink}</a>
          <br>
          <br>
        {/each}

        <p style="color:red;font-weight: bold">Lewatin Iklannya kalo mau DOWNLOAD BOKEP</p>
      </div>
          </div>
       </div>


       
      </div>



      <!-- INFORMASI -->
    <div class="container">
      <h5 style="font-weight: bold">Informasi Bokep</h5>
      <div
      class="card z-depth-3"
       style="display: flex;justify-content: space-between;margin-top: 10px">
      <img src={responseData.img_src} alt="Video Thumbnail" 
        width="50%" height="35%" 
      />
        <div style="padding: 5px">
          <p style="font-size: 13px;color:#870754;font-weight: bold">{responseData.title}</p>
          <hr>
          <p style="font-weight: bold">Studio Produksi : {responseData.studio}</p>
          <p style="font-weight: bold">Tahun Rilis : {responseData.release_day}</p>
          <hr>
          <h6 style="font-weight: bold;">Genre Bokep</h6>
          <p style="font-weight: bold;color:#b0096d">{responseData.genre}</p>
        </div>
      </div>
      <div class="container">
      <h5 style="font-weight: bold">Preview Bokep </h5>
      </div>
       <div style="display: flex; flex-wrap: wrap;">
        {#each responseData.poster_images as posterImage }
          <img src={posterImage} style="width: 50%" />
        {/each}
      </div>
    </div>

     <!-- RELATED -->
  <div style="margin-top: 30px">
    <div class="container">
      <h5 style="font-weight:bold">Bokep Lainnya</h5>
    </div>
    {#each responseData.related_videos as rl }
    <div class="col s6 m2 l2">
        <div class="card">
          <div class="card-image">
            <img src={rl.image_src} alt="Video Thumbnail">
          </div>
          <div class="container">
            {#if rl.title.length > 40}
              <p style="font-weight: bold;color:#a10d54">{rl.title.slice(0, 40) + "..."}</p>
            {:else}
              <p style="font-weight: bold;color:#a10d54">{rl.title}</p>
            {/if}
            
          </div>
          <div style="display: flex;justify-content: space-around;margin-top: 10px">
             <button class="btn waves waves-effect blue"
            on:click={()=>simpanbokep(rl)}
            >
              simpan
            </button>
           <button on:click={changepage(rl.url)} class="btn waves waves-effect purple">
                 Nonton
              </button>
          </div>
        </div>
      </div>
    {/each}
  </div>


  {:else}
    <div style="display: flex;justify-content: center;margin-top: 30px">
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
    <h5 style="text-align: center;font-weight: bold">Sedang Nyari Bokep ....</h5>
    <p style="text-align: center">Kalo Lama Lu refresh atau close buka lagi</p>
  {/if}

    </div>
  </div>

 