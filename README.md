# edu2.h19h19.com

Current deployed static site snapshot for `edu2.h19h19.com`.

## Source Of Truth

This repository was initialized from the NAS deployment path:

```
/volume1/docker/강의홈피2
```

The public site root is:

```
site/
```

The current Synology nginx configuration serves `edu2.h19h19.com` as a static site from:

```
/volume1/docker/강의홈피2/site
```

## Notes

- This repo currently preserves the deployed build output, not the original Vite/React source tree.
- NAS backup folders and local runtime files are intentionally excluded.
- Update `site/index.html` when changing the active bundled JavaScript or CSS asset.

## Deploy Shape

After building or editing static assets, copy the intended files to the NAS site root and verify:

```
https://edu2.h19h19.com/
```

