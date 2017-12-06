const applicationObject = {
                           nextThread : "",
                           previousResults : [],
                           currentResult : [],
                           url : "https://www.reddit.com/.json?"
                        }
//on page load
$(document).ready( () => {
   
    $.ajax( {url : applicationObject.url, success : onLoad})
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
        let $comments = $("<div/>", {'text' : "No. of Comments : " }).append($('<a/>',{'href' : 'javascript:showComments("'+threadData.permalink+'")', 'text' : threadData.num_comments}))
        $threadData.append($comments)
        $thread.append($threadData)
        $thread.append("<hr/>")
        $("#content").append($thread)
    }
    catch(e){
        console.log(e.message)
    }
}

//
const nextPage = () => {
        
        //updating previous here and next in onLoad
        let url = applicationObject.url + "after=" + applicationObject.currentResult.data.after
        //storing current result so it can be used 
        applicationObject.previousResults.push(applicationObject.currentResult)
        $.ajax({url : url, success : onLoad})
   
}

const previousPage = () => {
    if(applicationObject.previousResults.length === 0){
        alert("No previous Page Present")
    }
    else {
        let previousResult = applicationObject.previousResults.pop()
        onLoad(previousResult)
    }
}