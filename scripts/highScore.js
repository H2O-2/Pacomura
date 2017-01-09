$(document).ready(function () {
    $('.high_score_btn').hover(function () {
        $('.high_score_btn').animate({marginRight: -3.5 + 'rem'}, 200);
    }, function () {
        $('.high_score_btn').animate({marginRight: -4 + 'rem'}, 200);
    })
});

function showHighScore() {
    var highBtn = $('.high_score_btn'),
        highBrd = $('.high_score_board');

    highBtn.fadeOut('200');
    $('canvas').animate({right: highBrd.width()}, 600);
    $('.icons').animate({right: highBrd.width()/2}, 600);
    highBrd.show('700');
}

function hideHighScore() {
    var highBtn = $('.high_score_btn'),
        highBrd = $('.high_score_board');

    highBrd.hide('700', function () {
        highBtn.fadeIn('200');
    });
    $('canvas').animate({right: 0}, 600);
    $('.icons').animate({right: 0}, 600);

}