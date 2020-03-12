/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let fetch = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\nlet users1 = __webpack_require__(/*! ./users1.json */ \"./users1.json\");\nlet posts1 = __webpack_require__(/*! ./posts1.json */ \"./posts1.json\");\nlet users2 = __webpack_require__(/*! ./users2.json */ \"./users2.json\");\nlet posts2 = __webpack_require__(/*! ./posts2.json */ \"./posts2.json\");\n\nlet uniqueContainer;\nlet unique;\nlet closestContainer;\nlet countContainer;\nlet set = 0;\n\n\n/**\n * @desc szuka duplikatow w tytulach\n * @param arr - talica tytułów \n * @return array - zwraca tablice duplikatow\n */\nfunction findDuplicates(arr) {                                      \n    return arr.filter((item, index) => arr.indexOf(item) != index);\n}\n\n/**\n * @desc szuka najblizszego uzytkownika\n * @param arr - tablica uzytkownikow \n * @param elem - uzytkownik do ktorego najbliszego szukamy\n * @return arrTemp - tablica \n */\nfunction findClosest(arr, elem) {                           \n    let arrTemp = [...arr];\n    for (let i = 0; i < arrTemp.length; i++) {\n        if (arr[i].id == elem.id) {\n            arrTemp.splice(i, 1);\n        }\n    }\n    return arrTemp.reduce(\n        (prev, curr) => {\n            return Math.abs(prev.address.geo.lat - elem.address.geo.lat) + Math.abs(prev.address.geo.lng - elem.address.geo.lng) < Math.abs(curr.address.geo.lat - elem.address.geo.lat) + Math.abs(curr.address.geo.lng - elem.address.geo.lng) ? prev : curr;\n        }\n    );\n}\n\n/**\n * @desc lączy posty z użytkownikami\n * @param users \n * @param posts \n * @return users with posts\n */\nfunction addPosts(users, posts) {                                 \n    for (let i = 0; i < users.length; i++) {\n        users[i].posts = posts.filter(post => post.userId == users[i].id);\n    }\n    return users;\n}\n\n/**\n * @desc pobiera dane z jsonplaceholder\n * @return uzytkownicy z postami\n */\nasync function call() {                                                \n    let users;\n    await fetch(\"https://jsonplaceholder.typicode.com/users\")\n        .then((res) => {\n            return res.json();\n        })\n        .then((data) => {\n            let userId = data[0].id;\n            users = data;\n            return fetch(\"https://jsonplaceholder.typicode.com/posts\");\n        })\n        .then((data) => {\n            return data.json();\n        })\n        .then((data) => {\n            users = addPosts(users, data);\n        })\n    return users;\n}\n\n/**\n * @desc zwraca tablice tytułow postów\n * @param arr - tablica uzytkownikow z postami\n */\nfunction collectTitles(arr){\n    let titles = [];\n    for (let i = 0; i < arr.length; i++) {\n        for (let j = 0; j < arr[i].posts.length; j++) {\n            titles.push(arr[i].posts[j].title);\n        }\n    }\n    return titles;\n}\n\n/**\n * @desc dodaje najblizszego uzytkownika do DOM\n * @param data \n * @param user \n */\nfunction addClosest(data, user){\n    let closest = findClosest(data, user);\n    closestContainer = document.getElementById(\"closest\");\n    let closestP = document.createElement(\"p\");\n    closestP.innerHTML = \"Najbliżej użytkownika: \" + user.username + \" mieszka: \" + closest.username;\n    closestContainer.appendChild(closestP);\n}\n\n/**\n * @desc liczy ile postow napisal uzytkownik i dodaje do DOM\n * @param user \n */\nfunction countPosts(user) {\n    countContainer = document.getElementById(\"count__container\");\n    let elem = document.createElement(\"div\");\n    elem.innerHTML = user.username + \" napisał(a) \" + user.posts.length + \" postów\";\n    countContainer.appendChild(elem);\n}\n\n/**\n * @desc sprawdza czy istnieja duplikaty i dodaje je do DOM\n * @param titles\n */\nfunction checkUnique(titles){\n    uniqueContainer = document.getElementById('unique__container');\n    unique = document.createElement('div');\n    unique.classList = \"unique\";\n    let isUnique = document.createElement('p');\n    let duplicates = [...new Set(findDuplicates(titles))];\n    if (duplicates.length == 0) {\n        isUnique.innerHTML = \"Wszystkie tytuły postów są unikalne\";\n        unique.appendChild(isUnique);\n    } else {\n        isUnique.innerHTML = \"Następujące tytuły nie są unikalne: \";\n        unique.appendChild(isUnique);\n        for (let i = 0; i < duplicates.length; i++) {\n            let duplicate = document.createElement(\"p\");\n            duplicate.innerHTML = \"- \" + duplicates[i];\n            duplicate.classList = \"not__unique\";\n            unique.appendChild(duplicate);\n        }\n    }\n    uniqueContainer.appendChild(unique);\n}\n\n/**\n * @desc uniwersalna funkcja do wykonania wszystkich operacji na danych\n * @param users \n * @param posts \n */\nfunction checkSet(users, posts){\n    let titles = [];\n    users = addPosts(users, posts);\n    for (let i = 0; i < users.length; i++) {\n        countPosts(users[i]);\n        addClosest(users, users[i]);\n    }\n    titles = collectTitles(users);\n    checkUnique(titles);\n}\n\n/**\n * @desc zaleznie od opcji set wykonuje funkcje\n */\nfunction setCall(){\n    if (set == 0) {\n        call()\n            .then(data => {\n                let titles = [];\n                console.log(data);\n                for (let i = 0; i < data.length; i++) {\n                    countPosts(data[i]);\n                    addClosest(data, data[i]);\n                }\n                titles = collectTitles(data);\n                checkUnique(titles);\n            })\n            .catch(reason => console.log(reason.message))\n    } else if (set == 1) {\n        checkSet(users1, posts1);\n    }\n    else if(set == 2){\n        checkSet(users2, posts2);\n    }\n}\n\nwindow.addEventListener(\"load\", function(event) {\n    let set1 = document.getElementById(\"set1\");\n    let set2 = document.getElementById(\"set2\");\n    let set3 = document.getElementById(\"set3\");\n    set1.addEventListener(\"click\", function(){\n        set = 0;\n        uniqueContainer.innerHTML = \"\";\n        closestContainer.innerHTML = \"\";\n        countContainer.innerHTML = \"\";\n        setCall();\n    });\n    set2.addEventListener(\"click\", function(){\n        set = 1;\n        uniqueContainer.innerHTML = \"\";\n        closestContainer.innerHTML = \"\";\n        countContainer.innerHTML = \"\";\n        setCall();\n    });\n    set3.addEventListener(\"click\", function(){\n        set = 2;\n        uniqueContainer.innerHTML = \"\";\n        closestContainer.innerHTML = \"\";\n        countContainer.innerHTML = \"\";\n        setCall();\n    });\n    setCall();\n});\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// ref: https://github.com/tc39/proposal-global\nvar getGlobal = function () {\n\t// the only reliable means to get the global object is\n\t// `Function('return this')()`\n\t// However, this causes CSP violations in Chrome apps.\n\tif (typeof self !== 'undefined') { return self; }\n\tif (typeof window !== 'undefined') { return window; }\n\tif (typeof global !== 'undefined') { return global; }\n\tthrow new Error('unable to locate global object');\n}\n\nvar global = getGlobal();\n\nmodule.exports = exports = global.fetch;\n\n// Needed for TypeScript and Webpack.\nexports.default = global.fetch.bind(global);\n\nexports.Headers = global.Headers;\nexports.Request = global.Request;\nexports.Response = global.Response;\n\n//# sourceURL=webpack:///./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./posts1.json":
/*!*********************!*\
  !*** ./posts1.json ***!
  \*********************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"[{\\\"userId\\\":1,\\\"id\\\":1,\\\"title\\\":\\\"sunt aut facere repellat provident occaecati excepturi optio reprehenderit\\\",\\\"body\\\":\\\"quia et suscipit\\\\nsuscipit recusandae consequuntur expedita et cum\\\\nreprehenderit molestiae ut ut quas totam\\\\nnostrum rerum est autem sunt rem eveniet architecto\\\"},{\\\"userId\\\":1,\\\"id\\\":2,\\\"title\\\":\\\"qui est esse\\\",\\\"body\\\":\\\"est rerum tempore vitae\\\\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\\\\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\\\\nqui aperiam non debitis possimus qui neque nisi nulla\\\"},{\\\"userId\\\":2,\\\"id\\\":3,\\\"title\\\":\\\"qui est esse\\\",\\\"body\\\":\\\"et iusto sed quo iure\\\\nvoluptatem occaecati omnis eligendi aut ad\\\\nvoluptatem doloribus vel accusantium quis pariatur\\\\nmolestiae porro eius odio et labore et velit aut\\\"},{\\\"userId\\\":1,\\\"id\\\":4,\\\"title\\\":\\\"eum et est occaecati\\\",\\\"body\\\":\\\"ullam et saepe reiciendis voluptatem adipisci\\\\nsit amet autem assumenda provident rerum culpa\\\\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\\\\nquis sunt voluptatem rerum illo velit\\\"},{\\\"userId\\\":4,\\\"id\\\":5,\\\"title\\\":\\\"nesciunt quas odio\\\",\\\"body\\\":\\\"repudiandae veniam quaerat sunt sed\\\\nalias aut fugiat sit autem sed est\\\\nvoluptatem omnis possimus esse voluptatibus quis\\\\nest aut tenetur dolor neque\\\"},{\\\"userId\\\":5,\\\"id\\\":6,\\\"title\\\":\\\"nesciunt quas odio\\\",\\\"body\\\":\\\"ut aspernatur corporis harum nihil quis provident sequi\\\\nmollitia nobis aliquid molestiae\\\\nperspiciatis et ea nemo ab reprehenderit accusantium quas\\\\nvoluptate dolores velit et doloremque molestiae\\\"},{\\\"userId\\\":5,\\\"id\\\":7,\\\"title\\\":\\\"magnam facilis autem\\\",\\\"body\\\":\\\"dolore placeat quibusdam ea quo vitae\\\\nmagni quis enim qui quis quo nemo aut saepe\\\\nquidem repellat excepturi ut quia\\\\nsunt ut sequi eos ea sed quas\\\"},{\\\"userId\\\":2,\\\"id\\\":8,\\\"title\\\":\\\"dolorem dolore est ipsam\\\",\\\"body\\\":\\\"dignissimos aperiam dolorem qui eum\\\\nfacilis quibusdam animi sint suscipit qui sint possimus cum\\\\nquaerat magni maiores excepturi\\\\nipsam ut commodi dolor voluptatum modi aut vitae\\\"}]\");\n\n//# sourceURL=webpack:///./posts1.json?");

/***/ }),

/***/ "./posts2.json":
/*!*********************!*\
  !*** ./posts2.json ***!
  \*********************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"[{\\\"userId\\\":1,\\\"id\\\":1,\\\"title\\\":\\\"aaaa bbb ccc\\\",\\\"body\\\":\\\"quia et suscipit\\\\nsuscipit recusandae consequuntur expedita et cum\\\\nreprehenderit molestiae ut ut quas totam\\\\nnostrum rerum est autem sunt rem eveniet architecto\\\"},{\\\"userId\\\":1,\\\"id\\\":2,\\\"title\\\":\\\"aaaa bbb ccc\\\",\\\"body\\\":\\\"est rerum tempore vitae\\\\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\\\\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\\\\nqui aperiam non debitis possimus qui neque nisi nulla\\\"},{\\\"userId\\\":3,\\\"id\\\":3,\\\"title\\\":\\\"aaaa bbb ccc\\\",\\\"body\\\":\\\"et iusto sed quo iure\\\\nvoluptatem occaecati omnis eligendi aut ad\\\\nvoluptatem doloribus vel accusantium quis pariatur\\\\nmolestiae porro eius odio et labore et velit aut\\\"},{\\\"userId\\\":3,\\\"id\\\":4,\\\"title\\\":\\\"bbbbbbbbbbbb\\\",\\\"body\\\":\\\"ullam et saepe reiciendis voluptatem adipisci\\\\nsit amet autem assumenda provident rerum culpa\\\\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\\\\nquis sunt voluptatem rerum illo velit\\\"},{\\\"userId\\\":4,\\\"id\\\":5,\\\"title\\\":\\\"as asomdako aoskd oakd\\\",\\\"body\\\":\\\"repudiandae veniam quaerat sunt sed\\\\nalias aut fugiat sit autem sed est\\\\nvoluptatem omnis possimus esse voluptatibus quis\\\\nest aut tenetur dolor neque\\\"},{\\\"userId\\\":6,\\\"id\\\":6,\\\"title\\\":\\\"test test test\\\",\\\"body\\\":\\\"ut aspernatur corporis harum nihil quis provident sequi\\\\nmollitia nobis aliquid molestiae\\\\nperspiciatis et ea nemo ab reprehenderit accusantium quas\\\\nvoluptate dolores velit et doloremque molestiae\\\"},{\\\"userId\\\":6,\\\"id\\\":7,\\\"title\\\":\\\"test test test\\\",\\\"body\\\":\\\"dolore placeat quibusdam ea quo vitae\\\\nmagni quis enim qui quis quo nemo aut saepe\\\\nquidem repellat excepturi ut quia\\\\nsunt ut sequi eos ea sed quas\\\"},{\\\"userId\\\":6,\\\"id\\\":8,\\\"title\\\":\\\"bbbb\\\",\\\"body\\\":\\\"dignissimos aperiam dolorem qui eum\\\\nfacilis quibusdam animi sint suscipit qui sint possimus cum\\\\nquaerat magni maiores excepturi\\\\nipsam ut commodi dolor voluptatum modi aut vitae\\\"}]\");\n\n//# sourceURL=webpack:///./posts2.json?");

/***/ }),

/***/ "./users1.json":
/*!*********************!*\
  !*** ./users1.json ***!
  \*********************/
/*! exports provided: 0, 1, 2, 3, 4, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"[{\\\"id\\\":1,\\\"name\\\":\\\"Kamil D\\\",\\\"username\\\":\\\"Kamil\\\",\\\"address\\\":{\\\"geo\\\":{\\\"lat\\\":\\\"-10\\\",\\\"lng\\\":\\\"20\\\"}}},{\\\"id\\\":2,\\\"name\\\":\\\"Michal P\\\",\\\"username\\\":\\\"Michal\\\",\\\"address\\\":{\\\"geo\\\":{\\\"lat\\\":\\\"40\\\",\\\"lng\\\":\\\"40\\\"}}},{\\\"id\\\":3,\\\"name\\\":\\\"John D\\\",\\\"username\\\":\\\"John\\\",\\\"address\\\":{\\\"geo\\\":{\\\"lat\\\":\\\"-50\\\",\\\"lng\\\":\\\"-30\\\"}}},{\\\"id\\\":4,\\\"name\\\":\\\"Lukasz X\\\",\\\"username\\\":\\\"Lukasz\\\",\\\"address\\\":{\\\"geo\\\":{\\\"lat\\\":\\\"20\\\",\\\"lng\\\":\\\"30\\\"}}},{\\\"id\\\":5,\\\"name\\\":\\\"Piotr K\\\",\\\"username\\\":\\\"Piotr\\\",\\\"address\\\":{\\\"geo\\\":{\\\"lat\\\":\\\"21\\\",\\\"lng\\\":\\\"31\\\"}}}]\");\n\n//# sourceURL=webpack:///./users1.json?");

/***/ }),

/***/ "./users2.json":
/*!*********************!*\
  !*** ./users2.json ***!
  \*********************/
/*! exports provided: 0, 1, 2, 3, 4, 5, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"[{\\\"id\\\":1,\\\"name\\\":\\\"Kamil D\\\",\\\"username\\\":\\\"Smith\\\",\\\"address\\\":{\\\"geo\\\":{\\\"lat\\\":\\\"-10\\\",\\\"lng\\\":\\\"20\\\"}}},{\\\"id\\\":2,\\\"name\\\":\\\"Michal P\\\",\\\"username\\\":\\\"Michael\\\",\\\"address\\\":{\\\"geo\\\":{\\\"lat\\\":\\\"30\\\",\\\"lng\\\":\\\"-20\\\"}}},{\\\"id\\\":3,\\\"name\\\":\\\"John D\\\",\\\"username\\\":\\\"Peter\\\",\\\"address\\\":{\\\"geo\\\":{\\\"lat\\\":\\\"120\\\",\\\"lng\\\":\\\"70\\\"}}},{\\\"id\\\":4,\\\"name\\\":\\\"Lukasz X\\\",\\\"username\\\":\\\"Mike\\\",\\\"address\\\":{\\\"geo\\\":{\\\"lat\\\":\\\"20\\\",\\\"lng\\\":\\\"30\\\"}}},{\\\"id\\\":5,\\\"name\\\":\\\"Piotr K\\\",\\\"username\\\":\\\"John\\\",\\\"address\\\":{\\\"geo\\\":{\\\"lat\\\":\\\"0\\\",\\\"lng\\\":\\\"0\\\"}}},{\\\"id\\\":6,\\\"name\\\":\\\"Dwayne\\\",\\\"username\\\":\\\"Dwayne\\\",\\\"address\\\":{\\\"geo\\\":{\\\"lat\\\":\\\"100\\\",\\\"lng\\\":\\\"100\\\"}}}]\");\n\n//# sourceURL=webpack:///./users2.json?");

/***/ })

/******/ });