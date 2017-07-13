$(document).ready(function(){
  console.log('ready');

  $('#searchUser').on("keyup", function(e) {
    let username = e.target.value;

    // Making an Ajax request
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data: {
        client_id:'961f09f7aa4d39d3f80c',
        client_secret: 'f2cbefc5cf3dbe2b9dccff5204b53f10615e6d84'
      }
    }).done(function(user) {
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data: {
          client_id:'961f09f7aa4d39d3f80c',
          client_secret: 'f2cbefc5cf3dbe2b9dccff5204b53f10615e6d84',
          sort: 'created: asc',
          per_page:5
        }
      }).done(function (repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class='col-md-7'>
                  <strong>${repo.name}</strong> ${repo.description}
                </div>
                <div class='col-md-3'>
                <span class="label label-default">forks: ${repo.forks_count}</span>
                <span class="label label-primary">Watchers:  ${repo.watchers_count}</span>
                <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class='col-md-2'>
                  <a href="${repo.html_url}" class="btn btn-default" target='_blank'>Repo Page</a>
                </div>
              </div>
            </div>`)
        })
      });
      $('#profile').html(`
        <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">${user.name}</h3>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-md-3">
              <img class="thumbail avatar" src="${user.avatar_url}"/>
              </br>
              <a target='_blank' class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
            <span class="label label-default">Public Repos: ${user.public_repos}</span>
            <span class="label label-primary">Public Gist: ${user.public_gist}</span>
            <span class="label label-success">Followers: ${user.followers}</span>
            <span class="label label-info">Following: ${user.following}</span>
            </div>
          </div>
        </div>
      </div>`)
    });

  });
});
