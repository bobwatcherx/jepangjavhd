<script>
  import { Link } from 'svelte-navigator';
  import { onMount } from 'svelte';
  import { base_domain,base_unblock } from '../../base/domain.js';
  export let id;
  let decodedId = decodeURIComponent(id);
  let responseData = [];
 let loading = true; // Add a loading indicator

  

async function getdetail(){
  try {
      const response = await fetch(base_domain + '/detailpage/javdoe/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `url=${encodeURIComponent(decodedId)}`
      });

      const data = await response.json();
      responseData = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally {
      // Set loading to false once the request is complete
      loading = false;
    }
}

onMount( () => {
    getdetail()
  });

function changepage(code){
      loading = true;
  id = code
  decodedId = decodeURIComponent(id)
  getdetail()
}
</script>

<svelte:head>
    <script type="text/javascript" src="https://javdoe.sh/misc/jquery/jquery.min.js"></script>
    <link href={base_unblock + "/https://javdoe.sh/misc/bootstrap/css/bootstrap.min.css"} rel="stylesheet">
    <script src={base_unblock + "/https://javdoe.sh/misc/bootstrap/js/bootstrap.min.js"}></script>
</svelte:head>



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
</style>


<div style="display: flex;justify-content: space-around;">
  <Link to="/" class="btn waves waves-effect pink">Kembali</Link>
  <Link to="/request" class="btn waves waves-effect purple">Request Bokep</Link>

  
</div>

<div class="row">
    <div class="col12 s12 m4 l4">
      {#if loading == false}
      <!-- IFRAME -->
      <div style="margin-top: 15px">
        <iframe src={responseData.playembed_url}
      allowfullscreen="true"
      width="100%" height="330px" 
       frameborder="0"></iframe>
       <br>
       <h5 style="font-size: 13px;color:#870754;font-weight: bold">{responseData.title}</h5>
       <br>
       <!-- DOWNLOAD -->
       <div class="container" style="margin-top: 10px;margin-bottom: 10px">
         <a 
         href={`https://cuty.io/quick?token=3c2f8445e662326c2ebcd8d60&url=` + responseData.download_link_url}
         target="_blank"
         class="btn waves waves-effect pink"
         style="width: 100%" 
         >Download BOKEP Disini</a>

         <p style="color:red;font-weight: bold">Lewatin Iklannya kalo mau DOWNLOAD BOKEP</p>
       </div>

       <p style="background-color: #b0096d;padding: 2px;
       margin:5px;
       color: white">
         Kalo <b>Video Error</b> ga bisa di tonton . lu ganti
         <b>Multi server ke yg lain </b> . kalo masih error juga 
         <b>lu Refresh </b> . kalo masih erorr juga <b>lu Nonton Bokep laen aja</b>
       </p>
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
          <div style="display: flex;justify-content: end;margin-top: 10px">
           <button on:click={changepage(rl.url)} class="btn waves waves-effect purple">
                Pengen Nonton
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

 