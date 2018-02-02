

function getApiMusic(searchMusic){
  $.ajax({
    url: 'http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=' +searchMusic + '&limit=3'+ '&api_key=5a30f7116e53053e67095ee979140325' + '&format=json',
    type: 'GET',
    success: function(data){
      console.log(data);
      displayMusic(data);
    },
    error: function(data){
      //error msg//
    }

  })
  $('.lastFM').show();
  $('.result-container').hide();
}

function displayMusic(data) {
  
  let albumName = data.albums.album[0].name;
  let albumURL=data.albums.album[0].image[3]["#text"];
  let artistInfo=data.albums.album[0].artist.name;

  $('.artistName').append(artistInfo);
  $('.albumName').append(albumName);
  $('.albumImage').html('<img src="'+albumURL+'">');

  }


function handleSearchMusic(){
  $('#findMusic').on('click', function(event){
    event.preventDefault();
    console.log("handleSearchMusic ran");
    let tag = $('.description').html();
    console.log(tag);
    getApiMusic(tag);
  })
}

function getApiWeather(searchCity){
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' +searchCity + ',US' + '&units=imperial' + '&appid=6dd9b6459ecd464f6ed3906d08b28184',
    type: 'GET',
    dataType: 'jsonp',
    success: function(data){
      console.log(data);
      displayResult(data);
    },
    error: function(data){
      alert("Please enter correct city name");
      $('.overwall').show();
      $('result-container').hide();
      loadPage();
    }
  })
}


function displayResult(data) {
  let weatherDescription = data.weather[0].main;
  let currentTemp = data.main.temp;
  let cityName=data.name;

  $('.cityName').append(cityName);
  $('.temp').append(currentTemp + ' &#8457;');
  $('.description').append(weatherDescription);
  $('#icon').html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>" );
  $(handleSearchMusic);
}

function handleSubmit() {
  $('#submit').on('click', function(event){
    event.preventDefault();
    console.log("handleSubmit ran");
    let cityName = $('#findCity').val();
    $('#findCity').val("");
    getApiWeather(cityName, displayResult);
    $('.overwall').hide();
    $('.result-container').show(); 
  })
}

function loadPage(){
  handleSubmit();
  $('.result-container').hide();
}

$(loadPage);



// Application name  My application
// API key 5a30f7116e53053e67095ee979140325
// Shared secret b07fdc09ec3c53b15810a5c3ed6e24d8
// Registered to sjcho0813