(function () {
  var Z = "\u200b";                          /* zero-width space: no glyph */
  var PAYLOAD = 'echo "test"' + Z
              + '&& echo "you did not expect this additional echo: unexpected code execution"' + Z;
  var copy = document.getElementById('pd-copy'),
      reveal = document.getElementById('pd-reveal'),
      status = document.getElementById('pd-status'),
      out = document.getElementById('pd-out');
  if (!copy || !reveal || !status || !out) { return; }   /* nothing to enhance */
  function showPayload() {
    out.textContent = PAYLOAD.split(Z).join('<U+200B>');
    out.hidden = false;
  }
  reveal.addEventListener('click', function () {
    showPayload();
    status.textContent = 'Revealed below - this is exactly what Copy puts on your clipboard.';
  });
  copy.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(PAYLOAD).then(
        function () { status.textContent = 'Copied. Now click Reveal, or paste it into any terminal - both halves are just echo, so it is safe to run.'; },
        function () { status.textContent = 'Your browser blocked clipboard access. Here is exactly what it would have copied:'; showPayload(); });
    } else {
      status.textContent = 'This browser gives pages no clipboard access. Here is exactly what the button would have copied:';
      showPayload();
    }
  });
})();
