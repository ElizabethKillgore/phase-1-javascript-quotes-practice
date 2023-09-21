
document.addEventListener("DOMContentLoaded", function() {
    console.log("The DOM has loaded")

fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(quoteData => {
        quoteData.forEach(quote => {
           creatQuoteList(quote) 
        })
        console.log(quoteData)
    })

    function creatQuoteList(quote) {
        // debugger
      let quoteCard = document.createElement('li')
      quoteCard.className = 'quote-card'
      document.querySelector("#quote-list").append(quoteCard)
      let blockQuote = document.createElement('blockquote')
      blockQuote.className = 'blockquote'
      quoteCard.append(blockQuote)
        let theQuote = document.createElement('p')
        theQuote.className = 'mb-0'
        theQuote.innerText = quote.quote
        blockQuote.append(theQuote)
        let blockQuoteFooter = document.createElement('footer')
        blockQuoteFooter.className = 'blockquote-footer'
        blockQuoteFooter.innerText = quote.author
        blockQuote.append(blockQuoteFooter)
        let lineBreak = document.createElement('br')
        blockQuote.append(lineBreak)
        let successButton = document.createElement('button')
        successButton.className = 'btn-success'
        successButton.innerText = "Likes"
        blockQuote.append(successButton)
        let spanOfSuccessButton = document.createElement('span')
        spanOfSuccessButton.innerText = quote.likes.length
        blockQuote.append(spanOfSuccessButton)
        let dangerButton = document.createElement('button')
        dangerButton.className = 'btn-danger'
        dangerButton.innerText = "Delete"
        blockQuote.append(dangerButton)
    
        

        successButton.addEventListener('click', (e) => {
            updateLikes(quote)
        })
        function updateLikes(quote) {
            let likesObject = {
            quoteId: quote.id
            }
        
         fetch('http://localhost:3000/likes', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
             Accept: "application/json"
            },
            body:JSON.stringify(likesObject)
            })
            .then(res => res.json())
            .then(likes => spanOfSuccessButton.innerText = quote.likes.length+1)
        
    
    
        dangerButton.addEventListener('click', (e) => {
            fetch(`http://localhost:3000/quotes/${quote.id}`, {
                method: "DELETE",
                headers: {
                 'Content-Type': 'application/json'
                }
                   
                })
                .then(res => res.json())
                .then(theQuote => console.log(theQuote))
            })
         } 
        } 
        let newQuoteForm = document.querySelector("#new-quote-form")
        newQuoteForm.addEventListener('submit', addNewQuote)
    
        function addNewQuote(e) {
        e.preventDefault()
        
        
        let newObject = {
            author:e.target.children[1].children[1].value,
            quote:e.target.children[0].children[1].value,
            likes:[]
        }
        
        creatQuoteList(newObject)
        } 
        
    
       

    })
        




