document.addEventListener('DOMContentLoaded', () => {
    // 1. Burger Menu Functionality (for mobile)
    const burgerMenu = document.querySelector('.burger-menu');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    burgerMenu.classList.remove('active');
                }
            });
        });
    }

   const gamesData = [
    {
        id: 'crazy-racer-2000',
        title: 'Crazy Racer 2000',
        thumbnail: 'crazyrace.png',
        fullImage: 'crazyrace.png',
        description: 'A thrilling retro racing game where you navigate through traffic and collect points. Dodge incoming vehicles and aim for the high score!',
        longDescription: 'Crazy Racer 2000 is an exhilarating arcade-style racing game. Take control of your pixelated car and weave through a relentless stream of enemy vehicles. The objective is simple: survive as long as possible, avoid collisions, and rack up points for every obstacle successfully dodged. With responsive controls and increasing difficulty, it offers a challenging and addictive experience for all retro gaming enthusiasts. Get ready to hit the road and prove your driving skills in this high-octane adventure!',
        gameUrl: 'crazy_race2000.html'
    },
    {
        id: 'space-invaders-x',
        title: 'Space Invaders X',
        thumbnail: 'space_invaders.png',
        fullImage: 'space_invaders.png',
        description: 'Defend Earth from endless waves of alien invaders in this classic arcade shooter remake.',
        longDescription: 'Space Invaders X is a modern take on the timeless classic. Command your laser cannon and strategically eliminate descending rows of alien attackers. Each wave presents a new challenge with faster enemies and more complex patterns. Collect power-ups to enhance your firepower and shields, and prepare for epic boss battles. The fate of the galaxy rests in your hands!',
        gameUrl: 'space_invaders.html'
    },
    {
        id: 'puzzle',
        title: ' Puzzle',
        thumbnail: 'puzle.png',
        fullImage: 'puzle.png',
        description: 'Test your logic and memory in this neon-styled tile puzzle challenge!',
        longDescription: 'Retro Puzzle is a nostalgic logic game that challenges you to arrange tiles in perfect order. Swap and slide them strategically to restore balance in this digital maze. With its minimalistic neon design and simple yet addictive gameplay, Retro Puzzle brings old-school fun to your screen. Perfect for players who love a brain-teasing arcade twist.',
        gameUrl: 'puzle.html'
    },
    {
        id: 'midnight-guard',
        title: ' Midnight Guard',
        thumbnail: 'midnightguard.png',
        fullImage: 'midnightguard.png',
        description: 'Step into the darkness as the last guard of an eerie facility. Can you save all the children ?',
        longDescription: 'Midnight Guard is a tense pixel horror escape game. Navigate a dimly lit building, uncover secrets, and save the lost children before sunrise. Avoid shadowy figures and manage your limited visibility as you progress through increasingly dangerous levels. Inspired by retro survival games, it blends suspense, exploration, and pixel horror into one unforgettable experience.',
        gameUrl: 'MidNight_guard.html'
    }
];

    const gamesContainer = document.getElementById('games-container');

    const displayGames = (games) => {
        if (!gamesContainer) return;

        gamesContainer.innerHTML = ''; // Clear loading message

        if (games.length === 0) {
            gamesContainer.innerHTML = '<p class="no-games-message" style="color: var(--text-color); font-size: 1.1em; text-align: center;">No games to display yet!</p>';
            return;
        }

        games.forEach(game => {
            const gameCard = document.createElement('article');
            gameCard.classList.add('game-card');
            gameCard.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title} Thumbnail">
                <h4>${game.title}</h4>
                <p>${game.description}</p>
                <a href="game-detail.html?id=${game.id}" class="btn play-btn">View Details</a>
            `;
            gamesContainer.appendChild(gameCard);
        });
    };

    // Directly call displayGames with the hardcoded data
    if (gamesContainer) {
        displayGames(gamesData);
    }
    // --- END: Hardcoded Game Data ---

    // 2. Sticky Header on Scroll (position:fixed) - No changes needed here
    const mainHeader = document.querySelector('.main-header');
    const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;

    const observerOptions = {
        root: null,
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: [0, 1]
    };

    if (mainHeader) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.boundingClientRect.top === 0 && !entry.isIntersecting) {
                    mainHeader.classList.add('sticky');
                } else {
                    mainHeader.classList.remove('sticky');
                }
            },
            observerOptions
        );
        observer.observe(mainHeader);
    }

    // 3. Highlight Active Navigation Link on Scroll (ONLY for index.html) - No changes needed here
    // This logic only applies to the main page with sections
    if (document.body.id !== 'game-detail-page') { // Add an ID to your body tag if you want to exclude this on detail page
        const sections = document.querySelectorAll('main section');
        const homeNavList = document.querySelector('.main-nav .nav-list'); // Get the specific nav list

        const sectionObserverForActiveLink = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.id;
                    // Remove 'active' from all links first
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    // Add 'active' to the corresponding link
                    const activeLink = document.querySelector(`.nav-list a[href="#${currentId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            root: null, // viewport
            rootMargin: '-50% 0px -50% 0px', // When the middle of the section is in the viewport
            threshold: 0 // As soon as any part of the section is visible
        });

        sections.forEach(section => {
            sectionObserverForActiveLink.observe(section);
        });

        // Initial active state check on load and debounced scroll
        const updateActiveNav = () => {
            let foundActive = false;
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                // Check if section is roughly in the middle of the viewport
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const targetLink = document.querySelector(`.nav-list a[href="#${section.id}"]`);
                    if (targetLink) {
                        targetLink.classList.add('active');
                        foundActive = true;
                    }
                }
            });
            // If no section is clearly in view, default to HOME (especially at the very top)
            if (!foundActive && window.scrollY < sections[0].offsetHeight / 2) {
                document.querySelector('.nav-list a[href="#hero"]').classList.add('active');
            }
        };

        // Add a small delay to ensure all elements are rendered and positions are stable
        setTimeout(updateActiveNav, 100);

        let scrollTimeoutActiveNav;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeoutActiveNav);
            scrollTimeoutActiveNav = setTimeout(updateActiveNav, 50); // Debounce for performance
        });
    }
});