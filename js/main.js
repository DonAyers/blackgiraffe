
var songData = {data: {}};
var myGlobeFunc = function(data) { 
  console.log("The first song title is " + data.songs[0].name);
};



$(document).ready(function(){
	$('.innerContain').hide('fast');
	
	var url = "http://api.tumblr.com/v2/blog/blackgiraffemusic.tumblr.com/posts?api_key=see9I3Z72KgAv0JkrnxKPTzFzQPm1CebEU16OF6R9I8wnFz8RJ&limit=15&callback=?";
  
  $.getJSON(url, function (results) {
    $.each(results.response.posts, function (i, item) {
        
      //console.log(item);

      var date = new Date(item.timestamp*1000);
      // hours part from the timestamp
      var day = date.getDay();

      var theDate = date.getDate();
      var realDate = date.toDateString();
      var date = "<date>" + realDate + "</date>";

      if(item.hasOwnProperty('title')){
        if(item.title == null){
         var title = "";
        }else{
           var title = "<h2>" + item.title + "</h2>";
        }
      }else{
        var title = "";
      }

      if(item.hasOwnProperty('link_image')){
        var linkImage = "<img class='linkImage' src='" + item.link_image + "'>";
      }else{
        var linkImage = "";
      }

      if(item.hasOwnProperty('photos')){
        var src = item.photos[0].original_size.url; // first picture, first size
        var caption = item.caption;
        
        $(".innerNews").append("<div id='postwrapper'><div class='postImage'><img src='" + src + "'></div><div class='postCaption'><p>" + caption + " " + date + "</p></div></div><br>");
      
      }else if(item.type == "link"){
          

        $(".innerNews").append("<div id='postwrapper'><div class='linkPost'><a href='" + item.url +"'>" + title + "</a>" + linkImage + item.description + date + "</div></div>");
      }

      else{
        $(".innerNews").append("<div id='postwrapper'><div class='textPost'>" + title + "<br>" + item.body + date +"</div></div>");
      }
    });
  });

	$.getJSON('lyrics.JSON',function(data){
            
    songData.data = data;
    myGlobeFunc(data);
    $.each(data.songs,function(i,song){
        var currentSong = song.lyrics;
        $('.innerContain').append('<p id="songName" class=' +song.class+'>' +song.name+ '</p><p class="lyric">');
        for (i = 0; i< currentSong.length; i++){
          $('.innerContain').append(currentSong[i] + '<br>');
        }
        
    });
    
    $('.innerContain').append('</p>');
  }).error(function(){
      console.log('error');
  });
 
  //Clear / toggle screen
  var pageArray = [$('.innerContain'),$('.innerNews'),$('.innerShows'),$('.innerMusic'),$('.mobileMenu')];
  var clear = function(){
    for(i = 0; i < pageArray.length; i++){
      if(pageArray[i].is(':visible')){
        
        pageArray[i].toggle('slide', { direction: 'left' },200);
      }
    }
    
  };          


  $('.lyrics').click(function(){
		//clicked.toggle('slide', { direction: 'left' });
    clear();
    $('.innerContain').toggle('slide', { direction: 'left' });
		$('.background').fadeTo( 700, 0.1 );
    //clicked = ".lyrics";
	});

	$('.news').click(function(){
    clear();
		$('.innerNews').toggle('slide', { direction: 'left' });
		$('.background').fadeTo( 700, 0.27 );
	});
  $('.live').click(function(){
    clear();
    //$('.share').hide();
    $('.innerShows').toggle('slide', { direction: 'left' });
    $('.background').fadeTo( 700, 0.27 );
  });
  $('.music').click(function(){
    clear();
    $('.innerMusic').toggle('slide', { direction: 'left' });
    $('.background').fadeTo( 700, 0.27 );
  });

  $('.menuBut').click(function(){
   $('.nav').toggle('slide', { direction: 'up' });
   $('.share').toggle('fade');
    
  });

  $('.smMenu').click(function(){
  
   if($('.mobileMenu').is(':visible')){
        $('.mobileMenu').toggle('slide', { direction: 'left' });
        $('.share').show("slide", { direction: "right" }, 400);
    }else{
      clear();
      $('.share').hide("slide", { direction: "right" }, 100);
      $('.mobileMenu').css("display","absolute").toggle('slide', { direction: 'left' }, 180);
    }
  });

  $('.mobileMenu').click(function(){
    if($('.mobileMenu').is(':visible')){
      $('.share').show("slide", { direction: "right" }, 400);
    }else{
      $('.share').hide("slide", { direction: "right" }, 400);
    }
  });

 if($('.flyer').is(':visible')){
    $(document).click(function(){
      $('.flyer').fadeTo(700,0, function(){
        $('.flyer').empty();
      });
      //$('.background').delay(2000).empty();
    });
  }

  $('.name').click(function(){
		clear();
    $('.container').children().not('.background').hide('slide', {direction: 'left'}, 1000);
    $('.background').fadeTo( 700, 1 );
    $('.giraffe').animate({marginLeft: '101%'}, 10000, function(){
      $('.giraffe').hide('slide', {direction: 'right'}, 250);
    });
  });

   

});

