
// Timer #6230
$(function(){
	var $launched = false;

	function roundPlus(x, n) { //x - число, n - количество знаков
		if(isNaN(x) || isNaN(n)) return false;
		var m = Math.pow(10,n);
		return Math.round(x*m)/m;
	}

	function checkSubmit() {
		if($('#issue_notes').val() == '') {
			$('input[name="commit"]').attr('disabled', 'disabled');
			$(window).on("beforeunload", function(event) {
				return $launched ? "Работает таймер" : $('#time_entry_hours').val() != '' ? 'Затраченое время не сохранено' : '' ;
			});
		} else {
			$('input[name="commit"]').removeAttr('disabled');
			$(window).unbind("beforeunload");
		}
	}


	$.getScript('http://[YOUR-PUBLIC-SERVER-FOLDER]/js/issues/flipclock.min.js', function() {
		$('#update #time_entry_hours').parent().parent().html('<p><label for="time_entry_hours">Затраченное время</label><input id="time_entry_hours" name="time_entry[hours]" size="6" type="text"> час(а,ов)</p><div id="redmine_issue_timer_container"><span id="redmine_issue_timer_clock">00:00:00</span><a href="javascript:void(0);" id="redmine_issue_timer_play_button" class="redmine_issue_timer_btn play">Запустить</a><a href="javascript:void(0);" id="redmine_issue_timer_pause_button" class="redmine_issue_timer_btn pause">Пауза</a></div>');
		$('#redmine_issue_timer_container').css('margin-left', '175px').css('background', 'none').css('margin-bottom', '12px');
		$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'http://[YOUR-PUBLIC-SERVER-FOLDER]/css/timer.css') );

		$('<a href="javascript:void(0);" id="redmine_issue_edit_and_timer_start_button" class="redmine_issue_timer_btn play">Запустить таймер</a>').css('margin-right', '10px').css('display', 'inline').insertBefore($('#content > .contextual:first > a:first'));

		var $timer = $(document.createElement('div')).FlipClock({
			autoStart: false,
			callbacks: {
				start: function() {
					$launched = true;
					checkSubmit();
				},
				interval: function() {
					var time = $timer.time.getSeconds();

					var text = ("0" + $timer.time.getHours(true)).slice(-2) +  ":" + ("0" + $timer.time.getMinutes(true)).slice(-2) +  ":" + ("0" + $timer.time.getSeconds(true)).slice(-2);

					$('#redmine_issue_timer_clock').text(text);
					$('#time_entry_hours').val(roundPlus($timer.time.getSeconds() / 60 / 60 , 4));
				},
				stop: function() {
					$launched = false;
					checkSubmit();
				}
			}
		});

		$('#redmine_issue_timer_play_button').on('click', function(event) {
			$timer.start();
		});
		$('#redmine_issue_timer_pause_button').on('click', function(event) {
			$timer.stop();
		});

		$('#redmine_issue_edit_and_timer_start_button').on('click', function(event) {
			showAndScrollTo("update", "issue_notes");
			$timer.start();
			return false;
		});

		$('#issue_notes').keyup(function() {
			checkSubmit();
		});

	});
});
