var locale = ''; 
var temp = '';
var humidity=''; 
var description='';
var icon = '';

String.prototype.capitalize = function(){
	return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase();
} 


function switchUnit(){
	var switcher = $('.switch');
	if (switcher.hasClass('metric')){
		switcher.removeClass('metric');
		switcher.addClass('imperial');
		switcher.css('background', '#1B998B');
		switcher.text("View In Metric");
	}else{
		switcher.removeClass('imperial');
		switcher.addClass('metric');
		switcher.css('background', 'linear-gradient(to right, red , white,blue)');
		switcher.text("Back To Freedom Units");
	}
	if (switcher.hasClass('metric')){
		temp = Math.round(((temp - 32) * 5)/9);
		$('.temp p').remove();
		$('.temp').append("<p>"+temp+"&deg;C</p>");
	}else{
		temp = Math.round(((temp * 9)/5) + 32);
		$('.temp p').remove();
		$('.temp').append("<p>"+temp+"&deg;F</p>");
	}

}

function weatherCheck(temp){
	if (temp > 90){
		$('html').css('background-image',"url('img/hot.jpg')");
	}else if(temp > 70){
		$('html').css('background-image',"url('img/mild.jpg')");
	}else if (temp < 40){
		$('html').css('background-image',"url('img/cold.jpg')");
	}else{ }
}

function applyWeather(){
	var iconUrl = "http://openweathermap.org/img/w/"+icon+".png";
	console.log(iconUrl);
	$('.icon').html("<img src="+iconUrl+" alt = 'Weather Icon'></img>");
	$('.temp').append("<p>"+temp+"&deg;F</p>");
	$('.humidity').append("<p>"+humidity+"%</p>");
	$('.description').append("<p>"+description.capitalize()+"</p>");
}

function getWeather(city){
	var url = 'http://api.openweathermap.org/data/2.5/weather?q='
	city = locale;
	var appID= '&APPID=1bc98b1be270e7bd6ff7b2cad2497de8';
	$.ajax({
		url: url+locale+appID,
		success: function(data){
			temp = Math.floor(data.main.temp/7.867);
			humidity = data.main.humidity;
			description = data.weather[0].description;
			icon = data.weather[0].icon;
			console.log(icon);
			weatherCheck(temp);
			applyWeather();
			
		}
	})
}

function getLocation(){
	$.get("http://ipinfo.io", function(response) {
  		locale = response.city+','+response.country;
   		$('#weather-header').text("Local Weather For " + response.city+', '+response.region);
  		getWeather(locale);
	}, "jsonp")
}


$(document).ready(function(){
	getLocation();
	$('.switch').on('click',function(){
		switchUnit();
	});
});