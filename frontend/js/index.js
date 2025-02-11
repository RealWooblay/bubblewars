import { initGame } from './canvas.js';
import { state } from './state.js';
import { initHeader } from './header.js';
import { initRefers } from './refer.js';
import { accessBackend } from './utils.js';
import { initName } from './ens.js';
import { runLeaderboardAI } from './ai.js';


// Enable warn user before exit.
window.Telegram.WebApp.enableClosingConfirmation();


// Disable vertical swipes.
window.Telegram.WebApp.disableVerticalSwipes();


// Set window color.
window.Telegram.WebApp.setBackgroundColor('#71E9F9');
window.Telegram.WebApp.setHeaderColor('#71E9F9');
window.Telegram.WebApp.setBottomBarColor('#71E9F9');


// Enable debug.
if (
    window.Telegram.WebApp.initData.includes("worldwidewhitewindow")
    || window.Telegram.WebApp.initData.includes("Paranoidsyntaxerror")
    || window.Telegram.WebApp.initData.includes("Wooblay")
) {
    eruda.init();
}


// Get user session.
export async function loadUser() {
    const login = await accessBackend('user/login', window.Telegram.WebApp.initData);
    console.log('login', login);
    state.user = { ...login };

    await initHeader();
    await initRefers();
    await initName();

    return login;
}


// Init.
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadUser(),
        initGame()
    ]);

    // Wait 5 seconds then invoke runLeaderboardAI.
    setTimeout(async () => {
        await runLeaderboardAI();
    }, 2500);
});
