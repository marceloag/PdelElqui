function toggleplay(){console.log("toggle"),streaming.paused?(streaming.play(),$("#btn").addClass("pause"),$("#btn").removeClass("play")):(streaming.pause(),$("#btn").addClass("play"),$("#btn").removeClass("pause"))}function bajarVolumen(){streaming.volume>0&&streaming.paused===!1&&(streaming.volume=streaming.volume-.1,$("#btn").attr("class","volumedwn"),setTimeout(function(){$("#btn").attr("class","pause")},4e3))}function subirVolumen(){streaming.volume<1&&streaming.paused===!1?(streaming.volume=streaming.volume+.1,$("#btn").attr("class","volumeup"),setTimeout(function(){$("#btn").attr("class","pause")},4e3)):1==streaming.volume}function actualizarcancion(){url="http://streaming.croop.cl:8001/status-json.xsl",$.getJSON(url,function(t){currentSong=t.icestats.source.title}),document.title="-"+currentSong+"-",song!=currentSong&&(""!=song?($("#nowplaying").text(currentSong),$(".played").prepend("<li>"+song+"</li>"),song=currentSong):song=currentSong)}$(document).foundation(),url="http://streaming.croop.cl:8001/status-json.xsl",$.getJSON(url,function(t){song=t.icestats.source.title,$("#nowplaying").text(song)});var streaming=document.getElementById("str");streaming.volume=.8,$("#btn").on("click",toggleplay),$(document).keydown(function(t){switch(t.which){case 38:subirVolumen();break;case 40:bajarVolumen();break;case 49:toggleplay();break;case 32:toggleplay();break;case 13:toggleplay();break;default:return}t.preventDefault()});var auto_refresh=setInterval(actualizarcancion,3e3);!function t(){document.title=document.title.substring(1)+document.title.substring(0,1),setTimeout(t,200)}();