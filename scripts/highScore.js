$(document).ready(function () {
    $('.high_score_btn').hover(function () {
        $('.high_score_btn').animate({marginRight: -3.5 + 'rem'}, 200);
    }, function () {
        $('.high_score_btn').animate({marginRight: -4 + 'rem'}, 200);
    });

});

function showHighScore() {
    var highBtn = $('.high_score_btn'),
        highBrd = $('.high_score_board'),
        highSubmit = $('form.high_score_submit');

    highBtn.fadeOut('200');
    $('canvas').animate({right: highBrd.width()}, 500);
    $('.icons').animate({right: highBrd.width()/2}, 500);
    if (highSubmit.length) highSubmit.animate({left: highSubmit.position().left - highBrd.width()/2}, 500);
    highBrd.show('700');
}

function hideHighScore() {
    var highBtn = $('.high_score_btn'),
        highBrd = $('.high_score_board'),
        highSubmit = $('form.high_score_submit');

    highBrd.hide('700', function () {
        highBtn.fadeIn('200');
    });
    $('canvas').animate({right: 0}, 500);
    $('.icons').animate({right: 0}, 500);
    if (highSubmit.length) highSubmit.animate({left: highSubmit.position().left + highBrd.width()/2}, 500);
}

function placeHighInput() {
    var bgCanvas = $('#bgCanvas');

    $('.high_score_submit').css({top: bgCanvas.offset().top + bgCanvas.height() * 3 / 4,
        left: bgCanvas.offset().left + bgCanvas.width() / 2 - $('.high_score_submit').width() / 2})
}

function checkInput() {
    $('.high_score_submit #inputName').focus(function () {
        if (!keyEvt.getInputStatus()) keyEvt.inputToggle();
    });

    $('.high_score_submit #inputName').blur(function () {
        if (keyEvt.getInputStatus()) keyEvt.inputToggle();
    });
}

