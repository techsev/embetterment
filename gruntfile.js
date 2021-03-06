module.exports = function(grunt) {

  grunt.initConfig({
    getWeight: {},
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'sass',
          cssDir: 'stylesheets',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'sass',
          cssDir: 'stylesheets'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  
  // grunt.registerTask('default', ['compass:dev']);
grunt.registerTask('default', ['combineTemplate','getWeight','compass:dev','postProgress']);
grunt.registerTask('combineTemplate','Combine the _projects and _posts into the template file',function(){
  var done = this.async();
  // Combine template with projects
  //Step 1: get all the files in _projects directory

  var fs = require('fs');
  var projectFiles = fs.readdirSync(__dirname+'/_projects/');
  var postFiles = fs.readdirSync(__dirname+'/_posts/');
  var projectsHTML ="", postsHTML = "", finalHTML = "";
  var templateHTML = fs.readFileSync(__dirname+'/_templates/main.html');
  

  templateHTML = templateHTML.toString();
  projectFiles.sort();
  projectFiles.reverse();
  postFiles.sort();
  postFiles.reverse();


  var i = 0;
  for(i = 0; i < projectFiles.length; i++)
  {
    projectsHTML +=  fs.readFileSync(__dirname+'/_projects/'+projectFiles[i]).toString();
    
  }
  for(i = 0; i < postFiles.length; i++)
  {
    postsHTML +=  fs.readFileSync(__dirname+'/_posts/'+postFiles[i]).toString();
  }



  templateHTML = templateHTML.replace('{{POSTS}}',postsHTML);
  finalHTML = templateHTML.replace('{{PROJECTS}}',projectsHTML);

  fs.unlinkSync('index.html');
  fs.writeFileSync('index.html', finalHTML.toString()); 
  done();

});


grunt.registerTask('getWeight', 'Use twitter API call to get weight', function() {
  
  var done = this.async();

  var twitter = require('mtwitter');
  var fs = require('fs');



var twit = new twitter({
  consumer_key: 'XClhiEf72XxQwMKPA2pKXA',
  consumer_secret: '5U1aPB6w77CnFHc1N8RjxKqB3YDCaiwIdQnyDs9OHM',
  access_token_key: '2153919734-rPfaCwVTamO9SlZMC4txcl5LexpNTg2uKca1lsY',
  access_token_secret: 'veosn7CB4t2dJc56k8kVoGWtOtULnYdkqmySAXqqPlw00'
});

 twit.get('/statuses/user_timeline', { include_entities: true },
                function (err, data) {
                    if (err) {
                        console.log(err.toString());
                    }
                    else {
                      console.log(data[0].text);
                      var tempString = data[0].text.split('s lost ');
                      tempString = tempString[1].split(' lbs');
                      weightLost = tempString[0];
                      console.log(weightLost);
                      fs.unlinkSync('sass/_mfpWeight.scss');
                      fs.writeFile('sass/_mfpWeight.scss', "$weight-lost: " + weightLost + ";", function(err) {
              if(err) {
                  console.log(err);
              } else {
                  console.log("The file was saved!");
                  done();
              }
          }); 
        }
      });
  });

grunt.registerTask('postProgress','Use Twitter API to post overall progress percentage',function(){
var done = this.async();
  var twitter = require('mtwitter');

  var twit = new twitter({
  consumer_key: 'l3wVICTGFLK8lwoZdWlApA',
  consumer_secret: 'N1G0LEjvmn6P2458F4aMb8OSSu0Qg590ywQWAI',
  access_token_key: '18638308-id1rSKnWCBIZVwHKDbZ37AsXu9GC8sSmVDkybX1H6',
  access_token_secret: 'hv5O1J18oN1SvP6G1G79uP2Agp9zG5RYll9I87WZwLuJe'
});

  var parse = require('css-parse')
  , fs = require('fs')
  , read = fs.readFileSync
  , css = read('stylesheets/screen.css', 'utf8');
  var css_json = parse(css); 
  var overall_progress;
  for (var i = css_json.stylesheet.rules.length - 1; i >= 0; i--) {
    if (css_json.stylesheet.rules[i].type == 'rule' && css_json.stylesheet.rules[i].selectors[0] == ".OVERALL-PROGRESS div.progressBar div" )
    {
      overall_progress = css_json.stylesheet.rules[i].declarations[0].value;
      break;
    }
  };

  if (overall_progress != null)
  {
    console.log(overall_progress)


    var content = {status: 'My Current Life Goal Progress: ' + overall_progress + ' #TheBettermentOfSeve www.TheBettermentOfSeve.com'};
    twit.post('statuses/update', content, function(err, item) {
      console.log(err, item);
      done();
    });

  } else {
    console.log('error');
    done();
  }






});
  


};