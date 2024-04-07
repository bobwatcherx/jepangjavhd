  import Swal from 'sweetalert2';
export   function simpanbokep(video) {
    let storedVideos = JSON.parse(localStorage.getItem('javhd-nonton')) || [];
    storedVideos.push(video);
    localStorage.setItem('javhd-nonton', JSON.stringify(storedVideos));
    Swal.fire({
      position: 'top-center',
      icon: "success",
      toast:true,
      title: "Bokep Montok Behasil disimpan!",
      showConfirmButton: false,
      timer: 1500
    });
  }