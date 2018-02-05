function getApiMusic(searchMusic){
  $.ajax({
    url: 'http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=' +searchMusic + '&limit=12'+ '&api_key=5a30f7116e53053e67095ee979140325' + '&format=json',
    type: 'GET',
    success: function(data){
      console.log(data);
      displayMusic(data);
    }
  })
  $('#lastFM').show();
  $('.result-container').hide();
}

function displayMusic(data) {
  $.each(data.albums.album, function(index, item) {

  let albumURL=data.albums.album[index].url;
  let albumName = data.albums.album[index].name;
  let albumCoverURL=data.albums.album[index].image[3]["#text"];
  let artistInfo=data.albums.album[index].artist.name;
  console.log(albumCoverURL);
  if (albumCoverURL === "") {
    albumCoverURL = "http://shashgrewal.com/wp-content/uploads/2015/05/default-placeholder-300x300.png";
  }
  let template = 
      `
      <div class='musicInfo-container col-4'>
        <a href ="${albumURL}" class="albumURL" target="_blank">
          <div class="albumImage"><img src="${albumCoverURL}"/></div>
        </a>
        <div class="textbox col-12"> 
          <div class="artistName">Artist Name: ${artistInfo}</div>
          <div class="albumName">Album Name: ${albumName}</div>
        </div>
      </div>`
      $('#lastFM').append(template);
 })
  $('#lastFM').append(`<button type="submit" id="tryAgain">Try different city?</button>`);
  handleTryAgain();
  }

function handleSearchMusic(){
  $('#findMusic').on('click', function(event){
    event.preventDefault();
    console.log("handleSearchMusic ran");
    let tag = $('.description').html();
    $('.description').html("");
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
      displayWeatherResult(data);
    },
    error: function(data){
      alert("Please enter correct city name");
      initialPage();
    }
  })
}

function displayWeatherResult(data) {
  let weatherDescription = data.weather[0].main;
  let currentTemp = data.main.temp;
  let cityName=data.name;

  $('.cityName').append(cityName);
  $('.temp').append(currentTemp + ' &#8457;');
  $('.description').append(weatherDescription);
  $('#icon').html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>" );
  handleSearchMusic();
}

function reset(){
    $('.cityName').html("");
    $('.temp').html("");
    $('.description').html("");
    $('#lastFM').html("");
}

function handleTryAgain(){
  $('#tryAgain').on('click', function(event){
    event.preventDefault();
    console.log("tryAgain ran");
    reset();
    initialPage();
  })
}

function handleSubmit() {
  $('#submit').on('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    console.log("handleSubmit ran");
    let cityName = $('#findCity').val();
    $('#findCity').val('');
    if (cityName == "") {
      alert ("Please enter city name");
    } else {
    getApiWeather(cityName, displayWeatherResult);
    $('.overwall').hide();
    $('.result-container').show(); 
  }
  })
}

function initialPage(){
    $('.overwall').show();
    $('.result-container').hide();
    $('#lastFM').hide();
    handleSubmit();
}

$(initialPage);



// Application name  My application
// API key 5a30f7116e53053e67095ee979140325
// Shared secret b07fdc09ec3c53b15810a5c3ed6e24d8
// Registered to sjcho0813