function ChooserWidget(id, opts) {
    /*
    id = the ID of the HTML element where chooser behaviour should be attached
    opts = dictionary of configuration options, which may include:
        modalWorkflowResponseName = the response identifier returned by the modal workflow to
            indicate that an item has been chosen. Defaults to 'chosen'.
    */

    opts = opts || {};
    var self = this;

    this.chooserElement = $('#' + id + '-chooser');
    this.titleElement = this.chooserElement.find('.title');
    this.inputElement = $('#' + id);
    this.editLinkElement = this.chooserElement.find('.edit-link');

    this.modalResponses = {};
    this.modalResponses[opts.modalWorkflowResponseName || 'chosen'] = function(data) {
        self.setState(data);
    };

    $('.action-choose', this.chooserElement).on('click', function() {
        self.openModal();
    });

    $('.action-clear', this.chooserElement).on('click', function() {
        self.setState(null);
    });
}

ChooserWidget.prototype.getModalURL = function() {
    return this.chooserElement.data('choose-modal-url');
}

ChooserWidget.prototype.openModal = function() {
    ModalWorkflow({
        url: this.getModalURL(),
        onload: GENERIC_CHOOSER_MODAL_ONLOAD_HANDLERS,
        responses: this.modalResponses
    });
};

ChooserWidget.prototype.setState = function(data) {
    if (data) {
        this.inputElement.val(data.id);
        this.titleElement.text(data.string);
        this.chooserElement.removeClass('blank');
        this.editLinkElement.attr('href', data.edit_link);
    } else {
        this.inputElement.val('');
        this.chooserElement.addClass('blank');
    }
};
