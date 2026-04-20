const API_URL = 'https://script.google.com/macros/s/AKfycbx3N5-FulouNGEvh8MOcoLJSBNYwYPeZrTYdCf91drRhwsAsCxtKwxB-URw30QUO_V3xw/exec';

document.getElementById('confirmBtn').addEventListener('click', async () => {
  const code = document.getElementById('accessCode').value;
  const btn = document.getElementById('confirmBtn');

  if (code.length !== 4) return alert("Enter 4 digits.");

  btn.innerText = "Checking...";
  btn.disabled = true;

  try {
    const resp = await fetch(`${API_URL}?code=${code}`);
    const data = await resp.json();

    if (data.status === "success") {
      document.getElementById('loginWindow').style.display = 'none';
      // Dispatch success for the next phase with the code included
      console.log("Access Granted. Dispatching authSuccess event.");
      window.dispatchEvent(new CustomEvent('authSuccess', { 
          detail: { ...data, code: code } 
      }));
    } else {
      alert("Invalid code.");
      btn.innerText = "Confirm";
      btn.disabled = false;
    }
  } catch (e) {
    console.error("Auth Error:", e);
    alert("Connection error.");
    btn.innerText = "Confirm";
    btn.disabled = false;
  }
});

// Support Enter key
document.getElementById('accessCode').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('confirmBtn').click();
    }
});

// Phase 2: Main Party Desktop Implementation
window.addEventListener('authSuccess', (e) => {
    const guestData = e.detail;
    const desktop = document.querySelector('.desktop');
    
    // Set the Memphis Geometric Vibe
    desktop.style.background = "#CC5500";
    desktop.style.backgroundImage = "radial-gradient(#E1AD01 20%, transparent 20%), radial-gradient(#556B2F 20%, transparent 20%)";
    desktop.style.backgroundPosition = "0 0, 50px 50px";
    desktop.style.backgroundSize = "100px 100px";

    // Clear the Gatekeeper and set the Icons
    desktop.innerHTML = `
        <div class="grain-overlay"></div>
        <div class="icon-grid">
            <div class="icon" onclick="openWindow('vibe')">📼<br><span>THE VIBE</span></div>
            <div class="icon" onclick="openWindow('rsvp')">🛼<br><span>RSVP</span></div>
            <div class="icon" onclick="openWindow('logistics')">💾<br><span>LOGISTICS</span></div>
            <div class="icon" onclick="openWindow('map')">📍<br><span>SECRET MAP</span></div>
        </div>
        <div id="window-layer"></div>
    `;
    
    // Inject Neon Icon Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .icon-grid { 
            display: grid; 
            grid-template-columns: repeat(2, 1fr); 
            gap: 40px; 
            padding: 50px; 
            z-index: 5;
        }
        .icon { 
            font-family: 'Cooper Black', 'Arial Black', serif; 
            color: #E1AD01; 
            text-align: center; 
            cursor: pointer; 
            padding: 20px; 
            font-size: 60px; 
            text-shadow: 3px 3px #000;
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .icon:hover {
            transform: scale(1.1) rotate(5deg);
        }
        .icon:active {
            transform: scale(0.9);
        }
        .icon span { 
            font-size: 16px; 
            background: #000; 
            color: #fff; 
            padding: 4px 8px; 
            display: inline-block;
            margin-top: 10px;
            font-family: 'Helvetica', sans-serif;
            font-weight: bold;
        }
        .win95-window {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 350px;
            background: #c0c0c0;
            border: 2px solid;
            border-color: #fff #000 #000 #fff;
            padding: 2px;
            z-index: 100;
            box-shadow: 10px 10px 0px rgba(0,0,0,0.2);
        }
        .win95-title {
            background: #000080;
            color: white;
            padding: 3px 5px;
            font-weight: bold;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .win95-body {
            padding: 15px;
            font-family: 'Helvetica', sans-serif;
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
});

// Window Management
window.openWindow = function(type) {
    const layer = document.getElementById('window-layer');
    let title = "";
    let content = "";

    switch(type) {
        case 'vibe':
            title = "THE VIBE";
            content = "<h2>Retro Farewell</h2><p style='margin-top:10px'>A Retro Send-off! Get ready for neon, nostalgia, and a proper goodbye.</p>";
            break;
        case 'rsvp':
            title = "RSVP STATUS";
            content = `
                <div style="text-align: left;">
                    <label>Attending?</label><br>
                    <select id="rsvpStatus" style="width: 100%; margin: 5px 0 15px 0;">
                        <option value="yes">YES - Count me in!</option>
                        <option value="no">NO - My loss.</option>
                    </select><br>
                    <label>Notes (Song requests?):</label><br>
                    <textarea id="rsvpNotes" style="width: 100%; height: 60px; margin-top: 5px;"></textarea>
                    <button onclick="saveRSVP()" class="win95-btn" style="margin-top: 15px; width: 100%;">SAVE</button>
                </div>
            `;
            break;
        case 'logistics':
            title = "LOGISTICS";
            content = "<p><b>DATE:</b> TBA<br><b>TIME:</b> 19:00 - LATE<br><br>Keep your floppy disks ready.</p>";
            break;
        case 'map':
            title = "SECRET MAP";
            content = "<p style='color: #000; font-weight: bold;'>DECRYPTING... [||||||||||  ] 12%</p><p style='font-size: 12px; margin-top: 10px;'>Full access granted 4 hours before launch.</p>";
            break;
    }

    layer.innerHTML = `
        <div class="win95-window">
            <div class="win95-title">
                <span>${title}</span>
                <button onclick="this.closest('.win95-window').remove()" style="padding: 0 4px; cursor: pointer;">X</button>
            </div>
            <div class="win95-body">
                ${content}
            </div>
        </div>
    `;
};

// RSVP Form Logic
window.saveRSVP = async function() {
    const status = document.getElementById('rsvpStatus').value;
    const notes = document.getElementById('rsvpNotes').value;
    const btn = event.target;

    btn.innerText = "SENDING...";
    btn.disabled = true;

    try {
        const resp = await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors', // Common for Google Apps Script Web Apps
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'rsvp', status, notes })
        });
        
        alert("System: RSVP Received! Check you later.");
        btn.closest('.win95-window').remove();
    } catch (e) {
        alert("Upload Error. Please try again.");
        btn.innerText = "SAVE";
        btn.disabled = false;
    }
};
