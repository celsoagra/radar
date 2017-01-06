const HALF = 958;
const ALL = 958;
const PERC = '%';

$(document).ready(function () {
  var items = [];
  $.each( data, function( key, val ) {
    var type = '';
    if (val.type) {
      type = ' dot-' + val.type;
    }

    $( "<div />", {
      "class": "dot tooltip" + type,
      "style" : val.position,
      html: getTooltip (val)
    }).appendTo( "#radar" );
  });

  document.onmousedown = handleMouseDown;
});

function handleMouseDown(event) {
    var left = right = 0;
    var top = bottom = 0;
    var calcX, calcY;

    event = event || window.event; // IE-ism

    var elementRadar = document.getElementById('radar').getClientRects()[0];
    var elementRadarX = event.clientX - elementRadar.left;
    var elementRadarY = event.clientY - elementRadar.top;

    calcX = (elementRadarX) * 100 / ALL;
    left = Math.floor(calcX);
    
    calcy = (elementRadarY) * 100 / ALL;
    top = Math.floor(calcy);

    console.log(elementRadarX, elementRadarY);

    $('#left').html(left + PERC);
    $('#top').html(top + PERC);
}

function getTooltip(json) {
  var span = $( "<span />", {
      "class": "tooltiptext"
  });
  span.append( getTooltipHeader(json.name) );
  
  if (json.version) {
    span.append( getTooltipElement(json.version, 'Version') );
  }
  
  span.append( getTooltipElement(json.description) );
  
  if (json.responsible || json.responsible_email) {
    span.append( getTooltipElement(json.responsible + ' | ' + json.responsible_email, 'Responsible') );  
  }

  if (json.link) {
    span.append( getTooltipElement('<a style="color:white;" href="' + json.link + '" >access link</a>') );
  }

  return span;
}

function getTooltipHeader(name) {
  var value = '<strong>' + name + '</strong><hr/>';
  return $( "<p />", { html: value });
}

function getTooltipElement(value, name) {
  if (name) {
    value = name + ': ' + value;
  }

  return $( "<p />", { html: value });
}