        // Memory database
        const memories = [
            "That Tuesday. You know the one.",
            "The dream that woke you at 3:17 AM.",
            "When the stranger called you by a different name.",
            "The face you saw in the crowd that day.",
            "Why you stopped wearing that color.",
            "The words you rehearsed but never said.",
            "The promise you made to yourself at age twelve.",
            "How the air smelled before it happened.",
            "The secret you kept even from yourself.",
            "That song you can't remember the name of.",
            "The reason you still check that place.",
            "The shadow in the corner of your childhood bedroom.",
            "What made you hesitate that one time.",
            "The date that means something only to you.",
            "Why you still avoid that street.",
            "The pattern in the wallpaper that only you noticed.",
            "The moment you realized it was already too late.",
            "What you were trying to prove.",
            "The person you almost chose instead.",
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
            "What you erased before anyone could see it.",
            "Why you keep returning to the same place, hoping it’s changed.",
            "What you refused to see the first time.",
            "The reason you never threw it away.",
            "The ending you were too afraid to reach.",
            "What was on the other side of that door.",
            "The real reason you took that detour.",
            "Why that old photo still unsettles you.",
            "What you were afraid would happen if you stayed.",
            "What they told you when no one else was listening.",
            "The sound that woke you that night.",
            "Why you abandoned that childhood ambition.",
            "The name of the street where it all changed.",
            "What was reflected in the window that wasn't there.",
            "The taste of something you can't quite place.",
            "Why you haven't opened that box yet.",
            "Why you sometimes wake up with tears in your eyes.",
            "What you were trying to find that summer.",
            "Why you can't bring yourself to throw away that old thing.",
            "The words they wrote but never meant for you to read.",
            "The question you were too afraid to ask.",
            "What was following you home that night.",
            "Why you stopped believing in coincidences.",
            "The real purpose of that childhood ritual.",
            "Why you can't look at the stars the same way anymore.",
            "What you found when you weren't looking.",
            "The significance of that recurring number in your life.",
            "Why you avoid mirrors in the dark.",
            "What you saw in their eyes that made you turn away.",
            "The reason you changed your route to work.",
            "Why you stopped wearing it.",
            "The promise you made that no one knows about.",
            "Why you still check under the bed sometimes.",
            "What you were looking for when you found something else entirely.",
            "The reason behind that inexplicable feeling of déjà vu.",
            "Why you prefer to sit with your back to the wall.",
            "What was hidden behind the wallpaper in your childhood room.",
            "The truth about that family story no one talks about.",
            "Why that song makes you unexpectedly emotional.",
            "What you found when you weren't looking",
            "The reason you don't like being alone in elevators.",
            "Why you can't remember what happened that entire day.",
            "Why you never returned to that place.",
            "What you found in the attic.",
            "The reason you still listen to that one specific voicemail.",
            "Why you suddenly stopped having that recurring dream.",
            "What made you change your mind about them.",
            "The significance of that seemingly random date.",
            "Why you still have that particular photo.",
            "The words you couldn't bring yourself to say at the funeral.",
            "Why you sometimes still dial their number.",
            "What made that particular sunset different from all others.",
            "The real meaning behind that childhood nickname.",
            "Why that smell immediately transports you back in time.",
            "What you found when you finally looked.",
            "The reason you stopped trusting your intuition.",
            "The time you pretended not to notice.",
            "The name you never told anyone.",
            "Why silence felt louder that day.",
            "What you lost the moment you laughed.",
            "The reason you never corrected them.",
            "That one question you still don't want the answer to.",
            "The first time you felt completely alone in a crowd.",
            "Why you didn’t take that last photo.",
            "The sound you haven’t heard since but know you'd recognize instantly.",
            "The moment the air shifted and you couldn’t explain why.",
            "Why that hour went missing.",
            "The reason that year feels unfinished.",
            "The moment you stepped into that person's timeline.",
            "Why you keep pretending you don’t remember.",
            "That thing you still feel guilty for — even now.",
            "What you almost told them, but didn't.",
            "Why you didn’t speak up when you had the chance.",
            "The thing you knew before you were supposed to.",
            "What you left behind without realizing it.",
            "The moment that felt like a warning.",
            "Why the room felt different that day.",
            "What slipped between the cracks of that conversation.",
            "What made you start counting, and why you never stopped.",
            "What you read that changed everything."

        ];

        // Rare memories (0.5% chance)
        const rareMemories = [
            "The entity that watches you sleep isn't what you think it is.",
            "You aren't the first version of yourself to live this life.",
            "Someone knows exactly what you did.",
            "Your childhood imaginary friend still answers when you call, but only at 3 AM.",
            "Your reflection blinks half a second slower than you do."
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
        const chimeSound = document.getElementById('chime-sound');

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
            if (dailyMemoryCount >= 500) {
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

    if (soundEnabled) {
        chimeSound.play();
    }

    const memory = getRandomMemory();
    memoryResult.textContent = memory;

    saveImageBtn.style.display = 'inline-block'; 

    // Shrink container height
    document.querySelector('.container').style.height = '108.5%';

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
    saveImageBtn.style.display = 'none';
}

        // Save as image
        function saveAsImage() {
            const memoryText = document.getElementById('memory-result').textContent.trim();
            if (!memoryText) return;
        
            const isDarkMode = document.body.classList.contains('dark-mode');
        
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
        
            canvas.width = 800;
            canvas.height = 500;
        
            // Background gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#2b2f4b');
            gradient.addColorStop(0.33, '#3b3f6b');
            gradient.addColorStop(0.66, '#4d5194');
            gradient.addColorStop(1, '#2b2f4b');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        
            // Title
            ctx.font = 'bold 48px "Cormorant Garamond", serif';
            ctx.fillStyle = isDarkMode ? '#e0e0e0' : '#e0e0e0';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('What You Forgot to Remember', canvas.width / 2, 50);
        
            // Subtitle
            ctx.font = 'italic 24px "Cormorant Garamond", serif';
            ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.4)';
            ctx.fillText("It's there. You just haven't looked yet.", canvas.width / 2, 110);
        
            // Memory text
            ctx.font = 'italic 32px "Cormorant Garamond", serif';
            ctx.fillStyle = isDarkMode ? '#cfcfcf' : '#cfcfcf';
        
            const words = memoryText.split(' ');
            const maxWidth = 700;
            const lineHeight = 48;
            let line = '';
            let y = canvas.height * 0.55;
        
            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + ' ';
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && i > 0) {
                    ctx.fillText(line, canvas.width / 2, y);
                    line = words[i] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, canvas.width / 2, y);
        
            // Footer/credit text
            ctx.font = '12px sans-serif';
            ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.4)';
            ctx.textAlign = 'right';
            ctx.fillText('remembered at lucasgerbasi.github.io/what-you-forgot-to-remember', canvas.width - 20, canvas.height - 20);
        
            // Download
            const link = document.createElement('a');
            link.download = 'forgotten-memory.png';
            link.href = canvas.toDataURL('image/png');
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
            } else {
                ambientSound.pause();
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