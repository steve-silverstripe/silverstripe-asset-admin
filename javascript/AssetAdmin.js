/**
 * File: AssetAdmin.js
 */

(function($) {
	$.entwine('ss', function($){
		/**
		 * Load folder detail view via controller methods
		 * rather than built-in GridField view (which is only geared towards showing files).
		 */
		$('.AssetAdmin.cms-edit-form .ss-gridfield-item').entwine({
			onclick: function(e) {
				// Let actions do their own thing
				if($(e.target).closest('.action').length) {
					this._super(e);
					return;
				}

				var grid = this.closest('.ss-gridfield');
				if(this.data('class') == 'Folder') {
					var url = grid.data('urlFolderTemplate').replace('%s', this.data('id'));
					$('.cms-container').loadPanel(url);
					return false;
				}

				this._super(e);
			}
		});

		$('.AssetAdmin.cms-edit-form .ss-gridfield .col-buttons .action.gridfield-button-delete, .AssetAdmin.cms-edit-form .Actions button.action.action-delete').entwine({
			onclick: function(e) {
				var msg;
				if(this.closest('.ss-gridfield-item').data('class') == 'Folder') {
					msg = ss.i18n._t('AssetAdmin.ConfirmDelete');
				} else {
					msg = ss.i18n._t('TABLEFIELD.DELETECONFIRMMESSAGE');
				}
				if(!confirm(msg)) return false;

				this.getGridField().reload({data: [{name: this.attr('name'), value: this.val()}]});
				e.preventDefault();
				return false;
			}
		});

		$('.AssetAdmin.cms-edit-form :submit[name=action_delete]').entwine({
			onclick: function(e) {
				if(!confirm(ss.i18n._t('AssetAdmin.ConfirmDelete'))) return false;
				else this._super(e);
			}
		});

		/**
		 * Prompt for a new foldername, rather than using dedicated form.
		 * Better usability, but less flexibility in terms of inputs and validation.
		 * Mainly necessary because AssetAdmin->AddForm() returns don't play nicely
		 * with the nested AssetAdmin->EditForm() DOM structures.
		 */
		$('.AssetAdmin .cms-add-folder-link').entwine({
			onclick: function(e) {
				var name = prompt(ss.i18n._t('Folder.Name'));
				if(!name) return false;

				this.closest('.cms-container').loadPanel(this.data('url') + '&Name=' + name);
				return false;
			}
		});

		$('.AssetAdmin .gallery__back').entwine({
			onmatch: function () {
				$('.cms-add-folder-link').css('margin-left', 32);
			},
			onunmatch: function () {
				$('.cms-add-folder-link').css('margin-left', 0);
			}
		})
	});
}(jQuery));
