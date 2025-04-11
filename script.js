        // Memory database
        const memories = [
            "The letter you never sent.",
            "That Tuesday. You know the one.",
            "Why you kept that voicemail.",
            "The dream that woke you at 3:17 AM.",
            "When the stranger called you by a different name.",
            "The face you saw in the crowd that day.",
            "Why you stopped wearing that color.",
            "The words you rehearsed but never said.",
            "The promise you made to yourself at age twelve.",
            "How the air smelled before it happened.",
            "The secret you kept even from yourself.",
            "That song you can't remember the name of.",
            "The reason you still check that drawer.",
            "The shadow in the corner of your childhood bedroom.",
            "What made you hesitate that one time.",
            "The date that means something only to you.",
            "Why you still avoid that street.",
            "The pattern in the wallpaper that only you noticed.",
            "The moment you realized it was already too late.",
            "What you were trying to prove.",
            "The name you almost chose instead.",
            "What was written on that torn page.",
            "Why you still keep that key.",
            "The real reason you left early that night.",
            "What they whispered when they thought you couldn't hear.",
            "Why that particular memory makes you smile.",
            "The message you deleted immediately.",
            "What was in that recurring dream you had as a child.",
            "Why you sometimes still look for them in crowds.",
            "The significance of that number to you.",
            "What made you change your mind at the last second.",
            "The reason you stopped wearing that perfume.",
            "The reason you kept holding on when no one else did.",
            "What you saw in the mirror that morning.",
            "The ache that never had a cause.",
            "The ending you were too afraid to reach.",
            "What was on the other side of that door.",
            "The real reason you took that detour.",
            "Why that old photograph still unsettles you.",
            "What you were afraid would happen if you stayed.",
            "The words on the note you found in your pocket.",
            "Why you keep returning to the same place, hoping it’s changed.",
            "What they told you when no one else was listening.",
            "The sound that woke you that night.",
            "Why you abandoned that childhood ambition.",
            "The name of the street where it all changed.",
            "What you buried in the backyard.",
            "Why that specific cloud formation made you uneasy.",
            "What was reflected in the window that wasn't there.",
            "The taste of something you can't quite place.",
            "Why you haven't opened that box yet.",
            "What was behind that locked door in your grandparents' house.",
            "The words to that lullaby no one else knows.",
            "Why you sometimes wake up with tears in your eyes.",
            "What you were trying to find that summer.",
            "The reason you changed your handwriting.",
            "Why you can't bring yourself to throw away that old sweater.",
            "What made the hair on your neck stand up that afternoon.",
            "The message hidden in that birthday card.",
            "Why you started counting the steps.",
            "What was meant to stay hidden — but wasn’t.",
            "The question you were too afraid to ask.",
            "Why you never wear watches anymore.",
            "What was following you home that night.",
            "The reason behind that unexplained scar.",
            "Why you stopped believing in coincidences.",
            "What you refused to see the first time.",
            "The real purpose of that childhood ritual.",
            "Why you can't look at the stars the same way anymore.",
            "What you found when you weren't looking.",
            "The significance of that recurring number in your life.",
            "Why you avoid mirrors in the dark.",
            "What you saw in their eyes that made you turn away.",
            "The reason you changed your route to work.",
            "Why you stopped wearing that ring.",
            "What was carved into that tree before they cut it down.",
            "The promise you made that no one knows about.",
            "Why you still check under the bed sometimes.",
            "What you were looking for when you found something else entirely.",
            "The reason behind that inexplicable feeling of déjà vu.",
            "Why you prefer to sit with your back to the wall.",
            "What was hidden behind the wallpaper in your childhood room.",
            "The truth about that family story no one talks about.",
            "Why certain songs make you unexpectedly emotional.",
            "What your reflection whispered to you.",
            "The reason you don't like being alone in elevators.",
            "Why you can't remember what happened that entire day.",
            "What you erased before anyone could see it.",
            "The real reason you left town so suddenly.",
            "The note that wasn’t meant for you.",
            "Why you never returned to that place.",
            "What you found in the attic when no one else was home.",
            "The reason you still check that one specific voicemail.",
            "Why you suddenly stopped having that recurring dream.",
            "What made you change your mind about them.",
            "The significance of that seemingly random date.",
            "Why you still carry that particular photograph.",
            "What was written in that journal you lost.",
            "The words you couldn't bring yourself to say at the funeral.",
            "Why you sometimes still dial their number.",
            "What made that particular sunset different from all others.",
            "The real meaning behind that childhood nickname.",
            "Why certain smells transport you immediately back in time.",
            "What you found when you finally looked.",
            "The reason you stopped trusting your intuition."
        ];

        // Rare memories (0.5% chance)
        const rareMemories = [
            "The entity that watches you sleep isn't what you think it is.",
            "You aren't the first version of yourself to live this life.",
            "Someone knows exactly what you did."
        ];

        // DOM elements
        const mainContent = document.getElementById('main-content');
        const archiveContent = document.getElementById('archive-content');
        const revealBtn = document.getElementById('reveal-btn');
        const memoryResult = document.getElementById('memory-result');
        const actionBtns = document.getElementById('action-btns');
        const tryAgainBtn = document.getElementById('try-again-btn');
        const saveImageBtn = document.getElementById('save-image-btn');
        const darkModeBtn = document.getElementById('dark-mode-btn');
        const soundBtn = document.getElementById('sound-btn');
        const soundIndicator = document.getElementById('sound-indicator');
        const archiveBtn = document.getElementById('archive-btn');
        const archiveList = document.getElementById('archive-list');
        const backBtn = document.getElementById('back-btn');
        const ambientSound = document.getElementById('ambient-sound');

        // State variables
        let soundEnabled = false;
        let viewedMemories = JSON.parse(localStorage.getItem('viewedMemories')) || [];
        let dailyMemoryCount = 0;
        const lastUsedDate = localStorage.getItem('lastUsedDate');
        const currentDate = new Date().toDateString();

        // Check if it's a new day and reset the counter
        if (lastUsedDate !== currentDate) {
            localStorage.setItem('lastUsedDate', currentDate);
            localStorage.setItem('dailyMemoryCount', '0');
            dailyMemoryCount = 0;
        } else {
            dailyMemoryCount = parseInt(localStorage.getItem('dailyMemoryCount') || '0');
        }

        // Initialize dark mode from localStorage
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }

        // Get a random memory
        function getRandomMemory() {
            // Check if we've reached the daily limit (2 per day)
            if (dailyMemoryCount >= 2) {
                return "You've remembered enough for today. Return tomorrow.";
            }

            // 0.5% chance for rare memory
            if (Math.random() < 0.005) {
                const randomIndex = Math.floor(Math.random() * rareMemories.length);
                return rareMemories[randomIndex];
            }

            const randomIndex = Math.floor(Math.random() * memories.length);
            return memories[randomIndex];
        }

        // Show memory
// Show memory
function showMemory() {
    revealBtn.style.display = 'none';
    document.querySelector('.or-maybe').style.display = 'none';

    const memory = getRandomMemory();
    memoryResult.textContent = memory;

    // Shrink container height
    document.querySelector('.container').style.height = '123.9vh';

    // Add memory to viewed list if not daily limit message
    if (!memory.includes("You've remembered enough")) {
        dailyMemoryCount++;
        localStorage.setItem('dailyMemoryCount', dailyMemoryCount.toString());

        // Add to archive if not already there
        if (!viewedMemories.includes(memory)) {
            viewedMemories.push(memory);
            localStorage.setItem('viewedMemories', JSON.stringify(viewedMemories));
        }
    }

    // Fade in animation
    setTimeout(() => {
        memoryResult.classList.add('fade-in');
    }, 100);

    // Show action buttons
    setTimeout(() => {
        actionBtns.classList.add('visible'); // Use the 'visible' class
    }, 2000);
}

// Reset to initial state
function resetMemory() {
    memoryResult.classList.remove('fade-in');
    memoryResult.textContent = '';
    actionBtns.classList.remove('visible'); // Use the 'visible' class
    revealBtn.style.display = 'block';
    document.querySelector('.or-maybe').style.display = 'block';
}

        // Save as image
        function saveAsImage() {
            // Create a temporary canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions
            canvas.width = 800;
            canvas.height = 600;

            // Fill background
            const isDarkMode = document.body.classList.contains('dark-mode');
            ctx.fillStyle = isDarkMode ? '#1a1a1f' : '#f5f5f7';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw title
            ctx.font = '30px "Cormorant Garamond", serif';
            ctx.fillStyle = isDarkMode ? '#e0e0e0' : '#333';
            ctx.textAlign = 'center';
            ctx.fillText('What You Forgot to Remember', canvas.width / 2, 100);

            // Draw memory
            ctx.font = 'italic 24px "Cormorant Garamond", serif';

            // Handle text wrapping
            const maxWidth = 600;
            const lineHeight = 36;
            const words = memoryResult.textContent.split(' ');
            let line = '';
            let y = canvas.height / 2;

            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;

                if (testWidth > maxWidth && i > 0) {
                    ctx.fillText(line, canvas.width / 2, y);
                    line = words[i] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, canvas.width / 2, y);

            // Convert to image and trigger download
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'forgotten-memory.png';
            link.href = dataUrl;
            link.click();
        }

        // Toggle dark mode
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        }

        // Toggle sound
        function toggleSound() {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                ambientSound.volume = 0.2;
                ambientSound.play();
                soundIndicator.textContent = '●';
            } else {
                ambientSound.pause();
                soundIndicator.textContent = '◯';
            }
        }

        // Show archive
        function showArchive() {
            mainContent.style.display = 'none';
            archiveContent.style.display = 'block';

            // Clear archive list
            archiveList.innerHTML = '';

            // Populate archive list
            if (viewedMemories.length === 0) {
                const emptyItem = document.createElement('li');
                emptyItem.className = 'archive-item';
                emptyItem.textContent = 'You have not remembered anything yet.';
                archiveList.appendChild(emptyItem);
            } else {
                viewedMemories.forEach(memory => {
                    const item = document.createElement('li');
                    item.className = 'archive-item';
                    item.textContent = memory;
                    archiveList.appendChild(item);
                });
            }
        }

        // Show main content
        function showMain() {
            archiveContent.style.display = 'none';
            mainContent.style.display = 'flex';
        }

        // Event listeners
        revealBtn.addEventListener('click', showMemory);
        tryAgainBtn.addEventListener('click', resetMemory);
        saveImageBtn.addEventListener('click', saveAsImage);
        darkModeBtn.addEventListener('click', toggleDarkMode);
        soundBtn.addEventListener('click', toggleSound);
        archiveBtn.addEventListener('click', showArchive);
        backBtn.addEventListener('click', showMain);