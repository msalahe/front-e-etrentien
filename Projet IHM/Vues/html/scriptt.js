const video=document.getElementById('video')

function startvideo() {

    navigator.getUserMedia(
{ video: {} },
stream => video.srcObject = stream,
err => console.error(err)
    )
}
startvideo()
