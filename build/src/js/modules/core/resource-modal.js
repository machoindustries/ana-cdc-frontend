/*eslint spaced-comment: 0 */
/*eslint no-new: 0 */
/*eslint func-names: 0 */
/*eslint prefer-arrow-callback: 0 */

/* global $ */
import { Reveal } from 'foundation-sites';

/**
 * This is an example module that is bundled into main app.js file
 */
export default class ResourceModal {
  /**
   * Sets up the example widget
   * @param {HTMLElement} el - The widget's DOM element
   */
  constructor(el) {
    module.$el = $(el);
    module.$modal = $('.resource-modal');
    if (!module.$modal.length) {
      const template = `
      <div class="resource-modal reveal" id="resource-modal" data-reveal>
      <div class="resource-modal-content">
      </div>
      <button class="close-button" data-close aria-label="Close modal" type="button">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `;
      module.$modal = $(template);
      module.$modal.appendTo('body');
      new Reveal(module.$modal);
    }
    module.$modalContent = module.$modal.find('.resource-modal-content');

    module.$el.on('click', "*[data-open='resource-modal']", function () {
      module.$modalContent.html(decodeURIComponent($(this).data('embeded-content')));
    });

    $('#resource-modal').on('closed.zf.reveal', function () {
      module.$modalContent.html('');
    });
  }

  /**
   * Unload the widget
   */
  unload() {
    this.el.innerHTML = 'Core Example Module unloaded';
  }
}
