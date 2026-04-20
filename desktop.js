let currentGuestData = null;

window.addEventListener('authSuccess', (e) => {
    currentGuestData = e.detail;
    const body = document.body;
    
    // Reveal Header & Start Clock
    const header = document.getElementById('app-header');
    if (header) {
        header.style.display = 'flex';
        updateLiveClock();
        setInterval(updateLiveClock, 1000);
    }

    // Transform the background to 90s Neon
    body.style.backgroundColor = "#CC5500";
    body.style.backgroundImage = `radial-gradient(#E1AD01 15%, transparent 15%), 
                                  radial-gradient(#556B2F 15%, transparent 15%)`;
    body.style.backgroundSize = "60px 60px";
    body.style.backgroundPosition = "0 0, 30px 30px";

    // Inject the Desktop Icons and Window Layer
    const desktopHTML = `
        <div class="grain-overlay"></div>
        <div class="desktop-icons">
            <div class="icon-item" onclick="openWindow('vibe')">
                <span class="icon-img">📼</span>
                <span class="icon-label">THE VIBE</span>
            </div>
            <div class="icon-item" onclick="openWindow('rsvp')">
                <span class="icon-img">🛼</span>
                <span class="icon-label">RSVP</span>
            </div>
            <div class="icon-item" onclick="openWindow('logistics')">
                <span class="icon-img">💾</span>
                <span class="icon-label">LOGISTICS</span>
            </div>
            <div class="icon-item" onclick="openWindow('map')">
                <span class="icon-img">📍</span>
                <span class="icon-label">SECRET MAP</span>
            </div>
        </div>
        <div id="window-layer"></div>
    `;
    document.querySelector('.desktop').innerHTML = desktopHTML;

    // Inject Bottom Bar with Marquee
    const bottomBar = document.createElement('div');
    bottomBar.id = 'bottom-bar';
    bottomBar.innerHTML = `
        <div class="countdown-box" id="countdown-timer">T-MINUS: BOOTING...</div>
        <marquee scrollamount="5">*** SYSTEM WARNING: MEMORY FULL OF NOSTALGIA *** PREPARE FOR LAUNCH *** LOADING PARTY VIBES 100% ***</marquee>
    `;
    document.body.appendChild(bottomBar);

    // Inject CSS Dancer
    const dancer = document.createElement('div');
    dancer.id = 'pixel-dancer';
    dancer.innerHTML = '🕺';
    document.body.appendChild(dancer);

    startCountdown();
});

// Function to Create Win95 Windows on Click
window.openWindow = (type) => {
    let windowContent = '';
    let windowTitle = '';
    const guestData = currentGuestData || {};

    if (type === 'vibe') {
        windowTitle = 'The_Vibe.txt';
        windowContent = `
            <div style="font-family: 'Helvetica', sans-serif; text-align: left;">
                <h3 style="color: #CC5500; font-family: 'Cooper Black', sans-serif;">THE VIBE</h3>
                <p>We are going back in time for one last blast!</p>
                <hr style="border: 1px solid #888; margin: 10px 0;">
                <h3 style="color: #556B2F; font-family: 'Cooper Black', sans-serif;">DRESS CODE</h3>
                <p><strong>Neon, Nostalgia & Retro Chic:</strong> Anything that screams 1990s</p>
                <p><i>The more color, the better.</i></p>
            </div>
        `;
    } else if (type === 'rsvp') {
        windowTitle = 'RSVP_Control_Panel.exe';
        windowContent = `
            <p>Welcome, ${guestData.guestName || 'Guest'}. Update your status:</p>
            <select id="rsvpStatus" style="width: 100%; margin: 10px 0;">
                <option value="Attending" ${guestData.rsvpStatus === 'Attending' ? 'selected' : ''}>See you there 🕶️</option>
                <option value="Not Attending" ${guestData.rsvpStatus === 'Not Attending' ? 'selected' : ''}>I will miss you😭</option>
            </select>
            <br>
            <button id="saveRsvp" class="win95-btn" style="width: 100%;">Save Changes</button>
        `;
    } else if (type === 'logistics') {
        windowTitle = 'System_Logistics.floppy';
        windowContent = '<p>DATE: April 25, 2026<br>TIME: 19:00 launch.</p>';
    } else if (type === 'map') {
        const partyTime = new Date("April 25, 2026 19:00:00").getTime();
        const mapLink = "https://maps.app.goo.gl/kPW9yixaQqD4PBBs9";
        const address = "Přadlácká 28, 602 00 Brno-sever";
        
        windowTitle = 'Secret_Map.map';
        const now = new Date().getTime();
        const hoursRemaining = (partyTime - now) / (1000 * 60 * 60);

        if (hoursRemaining <= 4) {
            // FULL REVEAL (4 hours or less)
            windowContent = `
                <div style="text-align:center;">
                    <h3 style="color:#0f0; font-family:'Courier New', monospace;">UNLOCKED: SECTOR ACCESS GRANTED</h3>
                    <p style="font-family:monospace; background:#000; color:#0f0; padding:10px; border: 1px inset #fff;">${address}</p>
                    <a href="${mapLink}" target="_blank" class="win95-btn" style="display:inline-block; text-decoration:none; margin-top:10px;">OPEN EXTERNAL MAP</a>
                </div>
            `;
        } else if (hoursRemaining <= 6) {
            // 95% STAGE
            windowContent = `
                <p style="font-weight: bold; color: #CC5500;">DECRYPTING... [||||||||||| ] 95%</p>
                <p>Satellite uplink stabilizing. Final coordinates arriving soon.</p>
            `;
        } else if (hoursRemaining <= 12) {
            // 85% STAGE
            windowContent = `
                <p style="font-weight: bold;">DECRYPTING... [|||||||||   ] 85%</p>
                <p>Security protocols bypassed. Identifying venue signal...</p>
            `;
        } else {
            // BASE STAGE
            windowContent = `
                <p style="font-weight: bold;">DECRYPTING... [||          ] 12%</p>
                <p>System is scanning. Check back 12 hours before launch.</p>
            `;
        }
    }

    const windowHTML = `
        <div class="window-container draggable">
            <div class="title-bar">
                <div class="title-text">${windowTitle}</div>
                <button class="win95-btn-mini" onclick="this.closest('.window-container').remove()">×</button>
            </div>
            <div class="window-body">
                ${windowContent}
            </div>
        </div>
    `;

    // Clear previous window for simplicity, or append for multi-window
    document.getElementById('window-layer').innerHTML = windowHTML;

    // Add RSVP Save Event
    if (document.getElementById('saveRsvp')) {
        document.getElementById('saveRsvp').addEventListener('click', saveRsvpChanges);
    }
};

window.saveRsvpChanges = async () => {
    const status = document.getElementById('rsvpStatus').value;
    const btn = document.getElementById('saveRsvp');
    const guestCode = currentGuestData ? currentGuestData.code : '';

    btn.innerText = "Saving...";
    btn.disabled = true;

    try {
        await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors', // Necessary for Google Apps Script Web Apps
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: guestCode,
                rsvpStatus: status,
                plusOne: 0, // Default for now
                notes: "Updated via mobile/web"
            })
        });
        alert('RSVP Updated Successfully! See you there.');
        btn.innerText = "Saved!";
        // Optional: Close window after success
        setTimeout(() => {
            const win = btn.closest('.window-container');
            if (win) win.remove();
        }, 1500);
    } catch (e) {
        console.error("Save error:", e);
        alert('Save failed. Please try again.');
        btn.disabled = false;
        btn.innerText = "Save Changes";
    }
};

// Target Date: April 25, 2026 at 19:00
const targetDate = new Date("April 25, 2026 19:00:00").getTime();

function startCountdown() {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById("countdown-timer");
        if (countdownElement) {
            countdownElement.innerHTML = `T-MINUS: ${days}D ${hours}H ${minutes}M ${seconds}S`;
        }

        if (distance < 0) {
            clearInterval(timer);
            const el = document.getElementById("countdown-timer");
            if (el) el.innerHTML = "SYSTEM LAUNCHED";
        }
    }, 1000);
}

function updateLiveClock() {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];
    const clockElement = document.getElementById('live-clock');
    if (clockElement) clockElement.innerText = timeString;
}
