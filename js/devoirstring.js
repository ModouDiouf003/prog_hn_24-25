// Fonction pour afficher uniquement le prénom
function afficherPrenom() {
    let prenom = document.getElementById('prenom').value;
    if (prenom) {
        document.getElementById('resultat').textContent = "Prénom: " + prenom;
    } else {
        document.getElementById('resultat').textContent = "Veuillez entrer un prénom.";
    }
}

// Fonction pour afficher uniquement le nom
function afficherNom() {
    let nom = document.getElementById('nom').value;
    if (nom) {
        document.getElementById('resultat').textContent = "Nom: " + nom;
    } else {
        document.getElementById('resultat').textContent = "Veuillez entrer un nom.";
    }
}

// Fonction pour afficher le nom complet
function afficherNomComplet() {
    let prenom = document.getElementById('prenom').value;
    let nom = document.getElementById('nom').value;
    if (prenom && nom) {
        document.getElementById('resultat').textContent = "Nom Complet: " + prenom + " " + nom;
    } else {
        document.getElementById('resultat').textContent = "Veuillez entrer un prénom et un nom.";
    }
}

// Fonction pour segmenter le texte en utilisant le point comme délimiteur
function segmenterTexte() {
    // Récupérer le texte de la zone de texte
    let texte = document.getElementById('texte').value;
   

    // Vérifier que le texte n'est pas vide
    if (texte) {
        // Segmenter le texte en utilisant le point comme délimiteur
        let segments = texte.split('.').map(segment => segment.trim()).filter(segment => segment !== '');

        // Afficher les segments sous forme de liste
        let resultatSegmente = document.getElementById('resultatSegmente');
        resultatSegmente.innerHTML = '';  // Réinitialiser l'affichage des résultats

        if (segments.length > 0) {
            segments.forEach((segment, index) => {
                let p = document.createElement('p');
                p.textContent = `Segment ${index + 1}: ${segment}`;
                resultatSegmente.appendChild(p);
            });
        } else {
            resultatSegmente.textContent = "Aucun texte à segmenter.";
        }
    } else {
        document.getElementById('resultatSegmente').textContent = "Veuillez entrer un texte à segmenter.";
    }
}
