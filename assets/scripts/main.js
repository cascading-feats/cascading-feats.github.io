// Main JS for Cascading Linear Features project page

// Color-matched hover tooltips for the "Discovered Sycophancy Concepts" figure.
// Every highlighted token is underlined in the color of the concept it belongs
// to. On hover we show a small popup that names that concept (matched to the
// legend on the right), its autointerpretability description, and the activation
// value. This replaces the unreliable native `title` tooltip (and the confusing
// "?" help cursor) with an instant, clearly-labeled indicator.
(function () {
    function initConceptTooltips() {
        var tokens = document.querySelectorAll('.concepts-viz .cv-response-text .cv-hl');
        if (!tokens.length) return;

        var tip = document.createElement('div');
        tip.className = 'cv-tooltip';
        tip.setAttribute('role', 'tooltip');
        tip.style.display = 'none';
        tip.innerHTML =
            '<div class="cv-tooltip-name">' +
                '<span class="cv-tooltip-swatch"></span>' +
                '<span class="cv-tooltip-name-text"></span>' +
            '</div>' +
            '<div class="cv-tooltip-desc"></div>' +
            '<div class="cv-tooltip-act"></div>';
        document.body.appendChild(tip);

        var swatchEl = tip.querySelector('.cv-tooltip-swatch');
        var nameEl = tip.querySelector('.cv-tooltip-name-text');
        var descEl = tip.querySelector('.cv-tooltip-desc');
        var actEl = tip.querySelector('.cv-tooltip-act');

        // Parse "Concept 97: Formal honorific salutations ... (activation: 0.652)"
        function parseTip(raw) {
            var out = { name: raw, desc: '', act: '' };
            var colon = raw.indexOf(':');
            if (colon !== -1) {
                out.name = raw.slice(0, colon).trim();
                var rest = raw.slice(colon + 1).trim();
                var m = rest.match(/^(.*?)\s*\(activation:\s*([\d.]+)\)\s*$/i);
                if (m) {
                    out.desc = m[1].trim();
                    out.act = m[2];
                } else {
                    out.desc = rest;
                }
            }
            return out;
        }

        function show(el) {
            var info = parseTip(el.getAttribute('data-tip') || '');
            // The token's underline color is the concept's color in the legend.
            var color = getComputedStyle(el).borderBottomColor || '#2d3436';
            swatchEl.style.backgroundColor = color;
            nameEl.textContent = info.name;
            nameEl.style.color = color;
            tip.style.borderTopColor = color;
            descEl.textContent = info.desc;
            descEl.style.display = info.desc ? '' : 'none';
            actEl.textContent = info.act ? ('Activation: ' + info.act) : '';
            actEl.style.display = info.act ? '' : 'none';
            tip.style.display = 'block';
        }

        function move(e) {
            if (tip.style.display === 'none') return;
            var pad = 14;
            var w = tip.offsetWidth;
            var h = tip.offsetHeight;
            var x = e.clientX + pad;
            var y = e.clientY + pad;
            if (x + w > window.innerWidth - 8) x = e.clientX - w - pad;
            if (y + h > window.innerHeight - 8) y = e.clientY - h - pad;
            tip.style.left = Math.max(8, x) + 'px';
            tip.style.top = Math.max(8, y) + 'px';
        }

        function hide() {
            tip.style.display = 'none';
        }

        for (var i = 0; i < tokens.length; i++) {
            var el = tokens[i];
            // Move the native title into data-tip so the slow OS tooltip no longer
            // fires, while keeping the concept info available for our popup.
            if (el.hasAttribute('title')) {
                el.setAttribute('data-tip', el.getAttribute('title'));
                el.removeAttribute('title');
            }
            el.addEventListener('mouseenter', function (e) { show(e.currentTarget); move(e); });
            el.addEventListener('mousemove', move);
            el.addEventListener('mouseleave', hide);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initConceptTooltips);
    } else {
        initConceptTooltips();
    }
})();
