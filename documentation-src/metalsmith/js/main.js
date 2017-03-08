import sidebar from './sidebar.js';
import * as algolia from 'algolia-components/javascripts'

window.addEventListener('load',() => {
  algolia.communityHeader()
})

var container = document.querySelector('.documentation-container')
var sidebarContainer = document.querySelector('.sidebar');


if(container && sidebar) {
  sidebar({
    headersContainer: container,
    sidebarContainer: sidebarContainer,
    headerStartLevel: 2
  });
}
