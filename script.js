if (window.location.hash) {
  const link = document.querySelector('a').getAttribute('href') + window.location.hash;
  document.querySelector('meta[http-equiv="refresh"]').setAttribute('content', '0;url=' + link);
  document.querySelector('a').setAttribute('href', link);
}