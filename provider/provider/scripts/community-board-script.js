window.onload = function() {

   
    fetch('http://localhost:8080/boards')                 // FETCH ALL BOARDS   
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const boardContainer = document.querySelector('.dashboard-grid-container');
            
            if (!data || data.length === 0) {
                boardContainer.innerHTML = '<p>No boards available.</p>';
                return;
            }

            boardContainer.innerHTML = "";

            data.forEach(board => {
                const boardElement = createBoardElement(board);
                boardContainer.appendChild(boardElement);
            });
        })
        .catch(error => {
            console.error('Error fetching boards:', error);
            const boardContainer = document.querySelector('.dashboard-grid');
            boardContainer.innerHTML = '<p>Error loading boards. Check if server is running.</p>';
        });



   
    const newBoardForm = document.getElementById("NewBoardForm");                        // ADD NEW BOARD
    newBoardForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const newBoardData = {
            name: document.getElementById("NewBoardName").value,
            description: document.getElementById("NewBoardDescription").value || null,
            category: document.getElementById("NewBoardCategory").value || null
        };

        if (!newBoardData.name) {
            alert("Please enter a board name.");
            return;
        }

        fetch('http://localhost:8080/boards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBoardData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(board => {
            alert("Board created successfully!");
            const boardContainer = document.querySelector('.dashboard-grid');
            const newBoardElement = createBoardElement(board);
            boardContainer.appendChild(newBoardElement);
        })
        .catch(error => {
            console.error('Error creating board:', error);
        });
    });
};


function createBoardElement(board) {                                  // CREATE BOARD CARD 
    const boardCard = document.createElement('div');
    boardCard.classList.add('board-card-item'); 

    const imageUrl = board.image && board.image.trim() !== ""
        ? board.image
        : `https://placehold.co/250x150/4C566A/fff/png?text=${board.name}`;

    boardCard.innerHTML = `
        <img src="${imageUrl}" alt="${board.name}">
        
        <h3>${board.name}</h3>
        <p>${board.description || "No description"}</p>

        <div class="deal-meta"> 
            <h5>Category: ${board.category || "None"}</h5>
            <h5>Rating: ${board.rating || "N/A"}</h5>
            <h5>ID: ${board.boardId}</h5>

            <button class="ViewBoardBtn">View Board</button>
        </div>
    `;

    const viewBtn = boardCard.querySelector('.ViewBoardBtn');               // VIEW BOARD deals
    viewBtn.addEventListener('click', function() {
        window.location.href = `picked-board.html?boardId=${board.boardId}`;
    });

    return boardCard;
}
