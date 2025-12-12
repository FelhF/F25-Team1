window.onload = function() {

    // FETCH ALL BOARDS
    fetch('http://localhost:8080/boards')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const boardContainer = document.getElementById('boardContainer');
            
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
            const boardContainer = document.getElementById('boardContainer');
            boardContainer.innerHTML = '<p>Error loading boards. Check if server is running.</p>';
        });



    const newBoardForm = document.getElementById("NewBoardForm");                       // ADD NEW BOARD

    newBoardForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const newBoardData = {
            name: document.getElementById("NewBoardName").value,
            description: document.getElementById("NewBoardDescription").value || null
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
            const boardContainer = document.getElementById('boardContainer');
            const newBoardElement = createBoardElement(board);
            boardContainer.appendChild(newBoardElement);
        })
        .catch(error => {
            console.error('Error creating board:', error);
        });
    });
};

function createBoardElement(board) {                                // CREATE BOARD CARD ELEMENT

    const boardCard = document.createElement('div');
    boardCard.classList.add('board-card-item');

    boardCard.innerHTML = `
        <div class="board-card-content">
            <h3>${board.name}</h3>
            <p>${board.description || "No description"}</p>

            <div class="board-meta">
                <h5>ID: ${board.boardId}</h5>
                <button class="ViewBoardBtn">View Board</button>
                <button class="RemoveBoardBtn" data-id="${board.boardId}">Remove</button>
            </div>
        </div>
    `;

    const removeBtn = boardCard.querySelector('.RemoveBoardBtn');                   // DELETE BOARD

    removeBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this board?')) {
            fetch(`http://localhost:8080/boards/${board.boardId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete the board');
                }
                alert("Board removed successfully!");
                boardCard.remove();
            })
            .catch(error => {
                console.error('Error deleting board:', error);
                alert('Failed to delete the board.');
            });
        }
    });

   
    const viewBtn = boardCard.querySelector('.ViewBoardBtn');                // VIEW BOARD
    viewBtn.addEventListener('click', function() {
        window.location.href = `picked-board.html?boardId=${board.boardId}`; //Link to the picked board page
    });

    return boardCard;
}