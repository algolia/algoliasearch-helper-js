/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sidebar = __webpack_require__(1);

	var _sidebar2 = _interopRequireDefault(_sidebar);

	var _javascripts = __webpack_require__(2);

	var algolia = _interopRequireWildcard(_javascripts);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.addEventListener('load', function () {
	  algolia.communityHeader();
	});

	var container = document.querySelector('.documentation-container');
	var sidebarContainer = document.querySelector('.sidebar');

	if (container && _sidebar2.default) {
	  (0, _sidebar2.default)({
	    headersContainer: container,
	    sidebarContainer: sidebarContainer,
	    headerStartLevel: 2
	  });
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = sidebar;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function sidebar(options) {
	  var headersContainer = options.headersContainer,
	      sidebarContainer = options.sidebarContainer,
	      headerStartLevel = options.headerStartLevel;

	  listenToChanges(options);

	  var headers = headersContainer.querySelectorAll('h2, h3');
	  //const select = document.createElement('select');
	  var list = document.createElement('ul');
	  var startLevel = headerStartLevel; // we start at h2
	  list.classList.add('no-mobile');
	  var currentList = list;
	  var currentLevel = startLevel;

	  //select.addEventListener('change', e => window.location = e.target.value);
	  sidebarContainer.appendChild(list);
	  //sidebarContainer.appendChild(select);
	  sidebarFollowScroll(sidebarContainer.firstChild);
	  activeLinks(sidebarContainer);
	  scrollSpy(sidebarContainer, headersContainer);
	}

	function listenToChanges(originalParameters) {
	  var headersContainer = originalParameters.headersContainer,
	      sidebarContainer = originalParameters.sidebarContainer,
	      headerStartLevel = originalParameters.headerStartLevel;
	}

	function sidebarFollowScroll(sidebarContainer) {
	  var _getPositionsKeyEleme = getPositionsKeyElements(sidebarContainer),
	      height = _getPositionsKeyEleme.height,
	      navHeight = _getPositionsKeyEleme.navHeight,
	      footerHeight = _getPositionsKeyEleme.footerHeight,
	      menuHeight = _getPositionsKeyEleme.menuHeight,
	      sidebarTop = _getPositionsKeyEleme.sidebarTop;

	  var positionSidebar = function positionSidebar() {

	    var currentScroll = window.pageYOffset;
	    if (currentScroll > sidebarTop - navHeight) {
	      var fold = height - footerHeight - menuHeight - 50;
	      if (currentScroll > fold) {
	        sidebarContainer.style.top = fold - currentScroll + navHeight + 'px';
	      } else {
	        sidebarContainer.style.top = null;
	      }
	      sidebarContainer.classList.add('fixed');
	    } else {
	      sidebarContainer.classList.remove('fixed');
	    }
	  };

	  window.addEventListener('load', positionSidebar);
	  document.addEventListener('DOMContentLoaded', positionSidebar);
	  document.addEventListener('scroll', positionSidebar);
	}

	function scrollSpy(sidebarContainer, headersContainer) {
	  var headers = [].concat(_toConsumableArray(headersContainer.querySelectorAll('h2, h3')));

	  var setActiveSidebarLink = function setActiveSidebarLink(header) {
	    [].concat(_toConsumableArray(sidebarContainer.querySelectorAll('a'))).forEach(function (item) {
	      if (item.getAttribute('href').slice(1) === header.getAttribute('id')) {
	        item.classList.add('active');
	      } else {
	        item.classList.remove('active');
	      }
	    });
	  };

	  var findActiveSidebarLink = function findActiveSidebarLink() {
	    var highestVisibleHeaders = headers.map(function (header) {
	      return { element: header, rect: header.getBoundingClientRect() };
	    }).filter(function (_ref) {
	      var rect = _ref.rect;

	      // top element relative viewport position should be at least 1/3 viewport
	      // and element should be in viewport
	      return rect.top < window.innerHeight / 3 && rect.bottom < window.innerHeight;
	    })
	    // then we take the closest to this position as reference
	    .sort(function (header1, header2) {
	      return Math.abs(header1.rect.top) < Math.abs(header2.rect.top) ? -1 : 1;
	    });

	    if (highestVisibleHeaders.length === 0) {
	      setActiveSidebarLink(headers[0]);
	      return;
	    }

	    setActiveSidebarLink(highestVisibleHeaders[0].element);
	  };

	  findActiveSidebarLink();
	  window.addEventListener('load', findActiveSidebarLink);
	  document.addEventListener('DOMContentLoaded', findActiveSidebarLink);
	  document.addEventListener('scroll', findActiveSidebarLink);
	}

	// The Following code is used to set active items
	// On the documentation sidebar depending on the
	// clicked item
	function activeLinks(sidebarContainer) {
	  var linksContainer = sidebarContainer.querySelector('ul');

	  linksContainer.addEventListener('click', function (e) {
	    if (e.target.tagName === 'A') {
	      [].concat(_toConsumableArray(linksContainer.querySelectorAll('a'))).forEach(function (item) {
	        return item.classList.remove('active');
	      });
	      e.target.classList.add('active');
	    }
	  });
	}

	function getPositionsKeyElements(sidebar) {
	  var sidebarBBox = sidebar.getBoundingClientRect();
	  var bodyBBox = document.body.getBoundingClientRect();
	  var sidebarTop = sidebarBBox.top - bodyBBox.top;
	  var footer = document.querySelector('.ac-footer');
	  var navigation = document.querySelector('.ac-nav');
	  var menu = document.querySelector('.sidebar > ul');
	  var height = document.querySelector('html').getBoundingClientRect().height;
	  var navHeight = navigation.offsetHeight;
	  var footerHeight = footer.offsetHeight;
	  var menuHeight = menu.offsetHeight;

	  return { sidebarTop: sidebarTop, height: height, navHeight: navHeight, footerHeight: footerHeight, menuHeight: menuHeight };
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const javascripts = {
	  communityHeader: __webpack_require__(3)
	}

	module.exports = javascripts;

/***/ },
/* 3 */
/***/ function(module, exports) {

	
	/**
	 * Main header function with docsearch
	 * @param  {Object} docSearch config
	 */
	const communityHeader = (docSearch) => {

	  const hasDocSearchRendered = document.querySelector('.algc-navigation .algc-search__input--docsearch');
	  let enableDocSearch = (docSearch && docSearch.apiKey && docSearch.indexName && docSearch.inputSelector) ? true : false;

	  let searchIcon,
	      cancelIcon,
	      searchContainer,
	      searchInput;

	  if (!enableDocSearch && hasDocSearchRendered) {
	    throw new Error('You need to pass docSearch: { apiKey, indexName, inputSelector } to communityHeader function in order to initialise docSearch');
	  } else if(enableDocSearch && hasDocSearchRendered){
	    searchIcon = document.querySelector('#search');
	    cancelIcon = document.querySelector('#cancel');
	    searchContainer = document.querySelector('.algc-search__input').parentNode;
	    searchInput = document.querySelector(docSearch.inputSelector);
	  }

	  const navRoot = document.querySelector('.algc-dropdownroot');
	  const dropdownRoot = document.querySelector('.algc-navigation__dropdown-holder');
	  const navItems = document.querySelectorAll('a[data-enabledropdown="true"]');
	  const navContainer = document.querySelector('.algc-dropdownroot__dropdowncontainer');

	  const menuContainer = document.querySelector('.algc-navigation__container');
	  const navBg = document.querySelector('.algc-dropdownroot__dropdownbg');
	  const navArrow = document.querySelector('.algc-dropdownroot__dropdownarrow');
	  const dropDownContainer = document.querySelector('.algc-dropdownroot__dropdowncontainer');
	  const menuTriggers = document.querySelectorAll('[data-enabledropdown="true"]');

	  const mobileMenuButton = document.querySelector('.algc-openmobile ');
	  const mobileMenu = document.querySelector('.algc-mobilemenu');

	  const subList = document.querySelectorAll('.algc-menu--hassublist .algc-menu--sublistlink');
	  const subListHolders = [...subList].map(node => node.parentNode);

	  // State of menus
	  const state = {
	    isOpen: false,
	    isOpenMobile: false
	  }

	  let menuDropdowns = {};

	  [].forEach.call(document.querySelectorAll('[data-dropdown-content]'), (item) => {
	    menuDropdowns[item.dataset.dropdownContent] = {
	      parent: item.parentNode,
	      content: item
	    }
	  });

	  const INIT_VAL = {
	    WIDTH: 490,
	    HEIGHT: 360
	  }

	  let disableTransitionTimeout;

	  const triggerMenu = (event) => {

	    const dropdown = event.target.dataset.dropdown;
	    const newTarget = menuDropdowns[dropdown].content;
	    const newContent = menuDropdowns[dropdown].parent;

	    const navItem = _utils.calculatePosition(event.target);
	    const newTargetCoordinates = _utils.calculatePosition(newTarget);
	    const menuContainerOffset = _utils.calculatePosition(menuContainer);
	    let leftDistance;

	    const scaleFactors = {
	      X: newTargetCoordinates.realWidth / INIT_VAL.WIDTH,
	      Y: newTargetCoordinates.realHeight / INIT_VAL.HEIGHT
	    }

	    if(navItem.center < (menuContainerOffset.center/2)){
	      leftDistance = "calc(50% - 36px)";
	    } else {
	      leftDistance = (navItem.center - menuContainerOffset.left)+"px";
	    }

	    if(window.innerWidth < 576){
	      leftDistance = "0"
	    }

	    navBg.style.cssText = `
	      transform: translateX(${leftDistance}) scale(${scaleFactors.X}, ${scaleFactors.Y})`;

	    navArrow.style.cssText = `
	      transform: translateX(${leftDistance}) rotate(45deg)`;

	    dropDownContainer.style.cssText = `
	      transform: translateX(${leftDistance});
	      width: ${newTargetCoordinates.realWidth}px;
	      height: ${newTargetCoordinates.realHeight + 10}px;`;

	    dropdownRoot.style.pointerEvents = "auto";

	    Object.keys(menuDropdowns).forEach(key => {
	      if (key === dropdown) {
	        menuDropdowns[key].parent.classList.add('active');
	      } else {
	        menuDropdowns[key].parent.classList.remove('active');
	      }
	    })

	    if (!state.isOpen) {
	      setTimeout(() => {
	        navRoot.className = "algc-dropdownroot activeDropdown";
	      }, 50);
	    }

	    window.clearTimeout(disableTransitionTimeout);
	    state.isOpen = true;
	  }

	  const closeMenu = (event) => {
	    state.isOpen = false;
	    disableTransitionTimeout = setTimeout(() => {
	      dropdownRoot.style.pointerEvents = "none";
	      navRoot.className = "algc-dropdownroot notransition"
	    }, 50);
	  }

	  const _utils = {};

	  _utils.calculatePosition = (sourceNode) => {
	    const box = sourceNode.getBoundingClientRect();
	    const realWidth = sourceNode.offsetWidth;
	    const realHeight = sourceNode.offsetHeight;

	    return {
	      left: box.left,
	      top: box.top,
	      width: box.width,
	      height: box.height,
	      realWidth: realWidth,
	      realHeight: realHeight,
	      center: box.left + box.width / 2
	    }
	  }

	  _utils.setClassNames = (id) => {
	    const nodeCount = Object.keys(refs);
	    nodeCount.forEach((ref, index) => {
	      const node = refs[ref].nodes[1];
	      if (index < id) {
	        node.className = 'algc-dropdownroot__section left';
	      } else if (index === id) {
	        node.className = 'algc-dropdownroot__section active';
	      } else {
	        node.className = 'algc-dropdownroot__section right';
	      }
	    });
	  }

	  _utils.getCoordinates = (target) => {
	    const box = target.getBoundingClientRect();
	  }

	  const toggleMobileMenu = (event) => {
	    mobileMenuButton.classList.toggle('algc-openmobile--open');
	    mobileMenu.classList.toggle('algc-mobilemenu--open');
	  }

	  // Search
	  const docSearchToggling = () => {
	    function openSearchInput() {
	      searchContainer.classList.add('open');
	      searchInput.focus();
	    }

	    function closeSearchInput() {
	      searchInput.blur();
	      searchContainer.classList.remove('open');
	    }

	    function emptySearchInput() {
	      if (searchInput.value !== '') {
	        searchInput.value = '';
	      } else {
	        closeSearchInput();
	      }
	    }
	    searchInput.setAttribute('value', '');
	    searchIcon.addEventListener('click', openSearchInput);
	    cancelIcon.addEventListener('click', emptySearchInput);
	  };

	  // If the user type :"s" or "/", open the searchbox
	  const catchSearchShortcuts = () => {
	    let keyPressed = {};

	    document.addEventListener('keydown', e => {
	      keyPressed[e.keyCode] = true;
	    }, false);
	    document.addEventListener('keyup', e => {
	      keyPressed[e.keyCode] = false;
	    }, false);

	    const searchLoop = (event) => {
	      if (keyPressed['83'] || keyPressed['191']) {
	        document.querySelector('.algc-search__input').parentNode.classList.add('open');
	        searchInput.focus();

	        setTimeout(() => {
	          keyPressed = {};
	        }, 500);
	      } else if (keyPressed['27']) {
	        document.querySelector('.algc-search__input').parentNode.classList.remove('open');
	        searchInput.blur();

	        setTimeout(() => {
	          keyPressed = {};
	        }, 500);
	      }
	      setTimeout(searchLoop, 5);
	    }

	    searchLoop();
	  }

	  if (enableDocSearch) {
	    docSearchToggling();
	    catchSearchShortcuts();

	    docsearch(docSearch);
	  }

	  function openSubList(event){
	    event.preventDefault();
	    event.stopPropagation();
	    subListHolders.forEach(holder => {
	      if(holder.classList.contains('open') && holder === event.target.parentNode){
	        holder.classList.remove('open');
	      } else {
	        holder.classList.add('open');
	      }
	    })
	  }

	  function closeSubLists(event){
	    subListHolders.forEach(holder => holder.classList.remove('open'));
	  }

	  subList.forEach(link => link.addEventListener('click', openSubList));

	  // Assign event listeners
	  menuTriggers.forEach(item => {
	    item.addEventListener('mouseenter', triggerMenu);
	    item.addEventListener('focus', triggerMenu);
	  });

	  navItems.forEach(item => {
	    item.addEventListener('mouseleave', closeMenu);
	  });

	  navContainer.addEventListener('mouseenter', () => {
	    clearTimeout(disableTransitionTimeout);
	  });

	  document.addEventListener('click', closeSubLists);
	  document.querySelector('.algc-dropdownroot__dropdowncontainer').addEventListener('mouseleave', closeMenu);

	  mobileMenuButton.addEventListener('click', toggleMobileMenu);
	}

	module.exports = communityHeader


/***/ }
/******/ ]);