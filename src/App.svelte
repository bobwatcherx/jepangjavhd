<script>
  import Navbarmenu from './lib/Navbarmenu.svelte'
  import { Router, Link, Route } from "svelte-navigator";

  import Request from './pages/Request.svelte'
  // JAVDOE
  import Homejavdoe from './pages/javdoe/Homejavdoe.svelte'
  import Playerjavdoe from './pages/javdoe/Playerjavdoe.svelte'

</script>

<Router>
  <Navbarmenu/>
  <div>
    <Route path="/request">
      <Request />
    </Route>


    <Route path="/">
      <Homejavdoe />
    </Route>
    <Route path="/player/:id" let:params>
      <Playerjavdoe id={params.id} />
    </Route>
  </div>
</Router>