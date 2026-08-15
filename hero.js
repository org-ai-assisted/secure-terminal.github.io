/* Progressive enhancement for the hero before/after slider. With JS off, the
   overlay's CSS resize:horizontal corner is the control and each side's <a> opens
   its screenshot full size (see style.css). This adds a centred grip plus pointer /
   touch / keyboard dragging, and distinguishes a DRAG (slide) from a CLICK (let the
   side's native <a target=_blank> open the image -- so middle-click, Ctrl/Cmd-click,
   right-click and keyboard all keep their "open in new tab" behaviour). */
(function () {
  var cmp = document.querySelector('.herocmp');
  if (!cmp) return;
  var stage = cmp.querySelector('.herocmp-stage');
  var top = cmp.querySelector('.herocmp-top');
  var handle = cmp.querySelector('.herocmp-handle');
  if (!stage || !top || !handle) return;
  cmp.classList.add('js');
  var pct = parseFloat(cmp.getAttribute('data-start'));
  if (isNaN(pct)) pct = 50;
  function set(p) {
    pct = Math.max(0, Math.min(100, p));
    top.style.width = pct + '%';
    handle.style.left = pct + '%';
    handle.setAttribute('aria-valuenow', Math.round(pct));
  }
  set(pct);
  function pctFrom(e) {
    var r = stage.getBoundingClientRect();
    if (r.width <= 0) return pct;
    return ((e.clientX - r.left) / r.width) * 100;
  }
  var TH = 5, active = null, sx = 0, sy = 0, dragging = false, moved = false, down = 0;
  function abortDrag() {
    if (dragging && active !== null && stage.releasePointerCapture) {
      try { stage.releasePointerCapture(active); } catch (_) {}
    }
    active = null; dragging = false;
  }
  stage.addEventListener('pointerdown', function (e) {
    down += 1;
    if (down >= 2) { abortDrag(); return; }   // second finger: a pinch -- let the browser zoom
    if (e.button && e.button !== 0) return;    // primary button / touch only
    active = e.pointerId; sx = e.clientX; sy = e.clientY;
    dragging = false; moved = false;
    /* No capture and no preventDefault yet: a pure click must still reach the <a>. */
  });
  stage.addEventListener('pointermove', function (e) {
    if (down >= 2) return;                     // pinching -- ignore, the browser is zooming
    if (active === null || e.pointerId !== active) return;
    if (!dragging) {
      if (Math.abs(e.clientX - sx) < TH && Math.abs(e.clientY - sy) < TH) return;
      dragging = true; moved = true;   // movement past the threshold: this is a slide
      if (stage.setPointerCapture) { try { stage.setPointerCapture(e.pointerId); } catch (_) {} }
    }
    set(pctFrom(e));
    e.preventDefault();
  });
  function end(e) {
    if (down > 0) down -= 1;
    if (active === null || e.pointerId !== active) return;
    if (dragging && stage.releasePointerCapture) { try { stage.releasePointerCapture(e.pointerId); } catch (_) {} }
    active = null; dragging = false;
  }
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
  /* Cancel the click that trails a drag, so releasing the divider never opens a tab.
     A genuine click (no movement) falls through to the side's <a>. */
  stage.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  });
  handle.addEventListener('keydown', function (e) {
    var step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') { set(pct - step); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { set(pct + step); e.preventDefault(); }
    else if (e.key === 'Home') { set(0); e.preventDefault(); }
    else if (e.key === 'End') { set(100); e.preventDefault(); }
  });
})();
