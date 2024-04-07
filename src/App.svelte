<script>
  import Navbarmenu from './lib/Navbarmenu.svelte'
  import { Router, Link, Route } from "svelte-navigator";

  import Request from './pages/Request.svelte'
  // JAVDOE
  import Homejavdoe from './pages/javdoe/Homejavdoe.svelte'
  import Playerjavdoe from './pages/javdoe/Playerjavdoe.svelte'
  import Carijavdoe from './pages/javdoe/Carijavdoe.svelte'
  import Simpanjavdoe from './pages/javdoe/Simpanjavdoe.svelte'



</script>

<Router>
  <!-- <Navbarmenu/> -->
  <div>
    <Route path="/request">
      <Request />
    </Route>


     <Route path="/">
        <Homejavdoe />
    </Route>
    <Route path="/jepang">
      <Homejavdoe />
    </Route>
    <Route path="/cari">
      <Carijavdoe />
    </Route>
     <Route path="/simpan">
      <Simpanjavdoe />
    </Route>
    <Route path="/player/:id/:title" let:params>
      <Playerjavdoe id={params.id} title={params.title}/>
    </Route>

  
  </div>
</Router>