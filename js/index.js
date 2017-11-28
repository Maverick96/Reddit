var page = { previousThread : {}, nextThread : {}}
$(document).ready( () => {
   
    $.ajax( {url : "https://www.reddit.com/.json", success : onLoad})
})

const onLoad = (result) => {
    //Iterate through the result of the ajax call
    $("#content").html('')
    $.each(result.data.children, function(index,value){
        createThread(value.data)
        console.log("In each")
    })
    page.nextThread.kind = result.data.children[24].kind;
    page.nextThread.id = result.data.children[24].data.id;
    console.log(page.nextThread)
    $('html, body').animate({ scrollTop: 0 }, 'fast')
}

let createThread = function(threadData){
    //creating element for thread
    try {
        let $thread = $('<div/>',{'class' : 'thread'});
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
        let $comments = $("<div/>", {'text' : "No. of Comments : " + threadData.num_comments})
        $threadData.append($comments)
        $thread.append($threadData)
        $thread.append("<hr/>")
        $("#content").append($thread)
    }
    catch(e){
        console.log(e.message)
    }
}

const nextPage = () => {
    if(Object.keys(page.nextThread).length === 0 && page.nextThread.constructor === Object){
        alert("No previous page present");
    }
    else {
         page.previousThread = page.nextThread
        let urlParameter = page.nextThread.kind + "_" + page.nextThread.id
        let url = "https://www.reddit.com/.json?" + "after=" + urlParameter
        $.ajax({url : url, success : onLoad})
    }
}

// const pageLoad = (result) => {

// }