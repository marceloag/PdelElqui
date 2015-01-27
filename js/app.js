$(document).foundation();

// $('#nowplaying').load('nowplaying.php');
// var song=$('#nowplaying').text();

url="http://laserenaradio.sytes.net:8000/status-json.xsl";
$.getJSON(url,function(json){
  song=json.icestats.source.title;
  $('#nowplaying').text(song);
});

var streaming= document.getElementById("str");
streaming.volume= 0.8;

function toggleplay(){
  console.log("toggle");
    if (streaming.paused) {
         streaming.play();
         $('#btn').addClass("pause");
         $('#btn').removeClass("play");
    } 
       else {
         streaming.pause();
         $('#btn').addClass("play");
         $('#btn').removeClass("pause");
       }
}

$('#btn').on("click",toggleplay );

function bajarVolumen(){
  if(streaming.volume > 0 && streaming.paused === false){
    streaming.volume=streaming.volume - 0.1;
    $('#btn').attr('class','volumedwn');
    setTimeout(function(){ $('#btn').attr('class','pause'); }, 4000);
  }
}

function subirVolumen(){
  if(streaming.volume < 1 && streaming.paused === false){
    streaming.volume=streaming.volume + 0.1;
    $('#btn').attr('class','volumeup');
    setTimeout(function(){ $('#btn').attr('class','pause'); }, 4000);
  }else if(streaming.volume==1){
  }
}


$(document).keydown(function(e) {
    switch(e.which) {
        case 38:
        subirVolumen(); // up
        break;

        case 40: // down
        bajarVolumen();
        break;

        case 49:
        toggleplay();
        break;

        case 32:
        toggleplay();
        break;

        case 13:
        toggleplay();
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

      function actualizarcancion()
      {
        // $('#nowplaying').load('nowplaying.php');
        // var currentSong = $('#nowplaying').text();
        url="http://laserenaradio.sytes.net:8000/status-json.xsl";
        $.getJSON(url,function(json){
          currentSong = json.icestats.source.title;
        });
        // console.log(currentSong);
        document.title = "-"+currentSong+"-";
            if(song != currentSong){
              if(song != ""){
                $('#nowplaying').text(currentSong);
                $('.played').prepend("<li>"+song+"</li>");
                song=currentSong;
              }else{
                song=currentSong;
              }
            }
      }


      var auto_refresh = setInterval(actualizarcancion, 3000);


   (function titleMarquee() {
    document.title = document.title.substring(1)+document.title.substring(0,1);
    setTimeout(titleMarquee, 200);
    })();