const params = new URLSearchParams(window.location.search);
const boardId = params.get('boardId');

// Fetch board info
fetch(`http://localhost:8080/boards/${boardId}`)
    .then(res => res.json())
    .then(board => {
        document.getElementById('boardName').textContent = board.name;
        document.getElementById('boardDescription').textContent = board.description || 'No description';
    })
    .catch(err => console.error('Error fetching board info:', err));

fetch(`http://localhost:8080/boards/${boardId}/deals`)                  // Fetch deals for this board

    .then(res => res.json())
    .then(deals => {
        console.log(deals);
        const dealContainer = document.getElementById('boardDealsContainer');
        dealContainer.innerHTML = '';

        if (!deals || deals.length === 0) {
            dealContainer.innerHTML = '<p>No deals in this board.</p>';
            return;
        }

        deals.forEach(deal => {
            const dealCard = createDealElement(deal);
            dealContainer.appendChild(dealCard);
        });
    })
    .catch(err => console.error('Error fetching deals for board:', err));

    
function createDealElement(deal) {  
    const dealCard = document.createElement('div');
    dealCard.classList.add('deal-card-item');
    
    dealCard.innerHTML = `
        <img src="https://placehold.co/250x150/5E81AC/fff/png?text=${deal.category}" alt="${deal.category}">
        <h3>${deal.description}</h3>
        <p>${deal.category}</p>
        <div class="deal-meta">
            <p class="deallink">Source: <a href="${deal.storeLink}" target="_blank">${deal.store}</a></p>
            <h5>Starts: ${deal.startDate}</h5>
            <h5>Ends: ${deal.endDate}</h5>
            <h3>Id: ${deal.dealId}</h3> 
            <button class="RemoveFromBoardBtn">Remove from Board</button>
        </div>
    `;


    const removeFromBoardBtn = dealCard.querySelector('.RemoveFromBoardBtn');           //Remove from board
    removeFromBoardBtn.addEventListener('click', function() {
        if (confirm('Remove this deal from the board?')) {
            const params = new URLSearchParams(window.location.search);
            const boardId = params.get('boardId');

            fetch(`http://localhost:8080/boards/${boardId}/deals/${deal.dealId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) throw new Error('Failed to remove deal from board');
                alert('Deal removed from board successfully!');
                dealCard.remove();
            })
            .catch(error => {
                console.error('Error removing deal from board:', error);
                alert('Failed to remove deal from board.');
            });
        }
    });

    return dealCard;
}

 