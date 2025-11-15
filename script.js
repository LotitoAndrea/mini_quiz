// Mini-Quiz sull'Intelligenza Artificiale
// Autori: Lotito Andrea, Ouni Yasser, Smahi Kawthar

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;

// Array delle domande del quiz
const questions = [
    {
        question: "Che cosa significa 'IA' o 'AI'?",
        options: ["Intelligenza Artificiale", "Internet Automatico", "Informatica Avanzata"],
        correct: 0,
        explanation: "IA sta per Intelligenza Artificiale - la capacità delle macchine di simulare l'intelligenza umana!"
    },
    {
        question: "Quale di questi è un esempio di IA che usi tutti i giorni?",
        options: ["L'assistente vocale del telefono (Siri, Google)", "La calcolatrice", "Il mouse del computer"],
        correct: 0,
        explanation: "Esatto! Gli assistenti vocali come Siri o Google Assistant usano l'IA per capire quello che dici!"
    },
    {
        question: "L'IA può imparare da sola?",
        options: ["No, può solo seguire comandi", "Sì, attraverso il 'machine learning'", "Solo se glielo insegna un umano"],
        correct: 1,
        explanation: "Corretto! Con il 'machine learning' l'IA può imparare dai dati e migliorare le sue prestazioni!"
    },
    {
        question: "Quale di questi NON è un campo in cui si usa l'IA?",
        options: ["Medicina (diagnosi malattie)", "Videogiochi", "Scavare buche nel terreno"],
        correct: 2,
        explanation: "Giusto! L'IA è usata in medicina, videogiochi, auto, ma scavare buche è ancora meglio farlo con gli attrezzi tradizionali!"
    },
    {
        question: "Cosa sono i 'robot'?",
        options: ["Solo nei film di fantascienza", "Macchine che possono muoversi e fare compiti", "Computer molto veloci"],
        correct: 1,
        explanation: "Perfetto! I robot sono macchine che possono muoversi e svolgere compiti, spesso aiutate dall'IA!"
    }
];

totalQuestions = questions.length;

// Funzione per mescolare (randomizzare) un array
function shuffleArray(array) {
    const shuffled = [...array]; // Crea una copia dell'array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Scambia gli elementi
    }
    return shuffled;
}

// Array per le domande mescolate
let shuffledQuestions = [];

function startQuiz() {
    // Reset delle variabili
    currentQuestionIndex = 0;
    score = 0;
    
    // Mescola le domande per un ordine casuale
    shuffledQuestions = shuffleArray(questions);
    
    // Nascondi il pulsante di inizio e i risultati
    document.getElementById('results').style.display = 'none';
    document.querySelector('.quiz-intro').style.display = 'none';
    
    // Inizia con la prima domanda
    askQuestion();
}

function askQuestion() {
    if (currentQuestionIndex >= totalQuestions) {
        showResults();
        return;
    }
    
    // Usa le domande mescolate invece dell'array originale
    const question = shuffledQuestions[currentQuestionIndex];
    
    // Crea la stringa con le opzioni di risposta
    let optionsText = "Scegli la risposta corretta:\n\n";
    for (let i = 0; i < question.options.length; i++) {
        optionsText += `${i + 1}. ${question.options[i]}\n`;
    }
    optionsText += "\nScrivi il numero della tua risposta (1, 2 o 3):";
    
    // Mostra la domanda con prompt
    let userAnswer = prompt(`Domanda ${currentQuestionIndex + 1} di ${totalQuestions}:\n\n${question.question}\n\n${optionsText}`);
    
    // Gestisci la risposta dell'utente
    if (userAnswer === null) {
        // L'utente ha premuto "Annulla"
        alert("Quiz annullato! Riprova quando vuoi 😊");
        restartQuiz();
        return;
    }
    
    // Converte la risposta in numero e verifica
    const answerIndex = parseInt(userAnswer) - 1;
    
    if (isNaN(answerIndex) || answerIndex < 0 || answerIndex >= question.options.length) {
        alert("Risposta non valida! Devi scrivere 1, 2 o 3. Riprova!");
        askQuestion(); // Ripeti la stessa domanda
        return;
    }
    
    // Verifica se la risposta è corretta
    if (answerIndex === question.correct) {
        score++;
        alert(`🎉 CORRETTO! \n\n${question.explanation}\n\nPunti attuali: ${score}/${totalQuestions}`);
    } else {
        alert(`❌ Sbagliato! \n\nLa risposta corretta era: ${question.options[question.correct]}\n\n${question.explanation}\n\nPunti attuali: ${score}/${totalQuestions}`);
    }
    
    currentQuestionIndex++;
    
    // Piccola pausa prima della prossima domanda
    setTimeout(() => {
        askQuestion();
    }, 1000);
}

function showResults() {
    // Calcola la percentuale
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Determina il messaggio in base al punteggio
    let message = "";
    let emoji = "";
    
    if (percentage >= 90) {
        message = "ECCEZIONALE! Sei un vero esperto di IA! 🏆";
        emoji = "🌟";
    } else if (percentage >= 70) {
        message = "BRAVO! Hai una buona conoscenza dell'IA! 👏";
        emoji = "🎉";
    } else if (percentage >= 50) {
        message = "Non male! Continua a imparare sull'IA! 📚";
        emoji = "👍";
    } else {
        message = "Hai ancora molto da imparare, ma è normale! L'IA è complessa! 💪";
        emoji = "🚀";
    }
    
    // Mostra i risultati finali
    alert(`🎯 QUIZ COMPLETATO!\n\n${emoji} ${message}\n\nPunteggio finale: ${score}/${totalQuestions} (${percentage}%)\n\nGrazie per aver partecipato!`);
    
    // Aggiorna l'interfaccia
    document.getElementById('finalScore').innerHTML = `
        <div style="font-size: 1.4em; margin-bottom: 15px;">${emoji}</div>
        <div><strong>Punteggio: ${score}/${totalQuestions}</strong></div>
        <div style="margin: 10px 0; color: #666;">Percentuale: ${percentage}%</div>
        <div style="margin-top: 15px; font-weight: bold; color: #4a5568;">${message}</div>
    `;
    
    document.getElementById('results').style.display = 'block';
}

function restartQuiz() {
    // Ripristina l'interfaccia iniziale
    document.getElementById('results').style.display = 'none';
    document.querySelector('.quiz-intro').style.display = 'block';
    
    // Reset delle variabili
    currentQuestionIndex = 0;
    score = 0;
}

// Messaggio di benvenuto quando la pagina si carica
window.onload = function() {
    alert("🤖 Benvenuto al Mini-Quiz sull'Intelligenza Artificiale!\n\nSei pronto a testare le tue conoscenze sull'IA?\n\n🎲 Le domande saranno in ordine casuale ogni volta!\n\nPremi OK e poi clicca su 'Inizia Quiz' per cominciare! 🚀");
};