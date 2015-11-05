$(document).ready(function() {

  // save the current web domain
  var _root = location.protocol + '//' + location.host;

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


  ////// API logic //////

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
  // assign listener to submit
  $('#word-list-submit-button').on('click', function() {
    var $this = $(this);
    var minRank = $this.siblings('.minrank').val();
    var maxRank = $this.siblings('.maxrank').val();
    var verbose = $this.siblings('.verbose-radio').find('.verbose-true').is(":checked");
    var url = '/api/words/list?minrank=' + minRank + '&maxrank=' + maxRank + '' + (verbose === true ? '&verbose=true' : '');
    $('#word-list-get-string').val(_root + url);
    reqWordList(url);
  });


  // random list request and display
  var reqRandomWordList = function(url) {
    var $output = $('#random-list-response-output');
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
  // assign listener to submit
  $('#random-list-submit-button').on('click', function() {
    var $this = $(this);
    var listSize = $this.siblings('.collection-size').val();
    var minRank = $this.siblings('.minrank').val();
    var maxRank = $this.siblings('.maxrank').val();
    var verbose = $this.siblings('.verbose-radio').find('.verbose-true').is(":checked");
    var url = '/api/words/randomlist?size=' + listSize + '&minrank=' + minRank + '&maxrank=' + maxRank + '' + (verbose === true ? '&verbose=true' : '');
    $('#random-list-get-string').val(_root + url);
    reqRandomWordList(url);
  });


  // get rank of word request and display
  var reqRankByWord = function(url) {
    var $output = $('#word-rank-response-output');
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
  // assign listener to submit
  $('#word-rank-submit-button').on('click', function() {
    var $this = $(this);
    var wordName = $this.siblings('.word-name').val();
    var verbose = $this.siblings('.verbose-radio').find('.verbose-true').is(":checked");
    var url = '/api/words/getrank?word=' + wordName + '' + (verbose === true ? '&verbose=true' : '');
    $('#word-rank-get-string').val(_root + url);
    reqRankByWord(url);
  });


  // get word by rank request and display
  var reqWordByRank = function(url) {
    var $output = $('#search-rank-response-output');
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
  // assign listener to submit
  $('#search-rank-submit-button').on('click', function() {
    var $this = $(this);
    var wordRank = $this.siblings('.word-rank').val();
    var verbose = $this.siblings('.verbose-radio').find('.verbose-true').is(":checked");
    var url = '/api/words/searchrank?rank=' + wordRank + '' + (verbose === true ? '&verbose=true' : '');
    $('#search-rank-get-string').val(_root + url);
    reqWordByRank(url);
  });


  ////// Init the client //////

  // start api-body panels closed
  $('.api-body').hide();

  // init the client with example requests
  var wordListExUrl = _root + '/api/words/list?minrank=1&maxrank=5';
  reqWordList(wordListExUrl);
  $('#word-list-get-string').val(wordListExUrl);

  var randomListExUrl = _root + '/api/words/randomlist?size=5&minrank=1&maxrank=100';
  reqRandomWordList(randomListExUrl);
  $('#random-list-get-string').val(randomListExUrl);

  var getRankExUrl = _root + '/api/words/getrank?word=happy';
  reqRankByWord(getRankExUrl);
  $('#word-rank-get-string').val(getRankExUrl);

  var searchRankExUrl = _root + '/api/words/searchrank?rank=100';
  reqWordByRank(searchRankExUrl);
  $('#search-rank-get-string').val(searchRankExUrl);

  // add listeners to toggle show/hide and active class on .api-header click
  $('.api-header').on('click', function() {
    $(this).toggleClass('api-header-active').next().slideToggle(500);
  });

});
