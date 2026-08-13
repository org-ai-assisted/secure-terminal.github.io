# Screenshots on this site - how they are generated (do not hand-edit)

These PNGs are produced by committed generators - ALL of them in dist-ai, under
`usr/share/secure-terminal-shots/` (with its own README), driven by one wrapper:

    secure-terminal-shots [review|comparison] [OUTPUT_DIR]

Regenerate; do not paint or hand-crop.

## This directory (`shots/`) - the paste/copy review bar

`paste-warning.webp`, `copy-warning.webp` render the real
`secure_terminal.review.ReviewBar` headless (offscreen Qt `grab()`, deterministic).

    secure-terminal-shots review [OUTPUT_SHOTS_DIR]     # defaults to this dir

## `comparison/shots/` - the terminal-comparison shots

Real Debian terminal emulators (and secure-terminal) under a nested labwc
compositor. Needs an X server + labwc, so regenerate in the sandbox:

    SECURE_TERMINAL_REPO=<checkout> secure-terminal-shots comparison

then copy its output PNGs into `comparison/shots/`.
