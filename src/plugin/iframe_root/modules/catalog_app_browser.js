define(['bluebird', 'kb_common/dom', 'kb_common/html', 'kbaseUI/widget/widgetSet'], function (
    Promise,
    DOM,
    html,
    WidgetSet
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    function widget(config) {
        var mount,
            container,
            runtime = config.runtime,
            widgetSet = new WidgetSet({ runtime: runtime, widgetManager: runtime.service('widget').widgetManager }),
            layout;

        // Mini widget manager
        // TODO: the jquery name should be stored in the widget definition not here.
        function render() {
            // the catalog home page is simple the catalog browser
            return div({
                id: widgetSet.addWidget('catalog_browser', {
                    jqueryName: 'KBaseCatalogBrowser',
                    jquery_name: 'KBaseCatalogBrowser'
                }),
                dataKBTesthookPlugin: 'catalog'
            });
        }

        layout = render();

        // Widget Interface Implementation

        function init(config) {
            return Promise.try(function () {
                return widgetSet.init(config);
            });
        }
        function attach(node) {
            runtime.send('ui', 'setTitle', 'App Catalog');
            mount = node;
            container = mount.appendChild(DOM.createElement('div'));
            container.innerHTML = layout;
            // mount.appendChild(container);
            return widgetSet.attach();
        }
        function start(params) {
            return Promise.try(function () {
                return widgetSet.start(params);
            });
        }
        function run(params) {
            return widgetSet.run(params);
        }
        function stop() {
            return widgetSet.stop();
        }
        function detach() {
            runtime.send('ui', 'setTitle', '');
            return widgetSet.detach();
        }
        function destroy() {
            return widgetSet.destroy();
        }

        // Widget Interface
        return {
            init: init,
            attach: attach,
            start: start,
            run: run,
            stop: stop,
            detach: detach,
            destroy: destroy
        };
    }

    return {
        make: function (config) {
            return widget(config);
        }
    };
});
