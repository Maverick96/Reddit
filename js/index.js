$(document).ready( () => {
    $.ajax( {url : "https://www.reddit.com/.json", success : onLoad})
})

var onLoad = (result)=> {
    console.log(result)
    createThread(result.data.children[0].data)
}

let createThread = function(threadData){
    $("#score").html(threadData.score)
    $("#title").html(threadData.title)
    $("#comments").html(threadData.num_comments)
    $("#subredditName").html(threadData.subreddit)
}