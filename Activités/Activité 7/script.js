// Ajouter une valeur au champ d'affichage
function appendValue(value) {
    const result = document.getElementById("result");
    if (result.value === "0" || result.value === "Erreur") {
        // TODO: Replace the current value with the new input
        // HINT: Use assignment (=)
    } else {
        // TODO: Append the new value to the existing one
        // HINT: Use concatenation (+=)
    }
}

// Effacer le champ d'affichage
function clearDisplay() {
    // TODO: Set the display value back to "0"
}

// Calculer le résultat (sans eval)
function calculateResult() {
    const result = document.getElementById("result").value;

    try {
        // TODO: Call the evaluateExpression function and update the display
        // HINT: You already have the input in the `result` variable
    } catch (error) {
        // TODO: Display "Erreur" if something goes wrong
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
