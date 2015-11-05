$(document).ready(function() {

  // the JSON prettifyer
  function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }


  // word list request and display
  var reqWordList = function(url) {
    var $output = $('#word-list-response-output');
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      beforeSend: function() {
        $output.html('loading...');
      },
      success: function(data) {
        $output.html(syntaxHighlight(JSON.stringify(data, null, 4)));
      },
      error: function(xhr, status, errorThrown) {
        throw new Error('Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
      }
    });
  };
  // init the client with a request
  reqWordList('http://localhost:8080/api/words/list?minrank=1&maxrank=5');
  // assign listener to submit
  $('#word-list-submit-button').on('click', function() {
    var $this = $(this);
    var minRank = $this.siblings('.minrank').val();
    var maxRank = $this.siblings('.maxrank').val();
    var verbose = $this.siblings('.verbose-radio').find('.verbose-true').is(":checked");
    var url = 'api/words/list?minrank=' + minRank + '&maxrank=' + maxRank + '' + (verbose === true ? '&verbose=true' : '');
    $('#word-list-get-string').val('http://localhost:8080/' + url);
    reqWordList(url);
  });


  // random list request and display
  var reqRandomWordList = function(url) {
    var $output = $('#random-list-response-output');
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $output.html(syntaxHighlight(JSON.stringify(data, null, 4)));
      },
      error: function(xhr, status, errorThrown) {
        throw new Error('Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
      }
    });
  };
  // init the client with a request
  reqRandomWordList('http://localhost:8080/api/words/randomlist?size=5&minrank=1&maxrank=100');
  // assign listener to submit
  $('#random-list-submit-button').on('click', function() {
    var $this = $(this);
    var listSize = $this.siblings('.collection-size').val();
    var minRank = $this.siblings('.minrank').val();
    var maxRank = $this.siblings('.maxrank').val();
    var verbose = $this.siblings('.verbose-radio').find('.verbose-true').is(":checked");
    var url = 'api/words/randomlist?size=' + listSize + '&minrank=' + minRank + '&maxrank=' + maxRank + '' + (verbose === true ? '&verbose=true' : '');
    $('#random-list-get-string').val('http://localhost:8080/' + url);
    reqRandomWordList(url);
  });

  // start api-body panels closed
  // $('.api-body').hide();

  // toggle show/hide and active class on .api-header click
  $('.api-header').on('click', function() {
    $(this).toggleClass('api-header-active').next().slideToggle('fast');
  });



});
