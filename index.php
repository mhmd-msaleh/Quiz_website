<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exploring Dom</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous">
        </script>
</head>

<body>

    <div class="container">
        <h1 name="scoreMessage"></h1>
        <div class="card question-card hide">
            
            <h1 id="question">What is 5+2</h1>
            <div id="answers">
                <div>
                    <button class="btn ">10</button>
                    <button class="btn">12</button>
                    <button data-correct="true" class="btn">7</button>
                    <button class="btn">6</button>
                </div>
            </div>
            <table class="hide table">
                <tr>
                    <th>User</th>
                    <th>score</th>
                </tr>
            </table>
        </div>
        <div class="question-card name-card">
            <h1>What is your name?</h1><br>
            <input type="text" name="userName" value="Anonymous">
        </div>
        <button id="start" onclick="start()" class="btn">Start</button>
        <button id="admin" onclick="getAdminPage()" class="btn">Admin</button>
        <button id="next" class="btn hide" onclick="goNext()">Next</button>
    </div>
    <script src="app.js"></script>
</body>

</html>