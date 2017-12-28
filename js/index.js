const applicationObject = {
                           nextThread : "",
                           previousResults : [],
                           currentResult : [],
                           url : "https://www.reddit.com/.json?"
                        }
//on page load

import '../css/index.css'
import {previousPage,nextPage} from './pagination.js'
import {comments} from './fetchComments'
console.log((comments))
$(document).ready( function() {
   
    $.ajax( {url : applicationObject.url, success : onLoad})
    $("button").on("click", (event) =>{
        if(event.currentTarget.textContent === 'Previous')
            previousPage(applicationObject, onLoad)      
        else if(event.currentTarget.textContent === 'Next')
            nextPage(applicationObject, onLoad)
    })  
})

const onLoad = (result) => {
    //clear the content div to add the new threads
    $("#content").html('')
    //Iterate through the result of the ajax call
    $.each(result.data.children, function(index,value){
        createThread(value.data,index)
    })
    applicationObject.currentResult = result
    //Scroll back to top of page
    $('html, body').animate({ scrollTop: 0 }, 'fast')
}

const createThread = function(threadData,index){
    //creating element for thread
    try {
        let $thread = $('<div/>',{'class' : 'thread', 'data-index' : index});
        let $threadImage = $('<div/>', {'class' : 'thread-image'}).append($('<img/>',{'src' : threadData.preview.images[0].source.url, 'alt' : 'Thread Image', 'height' : '100','widht' : '100'}))
        $thread.append($threadImage)
        let $threadData = $('<div/>', {'class'  : 'thread-data'})
        let $subredditName = $('<div/>', {'text' : "Subreddit : " + threadData.subreddit_name_prefixed})
        $threadData.append($subredditName)
        let $title = $('<div/>', { 'text' : 'Title : ' + threadData.title})
        $threadData.append($title)
        let $upVote = $('<div/>',{'text' : "Up Votes : " + threadData.ups})
        $threadData.append($upVote)
        let $link = $("<div/>",{'text' : "Source : " });
        //hyperlink for the source
        $("<a>",{'href' : threadData.url, 'text' : threadData.url, 'target' : '_blank'}).appendTo($link)
        $threadData.append($link)
        let $comments = $("<div/>", {'text' : "No. of Comments : " }).append($('<a/>',{'href' : 'javascript:void(0)','text' : threadData.num_comments}).click(() => comments.showComments(threadData.permalink)))  
        $threadData.append($comments)
        $thread.append($threadData)
        $thread.append("<hr/>")
        $("#content").append($thread)
    }
    catch(e){
        console.log(e.message)
    }
}