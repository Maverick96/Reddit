
const showComments = (post) => {
    console.log("It is working")
    $.ajax( { url : "https://www.reddit.com" + post + ".json" , success : onLoadd  })
  }

function onLoadd (result){
    $("#content").html('')
    console.log(result)
    let commentElement = document.querySelector("#content")
    result[1].data.children.forEach( (parentComment,index) =>{
    let padding = 50
        addRepliesToComment(parentComment,commentElement,padding)
    })

        //Scroll back to top of page
        $('html, body').animate({ scrollTop: 0 }, 'fast')
} 

const addRepliesToComment = (repliesArray, parentElement,padding) => {
    
    if(repliesArray.data.replies === ""){
        return
    }
    else if(repliesArray.kind === 'more'){
        return;
    }
    let newComment = $('<div/>',{class : 'parent-comment'})
    let tagline = createTagline(repliesArray.data.author,repliesArray.data.score,repliesArray.data.score_hidden)
    newComment.css("padding", "0px 0px 5px " + padding + "px")
    tagline.appendTo(newComment)
    let content = $('<div/>', {'class' : 'content'}).html(repliesArray.data.body)
    content.appendTo(newComment)

    $(parentElement).append(newComment)
    
    //console.log(repliesArray)
    padding = padding + 3
    repliesArray.data.replies.data.children.forEach((reply) => {
        addRepliesToComment(reply,newComment,padding)
    })
        
    
    

}

const createTagline = (author,score,isScoreHidden) => {
    let tagline = $('<p/>',{'class' : 'tagline'})
    console.log(isScoreHidden)
    if(isScoreHidden)
        score = 'score hidden'
    $('<a/>',{'href' : 'javascript:void(0)', 'onclick' : 'toggle(this)', 'text' : '[-]'}).appendTo(tagline)
    $('<a/>',{'href' : 'https://www.reddit.com/u/' + author,  'text' : author}).appendTo(tagline)
    $('<span/>',{'class' : 'score'}).html(score).appendTo(tagline)
    return tagline
}

const toggle = (hey) => {
    console.log(hey)
    $(hey).next().slideToggle()
    $(hey).text('[+]')
}