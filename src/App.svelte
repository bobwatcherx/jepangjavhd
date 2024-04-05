<script>
  import Navbarmenu from './lib/Navbarmenu.svelte'
  import { Router, Link, Route } from "svelte-navigator";

  import Request from './pages/Request.svelte'
  // JAVDOE
  import Homejavdoe from './pages/javdoe/Homejavdoe.svelte'
  import Playerjavdoe from './pages/javdoe/Playerjavdoe.svelte'
  import Carijavdoe from './pages/javdoe/Carijavdoe.svelte'


  // doodstream
  import Homedood from './pages/dood_indo/Homedood.svelte'
  import Caridood from './pages/dood_indo/Caridood.svelte'

 function getRandomComponent() {
    const randomNumber = Math.random();
    return randomNumber < 0.5 ? 'Homejavdoe' : 'Homedood';
  }

</script>

<Router>
  <Navbarmenu/>
  <div>
    <Route path="/request">
      <Request />
    </Route>


     <Route path="/">
      {#if getRandomComponent() === 'Homedood'}
        <Homedood />
      {:else}
        <Homejavdoe />
      {/if}
    </Route>
    <Route path="/jepang">
      <Homejavdoe />
    </Route>
    <Route path="/cari">
      <Carijavdoe />
    </Route>
    <Route path="/player/:id" let:params>
      <Playerjavdoe id={params.id} />
    </Route>

    <!-- dood -->
     <Route path="/dood" >
      <Homedood/>
    </Route>
    <Route path="/caridood" >
      <Caridood/>
    </Route>
    <Route path="/p/:id " let:params>
      <Homedood id={params.id}/>
    </Route>
  </div>
</Router>