var lat ='';
var lon = '';
var temp = '';
var humidity=''; 
var description='';
var icon = '';

String.prototype.capitalize = function(){
	return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase();
} 

String.prototype.replaceAll = function(search,replacement){
	return this.replace(new RegExp(search,'g'), replacement);
}

function skycon(){
	var skycons = new Skycons({"color": "white"});
	if (icon == 'CLEAR-DAY'){
		skycons.add("icon1", Skycons.CLEAR_DAY);
		skycons.play();
	}else if (icon == 'CLEAR-NIGHT'){
		skycons.add("icon1", Skycons.CLEAR_NIGHT);
		skycons.play();
	}else if (icon == 'PARTLY-CLOUDY-DAY'){
		skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
		skycons.play();
	}else if (icon == 'PARTLY-CLOUDY-NIGHT'){
		skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
		skycons.play();
	}else if(icon == 'CLOUDY'){
		skycons.add("icon1", Skycons.CLOUDY);
		skycons.play();
	}else if(icon == 'RAIN'){
		skycons.add("icon1", Skycons.RAIN);
		skycons.play();
	}else if(icon =='SLEET'){
		skycons.add("icon1", Skycons.SLEET);
		skycons.play();
	}else if(icon == 'SNOW'){
		skycons.add("icon1", Skycons.SNOW);
		skycons.play();
	}else if(icon == 'WIND'){
		skycons.add("icon1", Skycons.WIND);
		skycons.play();
	}else if (icon =='FOG'){
		skycons.add("icon1", Skycons.FOG);
		skycons.play();
	}else{
		skycons.add('icon1', Skycons.PARTLY-CLOUDY-DAY);
	}

}

function switchUnit(){
	var switcher = $('.switch');
	if (switcher.hasClass('metric')){
		switcher.removeClass('metric');
		switcher.addClass('imperial');
		switcher.css('background', '#1B998B');
		switcher.text("View In Metric");
		temp = Math.round(((temp * 9)/5) + 32);
		$('.temp p').remove();
		$('.temp').append("<p>"+temp+"&deg;F</p>");
	}else{
		switcher.removeClass('imperial');
		switcher.addClass('metric');
		switcher.css('background', 'linear-gradient(to right, red , white,blue)');
		switcher.text("Back To Freedom Units");
		temp = Math.round(((temp - 32) * 5)/9);
		$('.temp p').remove();
		$('.temp').append("<p>"+temp+"&deg;C</p>");
	}
}

function weatherCheck(temp){
	if (temp > 90){
		$('html').css('background-image',"url('img/hot.jpg')");
		$('#weather-header').css('color','#DEDEDE');
		$('.blocks-container').css('color','#DEDEDE');
	}else if(temp > 40){
		$('html').css('background-image',"url('img/mild.jpg')");
		$('#weather-header').css('color','#DEDEDE');
		$('.blocks-container').css('color','#DEDEDE');
	}else if (temp > 40){
		$('html').css('background-image',"url('img/cold.jpg')");
	}else{ }
}

function applyWeather(){
	$('.temp').append("<p>"+temp+"&deg;F</p>");
	$('.humidity').append("<p>"+humidity+"%</p>");
	$('.description').append("<p>"+description.capitalize()+"</p>");
}

function getWeather(){
	var url = 'https://api.darksky.net/forecast/';
	var apiKey = '328d10b238023b05e8684a8c1ddb8a47/'
	var position = lat+','+lon;
	url += apiKey+position;
	$.ajax({
		url: url,
		crossDomain:true,
		dataType:'jsonp',
		success: function(data){
			temp = Math.floor(data.currently.temperature);
			humidity = (data.currently.humidity)*100;
			humidity = Math.round(humidity);
			description = data.currently.summary;
			icon = data.currently.icon.toUpperCase();
			applyWeather();
			weatherCheck(temp);
			skycon();
		}
	})
}

function getLocation(){
	$.ajax({
		url:"https://ipinfo.io",
		crossDomain: true,
		dataType: 'jsonp',
		success:function(response){
			locale = response.loc.split(',');
	  		lat = locale[0];
	  		lon = locale[1];
	   		$('#weather-header').text(response.city+', '+response.region);
	   		getWeather();
		}
	})
}

$(document).ready(function(){
	getLocation();
	$('.switch').on('click',function(){
		switchUnit();
	});
});