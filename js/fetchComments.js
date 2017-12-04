
$(document).ready( () => {
    console.log("It is working")
    $.ajax( { url : "http://www.reddit.com/r/pics/comments/7h6hxv/Frosty_the_Swoleman/.json?" , success : onLoad  })
  })

function onLoad (result){
    console.log(result)
    let commentElement = document.querySelector(".comments")
    result[1].data.children.forEach( (parentComment,index) =>{
    //     let newComment = $('<div/>',{class : 'parent-comment', 'data-index' : index}).html(parentComment.body)
    //     if(parentComment.replies !== ""){
    //         addRepliesToComment(parentComment.replies, newComment)
    //     }
    //     (".comments").append(newComment)
    let padding = 50
        addRepliesToComment(parentComment,commentElement,padding)
    })
} 

const addRepliesToComment = (repliesArray, parentElement,padding) => {
    let newComment = $('<div/>',{class : 'parent-comment'}).html(repliesArray.data.body)
    newComment.css("padding", "0px 0px 5px " + padding + "px")
    $(parentElement).append(newComment)
    if(repliesArray.data.replies === ""){
        return
    }
    else if(repliesArray.kind === 'more'){
        return;
    }
    console.log(repliesArray)
    padding = padding + 4
    repliesArray.data.replies.data.children.forEach((reply) => {
        addRepliesToComment(reply,newComment,padding)
    })
        
    
    

}