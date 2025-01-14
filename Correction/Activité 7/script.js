// Ajouter une valeur au champ d'affichage
function appendValue(value) {
    const result = document.getElementById("result");
    if (result.value === "0" || result.value === "Erreur") {
        result.value = value;
    } else {
        result.value += value;
    }
}

// Effacer le champ d'affichage
function clearDisplay() {
    document.getElementById("result").value = "0";
}

// Calculer le résultat (sans eval)
function calculateResult() {
    const result = document.getElementById("result").value;

    try {
        // Valider et évaluer l'expression mathématique
        const sanitizedResult = evaluateExpression(result);
        document.getElementById("result").value = sanitizedResult;
    } catch (error) {
        document.getElementById("result").value = "Erreur";
    }
}

// Fonction pour évaluer une expression mathématique de manière sécurisée
function evaluateExpression(expression) {
    // Autoriser uniquement les chiffres, les opérateurs et les espaces
    if (!/^[\d+\-*/().\s]+$/.test(expression)) {
        throw new Error("Invalid characters in expression");
    }

    // Utiliser une nouvelle fonction pour parser l'expression
    const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, ""); // Nettoyage par précaution
    const result = new Function(`return (${sanitizedExpression})`)();
    if (isNaN(result) || !isFinite(result)) {
        throw new Error("Invalid calculation");
    }

    return result;
}
