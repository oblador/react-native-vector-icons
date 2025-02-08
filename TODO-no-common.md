# FIXME: Remove this once we have implemented everything

* Should we split common
  * make common a straight JS dep
  * Migrate the native code to a get-image-for-font package
  * That way if folks accidentally install common they don't get uneeded native code
* how do we handle font copying for the rnvi directory?
  * Just let any installed package copy what's in there? (con: means we copy multiple times)
  * Have defined sub dir for each package e.g. fontawesome6 and icomoon
  * Enforce icon names so we can glob somethign sensible?
