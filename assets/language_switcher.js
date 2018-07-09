/**
 * Backend language switcher
 *
 * @author John J. Camilleri
 * @version 0.1
 */
(function($) {
	$(function() {
		$('#session ul').prepend(
			$('<li class="backend-language-switcher-ctn"><span>Language: </span><ul class="backend-language-switcher" /></li>')
		);
		for (var i in Symphony.Languages) {
			var lang = Symphony.Languages[i];
			$('#session ul.backend-language-switcher').append(
				// Nav menu item
				$('<li />')
					.addClass('backend_language_switcher')
					.addClass(lang)
					.addClass(lang == Symphony.Author.language ? 'selected' : '')
					.addClass(i == 0 ? 'first' : '' )
					.addClass(i == (Symphony.Languages.length-1) ? 'last' : '' )
					.attr({
						'title':'Change to '+lang,
						'lang':lang
					})
					// Flag image
					.text(lang)
					// Click handler - Construct request to change user language
					.click(function(){
						var li = $(this);
						var lang = li.attr('lang');
						var url = Symphony.Context.get('root') + '/symphony/system/authors/edit/' + Symphony.Author.id + '/';
						var data = {
							'action[save]' 				: true,
							'fields[default_section]'	: Symphony.Author.default_section,
							'fields[email]'				: Symphony.Author.email,
							'fields[first_name]'		: Symphony.Author.first_name,
							'fields[last_name]'			: Symphony.Author.last_name,
							'fields[username]'			: Symphony.Author.username,
							'fields[language]'			: lang,
							'xsrf': Symphony.Utilities ? Symphony.Utilities.getXSRF() : ''
						}
						$.post(url, data, function(data, textStatus){
							// Callback function, reload page
							window.location.reload();
						});
					})
			);
		}

	});
})(jQuery);
