function git() {
    var originalName = document.getElementById("text").value;
    document.getElementById("result").innerHTML = ''; // Clear previous results
    document.getElementById("repos").innerHTML = ''; // Clear previous repositories
    document.getElementById("error").innerHTML = ''; // Clear previous errors
    document.getElementById("intro").classList.add('hidden'); // Hide intro
    document.getElementById("result").classList.remove('hidden'); // Show result container
    document.getElementById("repos").classList.remove('hidden'); // Show repos container

    fetch("https://api.github.com/users/" + originalName)
        .then((result) => {
            if (!result.ok) {
                throw new Error('Network response was not ok');
            }
            return result.json();
        })
        .then((data) => {
            console.log(data);
            document.getElementById("result").innerHTML = `
                <img src="${data.avatar_url}" alt="user_avatar">
                <h2>${data.name}</h2>
                <p><strong>Followers:</strong> ${data.followers}</p>
            `;

            return fetch(data.repos_url);
        })
        .then((result) => {
            if (!result.ok) {
                throw new Error('Network response was not ok');
            }
            return result.json();
        })
        .then((repos) => {
            console.log(repos);
            let reposHTML = '<h3>REPOSITORIES: </h3><br>';
            repos.forEach(repo => {
                reposHTML += `
                    <div class="repo">
                        <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                        <p>${repo.description ? repo.description : 'No description'}</p>
                    </div>
                `;
            });
            document.getElementById("repos").innerHTML = reposHTML;
        })
        .catch((error) => {
            console.error('Error fetching the GitHub profile:', error);
            document.getElementById("intro").classList.remove('hidden'); // Show intro again if error occurs
            document.getElementById("result").classList.add('hidden'); // Hide result container
            document.getElementById("repos").classList.add('hidden'); // Hide repos container
            document.getElementById("error").innerHTML = `Error fetching the GitHub profile: ${error.message}`;
        });
}
