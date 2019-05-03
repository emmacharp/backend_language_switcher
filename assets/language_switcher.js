/**
 * Backend language switcher
 *
 * @author John J. Camilleri
 * @version 1.0.0
 */
(function($) {

	'use strict';

	var init = function () {

		if (window.Symphony.Languages.length <= 1) {
			return;
		}

		$('.js-session-panel').prepend($('<li class="backend-language-switcher"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="18" height="18" rx="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.46024 2.21765L17.7823 13.5398M13.5397 17.7824L2.21759 6.46029" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="10" cy="10" rx="3" ry="7.8262" transform="rotate(45 10 10)" stroke="currentColor" stroke-width="2"/></svg></li>'));

		for (var i in window.Symphony.Languages) {
			var lang = window.Symphony.Languages[i];
			$('.backend-language-switcher').append(
				// Nav menu item
				$('<button />')
					.addClass('backend_language_switcher')
					.addClass(lang)
					.addClass(lang == window.Symphony.Author.language ? 'selected' : '')
					.attr({
						'title': 'Change to ' + lang,
						'lang': lang
					})
					.text(lang)
					// Click handler - Construct request to change user language
					.click(function(event){
						var li = $(this);
						var lang = li.attr('lang');
						var url = window.Symphony.Context.get('root') + '/symphony/system/authors/edit/' + window.Symphony.Author.id + '/';
						var data = {
							'action[save]' 				: true,
							'fields[default_section]'	: window.Symphony.Author.default_section,
							'fields[email]'				: window.Symphony.Author.email,
							'fields[first_name]'		: window.Symphony.Author.first_name,
							'fields[last_name]'			: window.Symphony.Author.last_name,
							'fields[username]'			: window.Symphony.Author.username,
							'fields[language]'			: lang,
							'xsrf': window.Symphony.Utilities ? window.Symphony.Utilities.getXSRF() : ''
						}
						$.post(url, data, function(data, textStatus){
							// Callback function, reload page
							window.location.reload();
						});
						event.preventDefault();
						event.stopPropagation();
					})
			);
		}
	};

	$(init);

})(jQuery);
