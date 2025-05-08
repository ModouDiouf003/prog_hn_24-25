// Afficher date et heure -----------------------------------------------------------------------
function date_heure() {
    let now = new Date();
    let annee = now.getFullYear();
    let mois = ('0' + (now.getMonth() + 1)).slice(-2);
    let jour = ('0' + now.getDate()).slice(-2);
    let heure = ('0' + now.getHours()).slice(-2);
    let minute = ('0' + now.getMinutes()).slice(-2);
    let seconde = ('0' + now.getSeconds()).slice(-2);
    document.getElementById("affichage_datetime").innerHTML = "Nous sommes le " + jour + "/" + mois + "/" + annee + " et il est " + heure + "h " + minute + "min " + seconde + "s."; // l'élément rappeller c'est "affichage datetime"
  }
 // cette seqution correspond à "afficher masquer mon cv" 
  function showHide_aboutme() {
    let div = document.getElementById("aboutme"); // l'id rappeller c'est "aboutem"
    let b = document.getElementById("button_aboutme").innerHTML;
    if (div.style.display === "none") {
      div.style.display = "block";
      let change = b.replace("Afficher", "Masquer");
      document.getElementById("button_aboutme").innerHTML = change;
    } else {
      div.style.display = "none";
      let change = b.replace("Masquer", "Afficher");
      document.getElementById("button_aboutme").innerHTML = change;
    }
  }
  // fonction pour afficher l'aide
  function showHide_aide() {
    let div = document.getElementById("aide");
    let b = document.getElementById("button_aide").innerHTML; // l'élément reppeller c'est "button_aide"
    if (div.style.display === "none") {
      div.style.display = "block";
      document.getElementById("button_aide").innerHTML = "Masquer l'aide";
    } else {
      div.style.display = "none";
      document.getElementById("button_aide").innerHTML = "Afficher l'aide";
    }
  }
  // fonction pour la segmentation de texte
  function segText() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
      document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
      if (document.getElementById("delimID").value === "") {
        document.getElementById("logger3").innerHTML = '<span class="errorlog">Aucun délimiteur donné !</span>'
      } else {
        document.getElementById('logger3').innerHTML = "";
        let text = document.getElementById("fileDisplayArea").innerText;
        let delim = document.getElementById("delimID").value; // "delimID" c'est pour définir ce qui est pris comme délimitateur
        let display = document.getElementById("fileDisplayArea");
        let regex_delim = new RegExp("[" + delim.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + "\\s]+");
        let tokens = text.split(regex_delim).filter(x => x.trim() != "");
        let lines = text.split(/\r?\n/).filter(line => line.trim() != "");
        global_var_tokens = tokens;
        global_var_lines = lines;
        display.innerHTML = tokens.join(" ");
      }
    }
  }
  // fonction dictionnaire
  function dictionnaire() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
      document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !"; // "fileDisplayArea" rappeler pour determiner ce qui s'afiche en fonction du contenu chargé dans "charge texte" si les bouttons sont cliquée
    } else {
      document.getElementById('logger3').innerHTML = "";
      let tokenFreq = {};
      let tokens = global_var_tokens;
      tokens.forEach(token => tokenFreq[token] = (tokenFreq[token] || 0) + 1);
      let freqPairs = Object.entries(tokenFreq);
      freqPairs.sort((a, b) => b[1] - a[1]);
      let tableArr = [['<b>Token</b>', '<b>Fréquence</b>']];
      let tableData = freqPairs.map(pair => [pair[0], pair[1]]);
      let finalTable = tableArr.concat(tableData);
      let tableHtml = finalTable.map(row => '<tr>' + row.map(cell => '<td>' + cell + '</td>').join('') + '</tr>').join('');
      document.getElementById('page-analysis').innerHTML = '<table>' + tableHtml + '</table>';
    }
  }
 // fonction grep 
  function grep() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") { // meme utilité que celle cité en haut
      document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
      document.getElementById('logger3').innerHTML = "";
      let poleInput = document.getElementById('poleID').value; // "polID" rappelle la fonction entree un pole pour les grep
      if (poleInput == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord entrer un pôle !";
      } else {
        let poleRegex = new RegExp(poleInput, 'g');
        let resultat = "<tr><th>Ligne</th><th>Résultat</th></tr>";
        for (let i = 0; i < global_var_lines.length; i++) {
          if (poleRegex.test(global_var_lines[i])) {
            let lineNumber = i + 1;
            resultat += "<tr><td>" + lineNumber + "</td><td>" + global_var_lines[i] + "</td></tr>";
          }
        }
        if (resultat == "<tr><th>Ligne</th><th>Résultat</th></tr>") {
          document.getElementById('page-analysis').innerHTML = "";
          document.getElementById('logger3').innerHTML = "Aucune correspondance trouvée.";
        } else {
          document.getElementById('logger3').innerHTML = "";
          document.getElementById('page-analysis').innerHTML = "<table>" + resultat + "</table>";
        }
      }
    }
  }
  // fonction concordancier
  function concord() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
      document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
      let poleInput = document.getElementById('poleID').value;
      if (poleInput == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord entrer un pôle !";
      } else {
        let lgInput = document.getElementById('lgID').value;
        if (lgInput == "" || isNaN(lgInput) || lgInput <= 0) {
          document.getElementById('logger3').innerHTML = "Il faut d'abord entrer une longueur > 0 !";
        } else {
          let poleRegex = new RegExp("^" + poleInput + "$", "gi");
          let long = parseInt(lgInput);
          let concordance = global_var_tokens.reduce((acc, token, i) => {
            if (poleRegex.test(token)) {
              let cLeft = global_var_tokens.slice(Math.max(0, i - long), i).join(" ");
              let cRight = global_var_tokens.slice(i + 1, Math.min(global_var_tokens.length, i + long + 1)).join(" ");
              acc.push([cLeft, token, cRight]);
            }
            return acc;
          }, []);
          let table = document.createElement("table");
          table.innerHTML = "<thead><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr></thead>";
          concordance.forEach(([cLeft, pole, cRight]) => {
            let row = table.insertRow();
            row.innerHTML = '<td>' + cLeft + '</td><td>' + pole + '</td><td>' + cRight + '</td>';
          });
          if (table.rows.length <= 1) {
            document.getElementById('page-analysis').innerHTML = "";
            document.getElementById('logger3').innerHTML = "Aucune concordance trouvée.";
          } else {
            document.getElementById('logger3').innerHTML = "";
            document.getElementById('page-analysis').innerHTML = "";
            document.getElementById('page-analysis').appendChild(table);
          }
        }
      }
    }
  }
  // nombre de phases
  function nbPhrases() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") { // meme utilité
      document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
      let text = document.getElementById("fileDisplayArea").innerText;
      let phrases = text.split(/[.!?]+/).filter(p => p.trim().length > 0);
      let resultat = phrases.length;
      document.getElementById('page-analysis').innerHTML = '<div>Il y a ' + resultat + ' phrases dans ce texte.</div>';
    }
  }
  // les mots les plus longues
  function tokenLong() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
      document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
      document.getElementById('logger3').innerHTML = "";
      let tokenSort = [...global_var_tokens].sort((a, b) => b.length - a.length).slice(0, 10);
      let map = tokenSort.map(token => '<tr><td>' + token + '</td><td>' + token.length + '</td></tr>').join('');
      let resultat = '<table><tr><th colspan=2><b>Top 10 mots les plus longs</b></th></tr><tr><th><b>Mot</b></th><th><b>Longueur</b></th></tr>' + map + '</table>';
      document.getElementById('page-analysis').innerHTML = resultat;
    }
  }
  // diagramme camembert
  function pieChart() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") { // meme utilité
      document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
      document.getElementById('logger3').innerHTML = "";
      let stopwordInput = document.getElementById('stopwordID').value;
      let stopwords = stopwordInput.split(',');
      let filteredTokens = global_var_tokens.filter(token => stopwords.indexOf(token) === -1);
      let count = {};
      filteredTokens.forEach(token => {
        count[token] = (count[token] || 0) + 1;
      });
      let chartData = [];
      let sortedTokens = Object.keys(count).sort((a, b) => count[b] - count[a]).slice(0, 30);
      sortedTokens.forEach(token => {
        chartData.push({ label: token, y: count[token] });
      });
      let chart = new CanvasJS.Chart("chartContainer", { // "chartcontainer" rappeler depuis index.html pour l'affichage du camembert
        animationEnabled: true,
        backgroundColor: "transparent",
        title: { text: "Mots les plus fréquents" },
        data: [{
          type: "pie",
          showInLegend: true,
          legendText: "{label}",
          indexLabelFontSize: 14,
          indexLabel: "{label} - {y}",
          dataPoints: chartData
        }]
      });
      chart.render();
    }
  }
  
  function kujuj() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
      document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
      let kujujTokens = global_var_tokens.map(token => token + "uj");
      let kujujText = kujujTokens.join(" ");
      document.getElementById("fileDisplayArea").innerHTML = kujujText;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput"); // "fileInput" reppeller depuis index.html
    if (fileInput) {
      fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;
  
        const reader = new FileReader();
        reader.onload = function (e) {
          const text = e.target.result;
          document.getElementById("fileDisplayArea").textContent = text;
        };
        reader.readAsText(file);
      });
    }
  });
  
  