function getHashParams() {
  let   hashParams = {},
        e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
  e = r.exec(q)
  while (e) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
     e = r.exec(q);
  }
  return hashParams;
};

const HashParams = {
    getHashParams : getHashParams
}
export default HashParams;
