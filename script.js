function startCelebration() {
    showPage('countdown-page');
    startCountdown(10, 'countdown', function() {
        showEnvelope();
    });
}

function startCountdown(seconds, elementId, callback) {
    let countdownElement = document.getElementById(elementId);
    let interval = setInterval(function() {
        countdownElement.innerHTML = seconds;

        seconds--;
        
        if (seconds === 7) {
            document.querySelector('.extra-image').classList.remove('hidden');
        }
        if (seconds === 1) {
            document.querySelector('.extra-image').classList.add('hidden');
        }
        if (seconds < 0) {
            clearInterval(interval);
            callback();
        }
    }, 1000);
}

function showEnvelope() {
    let envelope = document.getElementById('envelope');
    envelope.classList.remove('hidden');
    envelope.style.opacity = '1'; 
}

function openEnvelope() {
    showPage('letter-page');
    setTimeout(function() {
        let letter = document.getElementById('letter');
        letter.classList.add('open');
    }, 500); 
}

function startSlideshow() {
    let images = document.querySelectorAll('#slideshow img');
    let currentIndex = 0;
    images[currentIndex].classList.add('active');
    setInterval(function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 3000);
}

function showPage(pageId) {
    document.querySelectorAll('.reject-button').forEach(function(button) {
        button.remove();
    });
    document.querySelectorAll('.page').forEach(function(page) {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    if (pageId === 'welcome-page') {
        resetCelebration(); 
    }
}

function resetCelebration() {
    let letter = document.getElementById('letter');
    letter.classList.remove('open'); 
    let images = document.querySelectorAll('#slideshow img');
    images.forEach(function(img) {
        img.classList.remove('active'); 
    });
}

function nextPage(pageId) {
    showPage(pageId);
}

function tooGood() {
    let rejectionMessage = document.createElement('p');
    rejectionMessage.textContent = '耶!太好了！';
    document.getElementById('reject-page').appendChild(rejectionMessage);
    setTimeout(function() {
        nextPage('confession-page');
    }, 1000); 
}

function showRejectButton() {
    let rejectButton = document.createElement('button');
    rejectButton.innerText = '我不給你拒絕啊';
    rejectButton.classList.add('reject-button');
    let randomLeft = Math.floor(Math.random() * (window.innerWidth - 150)); 
    let randomTop = Math.floor(Math.random() * (window.innerHeight - 50)); 
    rejectButton.style.left = randomLeft + 'px';
    rejectButton.style.top = randomTop + 'px';
    document.body.appendChild(rejectButton);

    rejectButton.addEventListener('click', function() {
        rejectButton.remove();
        showRejectButton(); 
    });
}


function cruelReject() {
    document.getElementById('cruel-button').remove();
    showRejectButton(); 
}

function showRejectOptions() {
    showPage('reject-page');
}

function tooGoodToReject() {
    showRejectButton(); 
}

showPage('welcome-page');

document.getElementById('end-page').querySelector('button').addEventListener('click', function() {
    location.reload(); 
});
