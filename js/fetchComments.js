export const comments = () => {

    const showComments = (post) => {
        console.log("It is working")
        $.ajax( { url : "https://www.reddit.com" + post + ".json" , success : onLoad  })
    }

    function onLoad (result){
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
        //if no replies are present
        if(repliesArray.data.replies === ""){
            return
        }
        /*
        TODO :
            implent load more comments feature
        */
        else if(repliesArray.kind === 'more'){
            return;
        }
        
        let newComment = $('<div/>',{class : 'parent-comment'})
        let tagline = createTagline(repliesArray.data.author,repliesArray.data.score,repliesArray.data.score_hidden)
        newComment.css("padding", "0px 0px 5px " + padding + "px")
        tagline.appendTo(newComment)
        let child = $('<div/>', {'class' : 'child'}).html(repliesArray.data.body)
        child.appendTo(newComment)

        $(parentElement).append(newComment)
        
        padding = padding + 3
        //iterate throught the replies for the current comment
        repliesArray.data.replies.data.children.forEach((reply) => {
            addRepliesToComment(reply,child,padding)
        })
            
        
        

    }
    // construct the tagline(author name, score and comment expand/collpase)
    const createTagline = (author,score,isScoreHidden) => {
        let tagline = $('<p/>',{'class' : 'tagline'})
        
        //hide score if required
        if(isScoreHidden)
            score = 'score hidden'
        $('<a/>',{'href' : 'javascript:void(0)', 'onclick' : 'toggle(this)', 'text' : '[-]'}).appendTo(tagline)
        $('<a/>',{'href' : 'https://www.reddit.com/u/' + author,  'text' : author}).appendTo(tagline)
        $('<span/>',{'class' : 'score'}).html(score).appendTo(tagline)
        return tagline
    }

    // expand/collapse comments
    const toggle = (self) => {
        console.log(self)
        let divEle = $(self).parent().next()[0]
        $(divEle).slideToggle()
        let comment = $(self).text()
        // check if comment is currently expanded or collapsed
        comment = (comment === '[-]')? '[+]' : '[-]'
        $(self).text(comment)
    }
}