$(document).ready(function () {
    toggleGitPosn();
    getScore();

    $('.high_score_btn').hover(function () {
        $('.high_score_btn').animate({marginRight: -3.5 + 'rem'}, 200);
    }, function () {
        $('.high_score_btn').animate({marginRight: -4 + 'rem'}, 200);
    });

    $(window).resize(function () {
        placeHighInput();
        placeSubmitInfo();
        toggleGitPosn();
    });
});

function toggleGitPosn() {
    var $icon = $('.icons a i');

    if ($(window).height() <= 680) {
        $icon.removeClass('fa-github').addClass('fa-github-square');
        $('.icons').offset({top: window.innerHeight * 0.4});
    } else {
        $icon.removeClass('fa-github-square').addClass('fa-github');
        $('.icons').offset({top: window.innerHeight - 100, left: this.left});
    }
}

function showHighScore() {
    var highBtn = $('.high_score_btn'),
        highBrd = $('.high_score_board'),
        highSubmit = $('form.high_score_submit'),
        submit_info = $('.submit_info');

    highBtn.fadeOut('200');
    $('canvas').animate({right: highBrd.width()}, 500);
    $('.icons').animate({right: highBrd.width()/2}, 500);
    if (highSubmit.length) highSubmit.animate({left: highSubmit.position().left - highBrd.width()/2}, 500);
    if (submit_info.length) submit_info.animate({left: submit_info.position().left - highBrd.width()/2}, 500);
    highBrd.show('700');
}

function hideHighScore() {
    var highBtn = $('.high_score_btn'),
        highBrd = $('.high_score_board'),
        highSubmit = $('form.high_score_submit'),
        submit_info = $('.submit_info');

    highBrd.hide('700', function () {
        highBtn.fadeIn('200');
    });
    $('canvas').animate({right: 0}, 500);
    $('.icons').animate({right: 0}, 500);
    if (highSubmit.length) highSubmit.animate({left: highSubmit.position().left + highBrd.width()/2}, 500);
    if (submit_info.length) submit_info.animate({left: submit_info.position().left + highBrd.width()/2}, 500);
}

function placeHighInput() {
    var bgCanvas = $('#bgCanvas');

    $('.high_score_submit').css({top: bgCanvas.offset().top + bgCanvas.height() * 3 / 4,
        left: bgCanvas.offset().left + bgCanvas.width() / 2 - $('.high_score_submit').width() / 2});
}

function checkInput() {
    $('.high_score_submit #inputName').focus(function () {
        if (!keyEvt.getInputStatus()) keyEvt.inputToggle();
    });

    $('.high_score_submit #inputName').blur(function () {
        if (keyEvt.getInputStatus()) keyEvt.inputToggle();
    });
}

function getScore() {
    $.ajax({
        url: "getHighScore.php",
        type: "post",
        success: function (result) {
            showScore(result);
        },

        error: function (textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function showScore(result) {
    var resultArr = JSON.parse(result);

    $.each(resultArr, function (i, val) {
        if (i <= 10) {
            $('.high_score_board table tbody tr:nth-child(' + (i + 1) + ') .userName').text(val[0]);
            $('.high_score_board table tbody tr:nth-child(' + (i + 1) + ') .userScore').text(val[1]);
            $('.high_score_board table tbody tr:nth-child(' + (i + 1) + ') .timeStamp').text(val[2]);
        }
    });
}

function submitScore() {
    var request;

    $('form.high_score_submit').submit(function (e) {

        if (request) request.abort();

        if ($('.submit_info').length) $('.submit_info').remove();

        var $form = $(this),
            $formData = $form.find("input");

        var userData = $form.serializeArray();

        $formData.prop("disabled", true);

        var username = userData[0].value;

        request = $.ajax({
            url: "submitScore.php",
            type: "post",
            data: {'username': username, 'score': game.points},
            success: function (result) {
                if (result === "SUCCESS") {
                    $('.high_score_submit').remove();
                    $('#infoCanvas').after($('<div class="submit_info submit_success">Submitted!</div>'));
                    placeSubmitInfo();
                    getScore();
                } else if (result === "EMPTY") {
                    $('#infoCanvas').after($('<div class="submit_info submit_fail">→_→ Kimi no na wa?</div>'));
                    placeSubmitInfo();
                } else {
                    $('#infoCanvas').after($('<div class="submit_info submit_fail">' + result + '</div>'));
                    placeSubmitInfo();
                }
            },
            error: function (textStatus, errorThrown) {
                $('#infoCanvas').after($('<div class="submit_info submit_fail">An error occurred, try later.</div>'));
                placeSubmitInfo();
                console.log(textStatus, errorThrown);
            },
            complete: function () {
                $formData.prop("disabled", false);
            }
        });

        e.preventDefault();
    });
}

function placeSubmitInfo() {
    var bgCanvas = $('#bgCanvas');

    $('.submit_info').css({top: bgCanvas.offset().top + bgCanvas.height() * 3 / 4 - $('.submit_info').height(),
        left: bgCanvas.offset().left + bgCanvas.width() / 2 - $('.submit_info').width() / 2});
}


