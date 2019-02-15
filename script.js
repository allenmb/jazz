document.getElementById("player_submit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("player_name").value;
    if (value === "")
        return;
    console.log(value);

    /* Get Current Weather */
    let player_id = 0;
    let jazzman = true;
    const url = "https://www.balldontlie.io/api/v1/players?search=" + value;
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let results = "";
            // Find the player id
            for (let i = 0; i < json.data.length; i++) {
                if (json.data[i].team.id === 29) {
                    player_id = json.data[i].id;
                    results += "<h2>" + json.data[i].first_name + " " + json.data[i].last_name + "</h2>";
                    if (json.data[i].position != "") {
                        results += "<p>Position: " + json.data[i].position + " on the greatest team in the NBA</p>";
                    }
                    break;
                } else if (i === json.data.length - 1) {
                    results = "<h2>This website only supports Jazz players</h2><br><h2> Begone, Heathen</h2><br>";
                    jazzman = false;
                    break;
                }
            }
            document.getElementById("player_summary").innerHTML = results;
        }).then(function () {
            console.log(player_id);
            const url2 = "https://www.balldontlie.io/api/v1/stats?&seasons=2018&player_ids[]=" + player_id + "&per_page=50";
            fetch(url2)
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                    console.log(json);
                    let stats = ""
                    if (jazzman) {
                        stats = "<h2>Last 50 Games</h2>";
                        //calculate stats
                        let total_games = 0;
                        let total_pts = 0;
                        let total_reb = 0;
                        let total_ast = 0;
                        let total_fgm = 0;
                        let total_fga = 0;
                        let total_fg3m = 0;
                        let total_fg3a = 0;
                        let total_ftm = 0;
                        let total_fta = 0;
                        let total_blk = 0;
                        let total_stl = 0;
                        let total_turnover = 0;
                        for (let i = 0; i < json.data.length; i++) {
                            total_games++;
                            total_pts += json.data[i].pts;
                            total_reb += json.data[i].reb;
                            total_ast += json.data[i].ast;
                            total_fgm += json.data[i].fgm;
                            total_fga += json.data[i].fga;
                            total_fg3m += json.data[i].fg3m;
                            total_fg3a += json.data[i].fg3a;
                            total_ftm += json.data[i].ftm;
                            total_fta += json.data[i].fta;
                            total_blk += json.data[i].blk;
                            total_stl += json.data[i].stl;
                            total_turnover += json.data[i].turnover;
                        }
                        let ppg = total_pts / total_games;
                        let rpg = total_reb / total_games;
                        let apg = total_ast / total_games;
                        let bpg = total_blk / total_games;
                        let spg = total_stl / total_games;
                        let att = total_ast / total_turnover;
                        let ftp = total_ftm / total_fta * 100;
                        let fgp = total_fgm / total_fga * 100;
                        let fg3p = 0
                        if (total_fg3a != 0) {
                            fg3p = total_fg3m / total_fg3a * 100;
                        }
                        // Report Stats
                        stats += "<p> PTS  " + total_pts + "</p>";
                        stats += "<p> REB  " + total_reb + "</p>";
                        stats += "<p> AST  " + total_ast + "</p>";
                        stats += "<p> BLK  " + total_blk + "</p>";
                        stats += "<p> STL  " + total_stl + "</p>";
                        stats += "<p> TOV  " + total_turnover + "</p>";
                        stats += "<p> PPG  " + ppg.toFixed(1) + "</p>";
                        stats += "<p> RPG  " + rpg.toFixed(1) + "</p>";
                        stats += "<p> APG  " + apg.toFixed(1) + "</p>";
                        stats += "<p> BPG  " + bpg.toFixed(1) + "</p>";
                        stats += "<p> SPG  " + spg.toFixed(1) + "</p>";
                        stats += "<p> A:TO " + att.toFixed(1) + "</p>";
                        stats += "<p> FT%  " + ftp.toFixed(1) + "</p>";
                        stats += "<p> FG%  " + fgp.toFixed(1) + "</p>";
                        stats += "<p> FG3% " + fg3p.toFixed(1) + "</p>";
                    }
                    document.getElementById("player_stats").innerHTML = stats;
                });
        });

});
