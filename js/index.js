$(document).ready( () => {
    $.ajax( {url : "https://www.reddit.com/.json", success : onLoad})
})

var onLoad = (result) => {
    //Iterate through the result of the ajax call
    $.each(result.data.children, function(index,value){
        createThread(value.data)
    })
    
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