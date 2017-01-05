$(document).ready(function () {
  var items = [];
  $.each( data, function( key, val ) {
    $( "<div />", {
      "class": "dot tooltip",
      "style" : val.position,
      html: getTooltip (val)
    }).appendTo( "#radar" );
  });

  
});

function getTooltip(json) {
  var span = $( "<span />", {
      "class": "tooltiptext"
  });
  span.append( getTooltipHeader(json.name) );
  span.append( getTooltipElement(json.version, 'Version') );
  span.append( getTooltipElement(json.description) );
  span.append( getTooltipElement(json.responsible + ' | ' + json.responsible_email, 'Responsible') );
  span.append( getTooltipElement('<a style="color:white;" href="' + json.link + '" >access link</a>') );

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