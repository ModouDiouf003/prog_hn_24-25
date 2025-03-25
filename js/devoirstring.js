function afficherPrenom() {
    let prenom = document.getElementById('prenom').value;
    if (prenom) {
        document.getElementById('resultat').textContent = "Prénom: " + prenom;
    } else {
        document.getElementById('resultat').textContent = "Veuillez entrer un prénom.";
    }
}

function afficherNom() {
    let nom = document.getElementById('nom').value;
    if (nom) {
        document.getElementById('resultat').textContent = "Nom: " + nom;
    } else {
        document.getElementById('resultat').textContent = "Veuillez entrer un nom.";
    }
}

function afficherNomComplet() {
    let prenom = document.getElementById('prenom').value;
    let nom = document.getElementById('nom').value;
    if (prenom && nom) {
        document.getElementById('resultat').textContent = "Nom Complet: " + prenom + " " + nom;
    } else {
        document.getElementById('resultat').textContent = "Veuillez entrer un prénom et un nom.";
    }
}

function segmenterTexte() {
    let texte = document.getElementById('texte').value;
   

    if (texte) {
        let segments = texte.split('.').map(segment => segment.trim()).filter(segment => segment !== '');

        let resultatSegmente = document.getElementById('resultatSegmente');
        resultatSegmente.innerHTML = '';  

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

document.addEventListener("DOMContentLoaded", function() { 

    document.getElementById("btnBonjour").addEventListener("click", function() {
        let nomUtilisateur = document.getElementById("nomUtilisateur").value.trim();

        console.log("Nom entré :", nomUtilisateur); 

        if (nomUtilisateur !== "") {
            alert("Bonjour " + nomUtilisateur + " !");
        } else {
            alert("Bonjour !");
        }
    });

});

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnAide").addEventListener("click", function() {
        let aideDiv = document.getElementById("aide");
        if (aideDiv.style.display === "none") {
            aideDiv.style.display = "block";
            this.textContent = "Cacher l'aide";
        } else {
            aideDiv.style.display = "none";
            this.textContent = "Afficher l'aide";
        }
    });

    document.getElementById("fileInput").addEventListener("change", function(event) {
        let file = event.target.files[0];

        if (file && file.type === "text/plain") {
            let reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("fileContent").textContent = e.target.result;
            };
            reader.readAsText(file);
        } else {
            alert("Veuillez sélectionner un fichier .txt !");
        }
    });

});

function exercice4() {
    let texte = document.getElementById("texteExercice4").value;
    let tokens = texte.split(" ");
    let table = document.createElement("table");
    tokens.forEach(mot => {
        let row = document.createElement("tr");
        row.innerHTML = mot;
        table.appendChild(row);
    });
    document.getElementById("exercice4Resultat").appendChild(table);
}

window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}

