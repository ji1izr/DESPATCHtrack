function getNow(form){
 var dNow=new Date();
 var dNYear=new String(dNow.getUTCFullYear());
 var dNMonth=new String(dNow.getUTCMonth()+1);
 if (dNMonth.length<=1){
  dNMonth="0"+dNMonth;
 }
 var dNDate=new String(dNow.getUTCDate());
 if (dNDate.length<=1){
  dNDate="0"+dNDate;
 }
 var dND=dNYear+"-"+dNMonth+"-"+dNDate;
 form.udate.value=dND;
 var dNHour=new String(dNow.getUTCHours());
 if (dNHour.length<=1){
  dNHour="0"+dNHour;
 }
 var dNMinute=new String(dNow.getUTCMinutes());
 if (dNMinute.length<=1){
  dNMinute="0"+dNMinute;
 }
 var dNSecond=new String(dNow.getUTCSeconds());
 if (dNSecond.length<=1){
  dNSecond="0"+dNSecond;
 }
 var dNT=dNHour+":"+dNMinute+":"+dNSecond;
 form.utime.value=dNT;
 checkDateTime(form);
}
function setUnixTime(form){
 var fUdate=form.udate.value;
 var fUtime=form.utime.value;
 var ymd=fUdate+"T"+fUtime+"Z";
 form.utcTime.value=ymd;
 var dT=new Date(form.utcTime.value);
 var dS1=dT.getTime();
 var dS2=Math.floor(dS1/1000);
 form.time.value=dS2;
}
function checkDateTime(form){
 if (form.udate.value<"2014-12-03"){
  form.udate.value="2014-12-03";
 }
 if (form.udate.value=="2014-12-03"){
  if (form.utime.value<"06:20:12"){
   form.utime.value="06:20:12";
  }
 }
 setUnixTime(form);
}
function getInfo(form){
 var dTime=form.time.value;
 var dLat=form.lat.value;
 var dLon=form.lon.value;
 var dAlt=form.alt.value;
 var dPara='http://api.artsat.jp/despatch/track.json?time='+dTime+'&lat='+dLat+'&lon='+dLon+'&alt='+dAlt;
 var request=new XMLHttpRequest();
 request.open('GET',dPara,false);
 request.send();
 if (request.status==200){
  jresdata=request.responseText;
  var data=JSON.parse(jresdata);

  var dataTime="Unix Time:"+data.time;
  document.getElementById("unixtime").innerHTML=dataTime;

  var elevation_p6=data.elevation.toFixed(2);
  var dataElevation="Elevation:"+elevation_p6;
  document.getElementById("elevation").innerHTML=dataElevation;

  var azimuth_p6=data.azimuth.toFixed(2);
  var dataAzimuth="Azimuth:"+azimuth_p6;
  document.getElementById("azimuth").innerHTML=dataAzimuth;

  var down_freq=437.325*data.doppler_down;
  var down_freq_p6=down_freq.toFixed(6);
  var dataFreq="Frequency:"+down_freq_p6+"MHz";
  document.getElementById("frequency").innerHTML=dataFreq;

  var distance_km=data.distance/1000;
  distance_km=distance_km.toFixed(0);
  var vdistance_km=addFigure(distance_km);
  var dataDistance="Distance:"+vdistance_km+"km";
  document.getElementById("distance").innerHTML=dataDistance;

  var declination_p6=data.declination.toFixed(2);
  var dataDeclination="Declination:"+declination_p6;
  document.getElementById("declination").innerHTML=dataDeclination;

  var right_ascension_p6=data.right_ascension.toFixed(2);
  var dataRight_ascension="Right Ascension:"+right_ascension_p6;
  document.getElementById("right_ascension").innerHTML=dataRight_ascension;

  var dataPhase="Phase:"+data.phase;
  document.getElementById("phase").innerHTML=dataPhase;

 }
}
function addFigure(numVal) {
  if (numVal == ''){
    return '';
  }
 numVal = numVal.toString().replace(/,/g, "").trim();
  if ( !/^[+|-]?(\d*)(\.\d+)?$/.test(numVal) ){
      return numVal;
  }
  var numData = numVal.toString().split('.');
  numData[0] = Number(numData[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numData.join('.');
}
