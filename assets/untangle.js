// Signature moment: a tangled star-graph settles into its planar constellation.
// Mirrors Crossless's own win condition (drag stars until zero lines cross).
(function () {
  var TANGLED = [
    [300, 60], [70, 140], [340, 230], [120, 300],
    [200, 40], [330, 350], [60, 340]
  ];
  var SOLVED = [
    [60, 60], [140, 90], [185, 150], [230, 205],
    [330, 175], [215, 300], [320, 320]
  ];
  var EDGES = [[0,1],[1,2],[2,3],[3,4],[3,5],[5,6],[6,4]];

  var RED = [255, 77, 106];
  var BLUE = [111, 208, 255];

  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function lerpColor(t) {
    var r = Math.round(lerp(RED[0], BLUE[0], t));
    var g = Math.round(lerp(RED[1], BLUE[1], t));
    var b = Math.round(lerp(RED[2], BLUE[2], t));
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function build(container) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.setAttribute('class', 'untangle-svg');
    svg.setAttribute('aria-hidden', 'true');

    var defs = document.createElementNS(SVG_NS, 'defs');
    var filter = document.createElementNS(SVG_NS, 'filter');
    filter.setAttribute('id', 'starGlow');
    filter.setAttribute('x', '-100%'); filter.setAttribute('y', '-100%');
    filter.setAttribute('width', '300%'); filter.setAttribute('height', '300%');
    var blur = document.createElementNS(SVG_NS, 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '5');
    filter.appendChild(blur);
    defs.appendChild(filter);
    svg.appendChild(defs);

    var lines = EDGES.map(function () {
      var line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('stroke-width', '2.5');
      line.setAttribute('stroke-linecap', 'round');
      svg.appendChild(line);
      return line;
    });

    var glows = TANGLED.map(function () {
      var c = document.createElementNS(SVG_NS, 'circle');
      c.setAttribute('r', '13');
      c.setAttribute('fill', '#ffb648');
      c.setAttribute('filter', 'url(#starGlow)');
      c.setAttribute('opacity', '0.65');
      svg.appendChild(c);
      return c;
    });

    var cores = TANGLED.map(function () {
      var c = document.createElementNS(SVG_NS, 'circle');
      c.setAttribute('r', '7');
      c.setAttribute('fill', '#ffd76e');
      c.setAttribute('stroke', '#8a5a1f');
      c.setAttribute('stroke-width', '1.5');
      svg.appendChild(c);
      return c;
    });

    container.appendChild(svg);
    return { lines: lines, glows: glows, cores: cores };
  }

  function place(el, pts) {
    el.lines.forEach(function (line, i) {
      var a = pts[EDGES[i][0]], b = pts[EDGES[i][1]];
      line.setAttribute('x1', a[0]); line.setAttribute('y1', a[1]);
      line.setAttribute('x2', b[0]); line.setAttribute('y2', b[1]);
    });
    el.glows.forEach(function (c, i) { c.setAttribute('cx', pts[i][0]); c.setAttribute('cy', pts[i][1]); });
    el.cores.forEach(function (c, i) { c.setAttribute('cx', pts[i][0]); c.setAttribute('cy', pts[i][1]); });
  }

  function colorLines(el, t) {
    var col = lerpColor(t);
    el.lines.forEach(function (line) { line.setAttribute('stroke', col); });
  }

  function run(container) {
    var el = build(container);
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      place(el, SOLVED);
      colorLines(el, 1);
      return;
    }

    place(el, TANGLED);
    colorLines(el, 0);

    var start = null;
    var delay = 500;
    var duration = 2000;

    function frame(ts) {
      if (!start) start = ts;
      var elapsed = ts - start - delay;
      if (elapsed < 0) { requestAnimationFrame(frame); return; }
      var t = Math.min(elapsed / duration, 1);
      var eased = easeInOutCubic(t);
      var pts = TANGLED.map(function (p, i) {
        return [lerp(p[0], SOLVED[i][0], eased), lerp(p[1], SOLVED[i][1], eased)];
      });
      place(el, pts);
      colorLines(el, eased);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-untangle]').forEach(run);
  });
})();
