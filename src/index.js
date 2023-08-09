console.log('Write your code here');
const tickets_bought = document.querySelector("#tickets-bought")
const tickets_button = document.querySelector("#buy-tickets-button")

fetch("http://localhost:3000/current-exhibits")
.then(r => r.json())
.then(data => {
    displayArt(data[0])
    const comment_form = document.querySelector("#comment-form")
    
    comment_form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const newComment = e.target["comment-input"].value
        data[0].comments.push(newComment)
        patchData(data[0])
        addComments(newComment)
    })

    tickets_button.addEventListener("click",()=>{
        const newnum = parseInt(tickets_bought.textContent)+1
        tickets_bought.textContent = newnum + " Tickets Bought"
        data[0].tickets_bought = newnum
        patchData(data[0])
    })
})

function displayArt(art){
    const title = document.querySelector("#exhibit-title")
    const exhibit_description = document.querySelector("#exhibit-description")
    const comments_section = document.querySelector("#comments-section")
    const exhibit_image = document.querySelector("#exhibit-image")

    title.textContent = art.title
    tickets_bought.textContent = art.tickets_bought + " Tickets Bought"
    exhibit_description.textContent = art.description
    exhibit_image.src = art.image
    // comments_section.textContent = art.comments
    art.comments.forEach((comment)=>addComments(comment))
}
// Deliverable 1: Display the data
// fetch data
// select html elements
// assign textcontent
// Loop through comments
// create p tag
// attatch p element

// Deliverable 2: Add comments


// add comment string passed in
function addComments(comment){
    const p = document.createElement("p")
    p.textContent = comment
    const comments_section = document.querySelector("#comments-section")
    comments_section.append(p)
}
// Add an listener to form
// take new comment and diplay it

// Deliverable 3: Tickets


function patchData(artPiece){
    fetch(`http://localhost:3000/current-exhibits/${artPiece.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artPiece)
    })
}
// add an event listener
// increment tickets