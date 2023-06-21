comment_list = document.querySelector('#comments-section')

fetch('http://localhost:3000/current-exhibits')
.then(r => r.json())
.then(data => displayData(data[0]))

function displayData(exhibit){
    title = document.querySelector('#exhibit-title')
    description = document.querySelector('#exhibit-description')
    comment_form = document.querySelector('#comment-form')
    ticket_display = document.querySelector('#tickets-bought')
    ticket_button = document.querySelector('#buy-tickets-button')

    comment_form.addEventListener('submit', (event)=>{
        event.preventDefault()
        addComment(event.target[0].value)
        exhibit.comments.push(event.target[0].value)
        patchComments(exhibit.comments)
        event.target[0].value = ""
    })

    ticket_button.addEventListener('click', ()=>{
        exhibit.tickets_bought += 1
        ticket_display.textContent = `${exhibit.tickets_bought} Tickets Bought`
        patchBought(exhibit.tickets_bought)
    })


    ticket_display.textContent = `${exhibit.tickets_bought} Tickets Bought`
    title.textContent = exhibit.title 
    description.textContent = exhibit.description

    exhibit.comments.forEach(comment => {
        addComment(comment)
    });
}

function addComment(comment){
    p = document.createElement('p')
    p.textContent = comment
    comment_list.append(p)
}

function patchBought(ticketNum){
    fetch('http://localhost:3000/current-exhibits/1',
        {
            method: "PATCH",
            body: JSON.stringify(
                {
                    "tickets_bought": ticketNum
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

function patchComments(comments){
    fetch('http://localhost:3000/current-exhibits/1',
        {
            method: "PATCH",
            body: JSON.stringify(
                {
                    "comments": comments
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

