window.onload = function() {
    const searchButton = document.getElementById("SearchDeal");
    const searchInput = document.getElementById("searchInput");
    const createNewDealButton = document.getElementById("CreateNewDealButton");
    const newDealForm = document.getElementById("NewDealForm");
    
    fetchDeals();

    searchButton.addEventListener("click", function() {                     // SEARCH DEALS BY CATEGORY
        const query = searchInput.value.trim();
        if (query) {
            fetch(`http://localhost:8080/deals/category/${query}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch deals');
                    }
                    return response.json();
                })
                .then(data => {
                    renderDeals(data);
                })
                .catch(error => {
                    console.error('Error fetching deals:', error);
                    alert('Error fetching deals. Try again later.');
                });
        } else {
            fetchDeals();
        }
    });

    createNewDealButton.addEventListener("click", function(event) {         // GET New deal information
        event.preventDefault();
        const category = document.getElementById("NewDealcategory").value.trim();
        const description = document.getElementById("NewDealdescription").value.trim();
        const address = document.getElementById("NewDealAddress").value.trim();
        const store = document.getElementById("NewDealStore").value.trim();
        const storeLink = document.getElementById("NewDealStoreLink").value.trim();
        const startDate = document.getElementById("NewDealStartDate").value;
        const endDate = document.getElementById("NewDealEndDate").value;

        if (!category || !store || !startDate || !endDate) {
            alert("Please fill out all required fields.");
            return;
        }

        const newDeal = {
            category: category,
            description: description,
            address: address,
            store: store,
            storeLink: storeLink,
            startDate: startDate,
            endDate: endDate
        };

        fetch('http://localhost:8080/deals', {                      //update deals
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDeal)
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to create new deal');
            return response.json();
        })
        .then(data => {
            alert("New deal added successfully!");
            newDealForm.reset();
            fetchDeals();
        })
        .catch(error => {
            console.error('Error creating new deal:', error);
            alert('Failed to create new deal. Please try again later.');
        });
    });

    function fetchDeals() {                                         // FETCH ALL DEALS
        fetch('http://localhost:8080/deals')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                renderDeals(data);
            })
            .catch(error => {
                console.error('Error fetching deals:', error);
                const dealContainer = document.getElementById('dealContainer');
                dealContainer.innerHTML = '<p>Error loading deals. Check if server is running.</p>';
            });
    }

    function renderDeals(deals) {                                          // Display deals
        const dealContainer = document.getElementById('dealContainer');
        dealContainer.innerHTML = '';

        if (deals.length === 0) {
            dealContainer.innerHTML = '<p>No deals available for the selected category.</p>';
            return;
        }

        deals.forEach(deal => {
            const dealElement = createDealElement(deal);
            dealContainer.appendChild(dealElement);
        });
    }

    function createDealElement(deal) {                          //Create deal card
        const dealCard = document.createElement('div');
        dealCard.classList.add('deal-card-item');
        
        dealCard.innerHTML = `
            <img src="https://placehold.co/250x150/5E81AC/fff/png?text=${deal.category}" alt="${deal.category}">
            <h3>${deal.description}</h3>
            <p>${deal.category}</p>
            <div class="deal-meta">
                <p>Source: <a href="${deal.storeLink}" target="_blank">${deal.store}</a></p>
                <h5> Starts: ${deal.startDate}</h5>
                <h5> Ends: ${deal.endDate}</h5>
                <h3>Id: ${deal.dealId}</h3> 
                <button class="AddtoBoardbtn">Add to Board</button>
                <button class="RemoveDealBtn" data-id="${deal.dealId}">Remove</button>  
            </div>
        `;

        const removeBtn = dealCard.querySelector('.RemoveDealBtn');             // DELETE DEAL
        removeBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this deal?')) {
                fetch(`http://localhost:8080/deals/${deal.dealId}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) throw new Error('Failed to delete the deal');
                    alert("Deal removed successfully!");
                    dealCard.remove();
                })
                .catch(error => {
                    console.error('Error deleting deal:', error);
                    alert('Failed to delete the deal. Please try again later.');
                });
            }
        });

        const addToBoardBtn = dealCard.querySelector('.AddtoBoardbtn');             // ADD DEAL TO BOARD
        addToBoardBtn.addEventListener('click', function() {
            fetch('http://localhost:8080/boards')
                .then(response => response.json())
                .then(boards => {
                    if (!boards.length) {
                        alert('No boards available. Please create one first.');
                        return;
                    }

                    const select = document.createElement('select');
                    boards.forEach(board => {
                        const option = document.createElement('option');
                        option.value = board.id;
                        option.textContent = board.name;
                        select.appendChild(option);
                    });

                    const confirmBtn = document.createElement('button');
                    confirmBtn.textContent = 'Add';
                    const container = document.createElement('div');
                    container.style.marginTop = '10px';
                    container.appendChild(select);
                    container.appendChild(confirmBtn);
                    dealCard.appendChild(container);

                    confirmBtn.addEventListener('click', () => {
                        const boardId = select.value;
                        fetch(`http://localhost:8080/boards/${boardId}/deals/${deal.dealId}`, {
                            method: 'POST'
                        })
                        .then(response => {
                            if (!response.ok) throw new Error('Failed to add deal to board');
                            alert('Deal added to board successfully!');
                            container.remove();
                        })
                        .catch(error => {
                            console.error(error);
                            alert('Failed to add deal to board.');
                        });
                    });
                })
                .catch(error => {
                    console.error(error);
                    alert('Failed to fetch boards.');
                });
        });

        return dealCard;
    }
}
