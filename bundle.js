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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pagination = __webpack_require__(1);

var applicationObject = {
    nextThread: "",
    previousResults: [],
    currentResult: [],
    url: "https://www.reddit.com/.json?"
    //on page load

};
console.log("prev" + _pagination.previousPage + "next " + _pagination.nextPage);
$(document).ready(function () {

    $.ajax({ url: applicationObject.url, success: onLoad });
    $("button").on("click", function (event) {
        if (event.currentTarget.textContent === 'Previous') (0, _pagination.previousPage)(applicationObject, onLoad);else if (event.currentTarget.textContent === 'Next') (0, _pagination.nextPage)(applicationObject, onLoad);
    });
});

var onLoad = function onLoad(result) {
    //clear the content div to add the new threads
    $("#content").html('');
    //Iterate through the result of the ajax call
    $.each(result.data.children, function (index, value) {
        createThread(value.data, index);
    });
    applicationObject.currentResult = result;
    //Scroll back to top of page
    $('html, body').animate({ scrollTop: 0 }, 'fast');
};

var createThread = function createThread(threadData, index) {
    //creating element for thread
    try {
        var $thread = $('<div/>', { 'class': 'thread', 'data-index': index });
        var $threadImage = $('<div/>', { 'class': 'thread-image' }).append($('<img/>', { 'src': threadData.preview.images[0].source.url, 'alt': 'Thread Image', 'height': '100', 'widht': '100' }));
        $thread.append($threadImage);
        var $threadData = $('<div/>', { 'class': 'thread-data' });
        var $subredditName = $('<div/>', { 'text': "Subreddit : " + threadData.subreddit_name_prefixed });
        $threadData.append($subredditName);
        var $title = $('<div/>', { 'text': 'Title : ' + threadData.title });
        $threadData.append($title);
        var $upVote = $('<div/>', { 'text': "Up Votes : " + threadData.ups });
        $threadData.append($upVote);
        var $link = $("<div/>", { 'text': "Source : " });
        //hyperlink for the source
        $("<a>", { 'href': threadData.url, 'text': threadData.url, 'target': '_blank' }).appendTo($link);
        $threadData.append($link);
        var $comments = $("<div/>", { 'text': "No. of Comments : " }).append($('<a/>', { 'href': 'javascript:showComments("' + threadData.permalink + '")', 'text': threadData.num_comments }));
        $threadData.append($comments);
        $thread.append($threadData);
        $thread.append("<hr/>");
        $("#content").append($thread);
    } catch (e) {
        console.log(e.message);
    }
};

//
// const nextPage = () => {

//         //updating previous here and next in onLoad
//         let url = applicationObject.url + "after=" + applicationObject.currentResult.data.after
//         //storing current result so it can be used 
//         applicationObject.previousResults.push(applicationObject.currentResult)
//         $.ajax({url : url, success : onLoad})

// }

// const previousPage = () => {
//     if(applicationObject.previousResults.length === 0){
//         alert("No previous Page Present")
//     }
//     else {
//         let previousResult = applicationObject.previousResults.pop()
//         onLoad(previousResult)
//     }
// }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var nextPage = exports.nextPage = function nextPage(applicationObject, onLoad) {

    //updating previous here and next in onLoad
    var url = applicationObject.url + "after=" + applicationObject.currentResult.data.after;
    //storing current result so it can be used 
    applicationObject.previousResults.push(applicationObject.currentResult);
    $.ajax({ url: url, success: onLoad });
};

var previousPage = exports.previousPage = function previousPage(applicationObject, onLoad) {

    if (applicationObject.previousResults.length === 0) {
        alert("No previous Page Present");
    } else {
        var previousResult = applicationObject.previousResults.pop();
        onLoad(previousResult);
    }
};

// module.exports =  {nextPage : nextPage, previousPage : previousPage}

/***/ })
/******/ ]);