require.config({
    baseUrl: '/js',
    paths: {
        'jquery': '/jquery/dist/jquery.min'
    }
});

require(['jquery'], function () {
    
    function lazyLoad($poContainer) {

        var lstrSource = $poContainer.attr('data-src');
        var lstrPosition = $poContainer.attr('data-position');

        $('<img>').attr('src', lstrSource).load(function () {
            $poContainer.css('background-image', 'url("' + lstrSource + '")');
            $poContainer.css('background-position', lstrPosition);
            $poContainer.css('-ms-filter', '"progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + lstrSource + '\', sizingMethod=\'scale\')"');
            $poContainer.css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + lstrSource + '\', sizingMethod=\'scale\'');
        });
    }

    function initPage() {

        var $jumbotron = $('.jumbotron');

        $jumbotron.css({height: ($(window).height()) + 'px'});

        lazyLoad($jumbotron);

        $(window).on('resize', function () {
            $jumbotron.css({height: ($(window).height()) + 'px'});
        });
    }

    initPage();
});